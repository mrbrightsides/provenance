export type UseCaseType = 'procurement' | 'medical' | 'loan' | 'custom';

export interface DataMetric {
  id: string;
  name: string;
  unit?: string;
  higherIsBetter: boolean;
  weight: number; // e.g. 0 to 1
}

export interface EntityRecord {
  id: string;
  name: string;
  code: string;
  attributes: Record<string, number | string | boolean>;
  notes?: string;
}

export interface Dataset {
  id: string;
  useCase: UseCaseType;
  title: string;
  version: string;
  timestamp: string;
  recordCount: number;
  metrics: DataMetric[];
  records: EntityRecord[];
  sourceOrigin: string;
  authorEmail?: string;
}

export type AgentToolName =
  | 'DataInspector'
  | 'EvidenceAnalyzer'
  | 'DecisionEngine'
  | 'RiskChecker'
  | 'BlockchainNotary'
  | 'Verifier';

export interface AgentStep {
  id: string;
  tool: AgentToolName;
  status: 'pending' | 'running' | 'completed' | 'failed';
  title: string;
  summary: string;
  details?: Record<string, any>;
  timestamp: string;
  durationMs?: number;
}

export interface DecisionOutput {
  winnerId: string;
  winnerName: string;
  confidenceScore: number; // 0 to 100
  recommendationSummary: string;
  rationalePoints: string[];
  comparativeRankings: Array<{
    entityId: string;
    entityName: string;
    overallScore: number; // 0 to 100
    rank: number;
    pros: string[];
    cons: string[];
  }>;
}

export interface EvidenceSummary {
  datasetVersion: string;
  datasetHash: string;
  recordCount: number;
  dataQualityScore: number; // 0 to 100
  anomaliesFound: string[];
  verifiedSources: string[];
  evaluatedMetricsCount: number;
}

export interface CryptographicHashes {
  rawDatasetHash: string;
  evidenceHash: string;
  reasoningHash: string;
  decisionRecordHash: string;
}

export interface OnChainBlock {
  blockIndex: number;
  blockHash: string;
  previousBlockHash: string;
  txHash: string;
  contractAddress?: string;
  merkleRoot: string;
  merkleProof: string[];
  timestamp: string;
  network: string;
  nonce: number;
  gasUsed: number;
}

export interface DecisionRecord {
  id: string; // e.g. DEC-000128
  useCase: UseCaseType;
  title: string;
  timestamp: string;
  datasetSnapshot: Dataset;
  evidenceSummary: EvidenceSummary;
  decisionOutput: DecisionOutput;
  riskAssessment: {
    overallRiskLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    identifiedRisks: string[];
    mitigationSuggestions: string[];
  };
  hashes: CryptographicHashes;
  onChainBlock: OnChainBlock;
  steps: AgentStep[];
}

export interface FieldDiff {
  entityId: string;
  entityName: string;
  field: string;
  originalValue: any;
  currentValue: any;
  status: 'match' | 'altered';
  severity?: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface VerificationResult {
  decisionId: string;
  useCase: UseCaseType;
  status: 'VERIFIED_GENUINE' | 'TAMPERED_DETECTED' | 'INVALID_HASH';
  comparedAt: string;
  originalDatasetHash: string;
  currentDatasetHash: string;
  onChainHash: string;
  diffs: FieldDiff[];
  aiAuditSummary: string;
  reasons: string[];
  impactAnalysis: string;
}
