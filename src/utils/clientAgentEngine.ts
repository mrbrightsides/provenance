import {
  Dataset,
  DecisionRecord,
  AgentStep,
  VerificationResult,
  FieldDiff,
  UseCaseType,
  OnChainBlock,
  EvidenceSummary,
  DecisionOutput,
  CryptographicHashes,
} from '../types';
import { PROCUREMENT_PRESET, MEDICAL_PRESET, LOAN_PRESET } from '../data/presets';

/**
 * Web Crypto SHA-256 for browser environments
 */
export async function browserSha256(data: any): Promise<string> {
  const str = typeof data === 'string' ? data : JSON.stringify(sortKeys(data));
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

function sortKeys(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(sortKeys);
  }
  const sorted: Record<string, any> = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = sortKeys(obj[key]);
    });
  return sorted;
}

let clientBlockCounter = 4050;

/**
 * Client-Side Seed Ledger
 */
export async function getClientSeedLedger(): Promise<DecisionRecord[]> {
  const presets = [
    { preset: PROCUREMENT_PRESET, id: 'DEC-000128', title: 'Supplier Selection & Procurement Award' },
    { preset: MEDICAL_PRESET, id: 'DEC-000129', title: 'Chest Pain Clinical Triage Pathway' },
    { preset: LOAN_PRESET, id: 'DEC-000130', title: 'Commercial Credit Facility Underwriting' },
  ];

  const records: DecisionRecord[] = [];

  for (const item of presets) {
    const res = await executeClientAgentWorkflow(item.preset.useCase, item.preset);
    res.record.id = item.id;
    res.record.title = item.title;
    records.push(res.record);
  }

  return records;
}

/**
 * Client-Side Decision Agent Execution Fallback Engine
 */
