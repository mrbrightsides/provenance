// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ProvenanceLedger
 * @dev On-Chain Tamper-Evident Memory and Verification Layer for PROVENANCE AI.
 * Stores decision cryptographic hashes, Merkle roots, and evidence snapshots.
 *
 * Architecture: Observe -> Reason -> Verify -> Act -> Prove
 *
 * NOTE: Raw sensitive dataset parameters remain strictly off-chain for data sovereignty.
 * Only cryptographic proofs (SHA-256 hashes & Merkle roots) are stored on-chain.
 */
contract ProvenanceLedger {
    
    struct DecisionRecord {
        string decisionId;          // e.g. "DEC-000128"
        string useCase;             // e.g. "procurement", "medical", "loan"
        string title;               // e.g. "Global Supply Chain Supplier Matrix Q3-2026"
        bytes32 rawDatasetHash;     // SHA-256 hash of raw evaluation dataset
        bytes32 evidenceHash;       // SHA-256 hash of data quality & origin evidence
        bytes32 reasoningHash;      // SHA-256 hash of AI reasoning output & rationale
        bytes32 merkleRoot;         // Merkle Root summarizing decision tree
        string winnerName;          // Name of selected winner entity
        uint256 timestamp;          // Unix timestamp when block was notarized
        address notary;             // EVM address of the notarizing AI Agent
    }

    // Mapping from decisionId to DecisionRecord
    mapping(string => DecisionRecord) private _records;
    
    // Array storing all decision IDs in chronological order
    string[] private _decisionIds;

    // Contract owner / AI Agent authority address
    address public owner;

    // Events emitted when a decision is notarized or verified
    event DecisionNotarized(
        string indexed decisionId,
        string useCase,
        bytes32 indexed rawDatasetHash,
        bytes32 merkleRoot,
        string winnerName,
        uint256 timestamp,
        address indexed notary
    );

    event DecisionVerified(
        string indexed decisionId,
        bool isGenuine,
        bytes32 computedHash,
        bytes32 onChainHash,
        uint256 verifiedAt
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "ProvenanceLedger: Caller is not the authorized owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Notarizes a new AI Agent decision record on-chain.
     * @param decisionId Unique decision identifier (e.g., DEC-000128)
     * @param useCase Domain category
     * @param title Title or subject of the decision
     * @param rawDatasetHash SHA-256 hash of the input dataset
     * @param evidenceHash SHA-256 hash of evidence metrics
     * @param reasoningHash SHA-256 hash of AI reasoning & rationale
     * @param merkleRoot Combined Merkle root hash
     * @param winnerName Selected entity/winner label
     */
    function notarizeDecision(
        string calldata decisionId,
        string calldata useCase,
        string calldata title,
        bytes32 rawDatasetHash,
        bytes32 evidenceHash,
        bytes32 reasoningHash,
        bytes32 merkleRoot,
        string calldata winnerName
    ) external onlyOwner {
        require(_records[decisionId].timestamp == 0, "ProvenanceLedger: Decision record already exists");
        require(bytes(decisionId).length > 0, "ProvenanceLedger: Invalid decisionId");

        DecisionRecord memory newRecord = DecisionRecord({
            decisionId: decisionId,
            useCase: useCase,
            title: title,
            rawDatasetHash: rawDatasetHash,
            evidenceHash: evidenceHash,
            reasoningHash: reasoningHash,
            merkleRoot: merkleRoot,
            winnerName: winnerName,
            timestamp: block.timestamp,
            notary: msg.sender
        });

        _records[decisionId] = newRecord;
        _decisionIds.push(decisionId);

        emit DecisionNotarized(
            decisionId,
            useCase,
            rawDatasetHash,
            merkleRoot,
            winnerName,
            block.timestamp,
            msg.sender
        );
    }

    /**
     * @notice Verifies if a given dataset SHA-256 hash matches the immutable on-chain record.
     * @param decisionId The decision ID to query
     * @param computedDatasetHash Re-computed SHA-256 hash of dataset presented by auditor
     * @return isGenuine True if computed hash matches on-chain record exactly
     * @return storedHash The original SHA-256 hash stored on-chain
     */
    function verifyDatasetIntegrity(
        string calldata decisionId,
        bytes32 computedDatasetHash
    ) external returns (bool isGenuine, bytes32 storedHash) {
        DecisionRecord memory rec = _records[decisionId];
        require(rec.timestamp > 0, "ProvenanceLedger: Decision record does not exist");

        storedHash = rec.rawDatasetHash;
        isGenuine = (computedDatasetHash == storedHash);

        emit DecisionVerified(
            decisionId,
            isGenuine,
            computedDatasetHash,
            storedHash,
            block.timestamp
        );

        return (isGenuine, storedHash);
    }

    /**
     * @notice Retrieves full on-chain record details for a decision.
     */
    function getDecisionRecord(string calldata decisionId) external view returns (DecisionRecord memory) {
        require(_records[decisionId].timestamp > 0, "ProvenanceLedger: Decision record does not exist");
        return _records[decisionId];
    }

    /**
     * @notice Returns total number of notarized decision blocks.
     */
    function getTotalDecisions() external view returns (uint256) {
        return _decisionIds.length;
    }

    /**
     * @notice Retrieves decision ID by index for enumeration.
     */
    function getDecisionIdByIndex(uint256 index) external view returns (string memory) {
        require(index < _decisionIds.length, "ProvenanceLedger: Index out of bounds");
        return _decisionIds[index];
    }

    /**
     * @notice Transfer contract ownership to a new AI Agent or Governance wallet.
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "ProvenanceLedger: Invalid owner address");
        owner = newOwner;
    }
}
