/**
 * Cryptographic hashing and Merkle Tree utilities for Provenance AI
 * Uses Web Crypto API (SHA-256) for browser & Node compatibility.
 */

/**
 * Computes a deterministic SHA-256 hash string for string input or structured object
 */
export async function sha256(data: string | object): Promise<string> {
  const str = typeof data === 'string' ? data : JSON.stringify(sortKeys(data));
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str);
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  } else {
    // Node.js fallback using crypto module
    const { createHash } = await import('node:crypto');
    return createHash('sha256').update(buffer).digest('hex');
  }
}

/**
 * Synchronous fallback hash (Fowler-Noll-Vo 1a variant formatted to 64-character hex string)
 * for immediate rendering before async SHA-256 resolves
 */
export function syncHash(data: string | object): string {
  const str = typeof data === 'string' ? data : JSON.stringify(sortKeys(data));
  let h1 = 0x811c9dc5;
  let h2 = 0x01000193;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    h1 ^= code;
    h1 = Math.imul(h1, 16777619);
    h2 ^= code;
    h2 = Math.imul(h2, 2246822519);
  }
  const hex1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const hex2 = (h2 >>> 0).toString(16).padStart(8, '0');
  const pad = 'a7f9b23c8e4d10f56a23b9d01e45c7f8';
  return `0x${hex1}${hex2}${pad.substring(0, 48)}`;
}

/**
 * Recursively sort keys of an object to guarantee deterministic JSON serialization
 */
export function sortKeys<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortKeys) as unknown as T;
  }
  const sorted: Record<string, any> = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = sortKeys((obj as Record<string, any>)[key]);
    });
  return sorted as T;
}

/**
 * Build Merkle Tree from an array of leaf strings
 */
export async function buildMerkleTree(leaves: string[]): Promise<{
  merkleRoot: string;
  proofs: Record<string, string[]>;
}> {
  if (leaves.length === 0) {
    const emptyHash = await sha256('');
    return { merkleRoot: emptyHash, proofs: {} };
  }

  // Ensure leaves are hashed
  let currentLevel: string[] = [];
  for (const leaf of leaves) {
    const hash = leaf.startsWith('0x') && leaf.length === 66 ? leaf.substring(2) : await sha256(leaf);
    currentLevel.push(hash);
  }

  const proofs: Record<string, string[]> = {};
  currentLevel.forEach((leafHash) => {
    proofs[leafHash] = [];
  });

  while (currentLevel.length > 1) {
    if (currentLevel.length % 2 !== 0) {
      currentLevel.push(currentLevel[currentLevel.length - 1]); // duplicate last node if odd
    }

    const nextLevel: string[] = [];
    for (let i = 0; i < currentLevel.length; i += 2) {
      const left = currentLevel[i];
      const right = currentLevel[i + 1];
      const combined = await sha256(left + right);
      nextLevel.push(combined);

      // Add to proof paths
      Object.keys(proofs).forEach((originalLeafHash) => {
        if (currentLevel[i] === originalLeafHash || currentLevel[i + 1] === originalLeafHash) {
          // append sibling
          const sibling = currentLevel[i] === originalLeafHash ? right : left;
          proofs[originalLeafHash].push(sibling);
        }
      });
    }
    currentLevel = nextLevel;
  }

  return {
    merkleRoot: `0x${currentLevel[0]}`,
    proofs,
  };
}

/**
 * Generate a transaction hash representation
 */
export function generateTxHash(id: string, timestamp: string): string {
  return `0x${syncHash(`${id}-${timestamp}`).substring(2, 66)}`;
}