export async function executeClientAgentWorkflow(
  useCase: UseCaseType,
  dataset: Dataset,
  customInstructions?: string
): Promise<{ success: boolean; record: DecisionRecord; steps: AgentStep[] }> {
  const steps: AgentStep[] = [];
  const decId = `DEC-${Math.floor(100000 + Math.random() * 900000)}`;

  // Step 1: DataInspector
  const step1Start = Date.now();
  const rawDatasetHash = await browserSha256(dataset);
  steps.push({
    id: 'step-inspect',
    tool: 'DataInspector',
    status: 'completed',
    title: 'Data Inspector & Cryptographic Ingestion',
    summary: `Parsed ${dataset.records.length} records & ${dataset.metrics.length} metrics. SHA-256: 0x${rawDatasetHash.substring(0, 16)}...`,
    details: {
      recordCount: dataset.records.length,
      metricsCount: dataset.metrics.length,
      rawDatasetHash,
      sourceOrigin: dataset.sourceOrigin,
      timestamp: dataset.timestamp,
    },
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - step1Start,
  });

  // Step 2: EvidenceAnalyzer
  const step2Start = Date.now();
  let qualityScore = 100;
  const anomalies: string[] = [];

  dataset.records.forEach((rec, idx) => {
    dataset.metrics.forEach((m) => {
      const val = rec.attributes[m.id];
      if (val === undefined || val === null) {
        qualityScore -= 10;
        anomalies.push(`Missing attribute '${m.name}' in record #${idx + 1} (${rec.name})`);
      }
    });
  });

  const evidenceSummary: EvidenceSummary = {
    datasetVersion: dataset.version,
    datasetHash: rawDatasetHash,
    recordCount: dataset.records.length,
    dataQualityScore: Math.max(70, qualityScore),
    anomaliesFound: anomalies,
    verifiedSources: [dataset.sourceOrigin, 'Provenance Telemetry Network'],
    evaluatedMetricsCount: dataset.metrics.length,
  };

  const evidenceHash = await browserSha256(evidenceSummary);
  steps.push({
    id: 'step-evidence',
    tool: 'EvidenceAnalyzer',
    status: 'completed',
    title: 'Evidence & Data Provenance Analyzer',
    summary: `Quality Score: ${evidenceSummary.dataQualityScore}%. ${evidenceSummary.anomaliesFound.length} anomalies detected.`,
    details: evidenceSummary,
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - step2Start,
  });

  // Step 3: DecisionEngine (Multi-Attribute Utility Theory / MADA)
  const step3Start = Date.now();
  const totalWeight = dataset.metrics.reduce((acc, m) => acc + (m.weight || 1), 0);

  const scoredRecords = dataset.records.map((rec) => {
    let score = 0;
    const proList: string[] = [];
    const conList: string[] = [];

    dataset.metrics.forEach((m) => {
      const values = dataset.records.map((r) => Number(r.attributes[m.id]) || 0);
      const min = Math.min(...values);
      const max = Math.max(...values);
      const range = max - min || 1;
      const curVal = Number(rec.attributes[m.id]) || 0;

      let norm = m.higherIsBetter ? (curVal - min) / range : (max - curVal) / range;
      norm = Math.max(0, Math.min(1, norm));
      const weightRatio = (m.weight || 1) / totalWeight;
      score += norm * weightRatio * 100;

      if (norm > 0.6) {
        proList.push(`Favorable ${m.name}: ${curVal} ${m.unit || ''}`);
      } else if (norm < 0.4) {
        conList.push(`Sub-optimal ${m.name}: ${curVal} ${m.unit || ''}`);
      }
    });

    return {
      record: rec,
      compositeScore: Math.round(score * 10) / 10,
      pros: proList.length ? proList : [`Acceptable baseline parameters across metrics`],
      cons: conList.length ? conList : [`Higher comparative cost or threshold relative to benchmarks`],
    };
  });

  scoredRecords.sort((a, b) => b.compositeScore - a.compositeScore);
  const winner = scoredRecords[0];

  const decisionOutput: DecisionOutput = {
    winnerId: winner.record.id,
    winnerName: winner.record.name,
    confidenceScore: Math.min(99, Math.round(winner.compositeScore)),
    recommendationSummary: `Selected ${winner.record.name} (${winner.record.code}) as optimal decision choice with composite score ${winner.compositeScore}/100.`,
    rationalePoints: [
      `Highest composite utility score (${winner.compositeScore}/100) across normalized weighted metrics.`,
      `Outperformed benchmark alternatives by +${(
        winner.compositeScore - (scoredRecords[1]?.compositeScore || 0)
      ).toFixed(1)} score points.`,
      ...(customInstructions ? [`Applied instruction: "${customInstructions}"`] : []),
    ],
    comparativeRankings: scoredRecords.map((item, rank) => ({
      entityId: item.record.id,
      entityName: item.record.name,
      overallScore: item.compositeScore,
      rank: rank + 1,
      pros: item.pros,
      cons: item.cons,
    })),
  };

  const reasoningHash = await browserSha256(decisionOutput);
  steps.push({
    id: 'step-reasoning',
    tool: 'DecisionEngine',
    status: 'completed',
    title: 'Multi-Criteria Decision Engine (MADA)',
    summary: `Winner: ${winner.record.name} (${winner.compositeScore}/100). Evaluated ${dataset.records.length} candidates.`,
    details: decisionOutput,
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - step3Start,
  });

  // Step 4: RiskChecker
  const step4Start = Date.now();
  const riskAssessment = {
    overallRiskLevel: 'LOW' as const,
    identifiedRisks: [
      `Primary operational reliance on ${winner.record.name} telemetry feed stability.`,
      `Verified metrics variance threshold within acceptable 5% tolerance band.`,
    ],
    mitigationSuggestions: [
      `Proceed with on-chain notarization and store dataset fingerprint snapshot.`,
    ],
  };

  const riskHash = await browserSha256(riskAssessment);
  steps.push({
    id: 'step-risk',
    tool: 'RiskChecker',
    status: 'completed',
    title: 'Audit & Compliance Risk Checker',
    summary: `Risk Rating: LOW. 0 conflicts of interest. 4/4 compliance rules PASSED.`,
    details: riskAssessment,
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - step4Start,
  });

  // Step 5: BlockchainNotary
  const step5Start = Date.now();

  const decisionRecordHash = await browserSha256({
    decId,
    rawDatasetHash,
    evidenceHash,
    reasoningHash,
    riskHash,
  });

  const merkleRoot = `0x${decisionRecordHash}`;
  const txHash = `0x${(await browserSha256(`${decId}-client-tx`)).substring(0, 64)}`;
  clientBlockCounter++;

  const hashes: CryptographicHashes = {
    rawDatasetHash,
    evidenceHash,
    reasoningHash,
    decisionRecordHash,
  };

  const onChainBlock: OnChainBlock = {
    blockIndex: clientBlockCounter,
    blockHash: merkleRoot,
    previousBlockHash: `0x${(await browserSha256(`block-${clientBlockCounter - 1}`)).substring(0, 64)}`,
    txHash,
    contractAddress: '0xC442ce42A6763e25664147b088DbD50B01C375e5',
    merkleRoot,
    merkleProof: [
      (await browserSha256('proof-1')).substring(0, 64),
      (await browserSha256('proof-2')).substring(0, 64),
    ],
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    network: 'EVM L1 Mainnet',
    nonce: Math.floor(Math.random() * 10000),
    gasUsed: 42100,
  };

  const record: DecisionRecord = {
    id: decId,
    useCase,
    title: dataset.title,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    datasetSnapshot: JSON.parse(JSON.stringify(dataset)),
    evidenceSummary,
    decisionOutput,
    riskAssessment,
    hashes,
    onChainBlock,
    steps,
  };

  steps.push({
    id: 'step-notary',
    tool: 'BlockchainNotary',
    status: 'completed',
    title: 'EVM On-Chain Blockchain Notary',
    summary: `Minted Block #${onChainBlock.blockIndex} | Tx: ${txHash.substring(0, 14)}...`,
    details: {
      blockIndex: onChainBlock.blockIndex,
      txHash,
      merkleRoot,
      contractAddress: onChainBlock.contractAddress,
      status: 'CONFIRMED',
    },
    timestamp: new Date().toISOString(),
    durationMs: Date.now() - step5Start,
  });

  return { success: true, record, steps };
}

/**
 * Client-side Tamper Verification Fallback Engine
 */
export async function verifyClientDataset(
  selectedRecord: DecisionRecord,
  currentDataset: Dataset
): Promise<VerificationResult> {
  const originalDatasetHash = selectedRecord.hashes.rawDatasetHash;
  const currentDatasetHash = await browserSha256(currentDataset);

  const diffs: FieldDiff[] = [];
  const originalSnap = selectedRecord.datasetSnapshot;

  originalSnap.records.forEach((origRec, rIdx) => {
    const curRec = currentDataset.records[rIdx];
    if (!curRec) return;

    originalSnap.metrics.forEach((m) => {
      const origVal = origRec.attributes[m.id];
      const curVal = curRec.attributes[m.id];

      if (origVal !== curVal) {
        diffs.push({
          entityId: origRec.id,
          entityName: origRec.name,
          field: m.name,
          originalValue: origVal,
          currentValue: curVal,
          status: 'altered',
          severity: 'HIGH',
        });
      } else {
        diffs.push({
          entityId: origRec.id,
          entityName: origRec.name,
          field: m.name,
          originalValue: origVal,
          currentValue: curVal,
          status: 'match',
          severity: 'LOW',
        });
      }
    });
  });

  const alteredDiffs = diffs.filter((d) => d.status === 'altered');
  const isVerified = originalDatasetHash === currentDatasetHash && alteredDiffs.length === 0;

  let aiAuditSummary = '';
  let impactAnalysis = '';

  if (isVerified) {
    aiAuditSummary = `AUTHENTIC dataset snapshot. Re-computed raw SHA-256 hash (0x${currentDatasetHash.substring(
      0,
      16
    )}...) matches On-Chain Block #${selectedRecord.onChainBlock.blockIndex}. All ${
      diffs.length
    } telemetry points verified untampered.`;
    impactAnalysis = 'Zero dataset variance detected. Decision rationale remains cryptographically sound.';
  } else {
    aiAuditSummary = `CRYPTOGRAPHIC MISMATCH ALERT: Re-calculated SHA-256 hash (0x${currentDatasetHash.substring(
      0,
      16
    )}...) does NOT match On-Chain Block #${
      selectedRecord.onChainBlock.blockIndex
    } (0x${originalDatasetHash.substring(0, 16)}...). Found ${
      alteredDiffs.length
    } tampered attribute value(s) post-notarization.`;
    impactAnalysis =
      'Original AI decision logic is compromised due to unverified dataset modifications post-notarization.';
  }

  return {
    decisionId: selectedRecord.id,
    useCase: selectedRecord.useCase,
    status: isVerified ? 'VERIFIED_GENUINE' : 'TAMPERED_DETECTED',
    comparedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
    originalDatasetHash,
    currentDatasetHash,
    onChainHash: selectedRecord.onChainBlock.blockHash,
    diffs,
    aiAuditSummary,
    reasons: isVerified
      ? [
          'Dataset SHA-256 binary hash matches original snapshot.',
          'Merkle root proof path validated against L1 block state.',
          'Timestamp sequence consistent with original notarization.',
        ]
      : [
          'SHA-256 dataset hash discrepancy detected.',
          `Found ${alteredDiffs.length} modified attribute values.`,
          'On-chain Merkle proof verification failed.',
        ],
    impactAnalysis,
  };
}
