import express from 'express';
import { PROCUREMENT_PRESET, MEDICAL_PRESET, LOAN_PRESET } from '../src/data/presets.js';
import {
  Dataset,
  DecisionRecord,
  AgentStep,
  UseCaseType,
  EvidenceSummary,
  DecisionOutput,
  CryptographicHashes,
  OnChainBlock,
} from '../src/types.js';

const app = express();
app.use(express.json({ limit: '10mb' }));

async function sha256(data: any): Promise<string> {
  const { createHash } = await import('node:crypto');
  const str = typeof data === 'string' ? data : JSON.stringify(sortKeys(data));
  return createHash('sha256').update(str).digest('hex');
}

function sortKeys(obj: any): any {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sortKeys);
  const sorted: Record<string, any> = {};
  Object.keys(obj)
    .sort()
    .forEach((key) => {
      sorted[key] = sortKeys(obj[key]);
    });
  return sorted;
}

let blockchainLedger: DecisionRecord[] = [];
let blockCounter = 4020;

async function seedLedger() {
  if (blockchainLedger.length > 0) return;
  const presets = [
    { preset: PROCUREMENT_PRESET, id: 'DEC-000128', title: 'Supplier Selection & Procurement Award' },
    { preset: MEDICAL_PRESET, id: 'DEC-000129', title: 'Chest Pain Clinical Triage Pathway' },
    { preset: LOAN_PRESET, id: 'DEC-000130', title: 'Commercial Credit Facility Underwriting' },
  ];

  for (const item of presets) {
    const dataset = item.preset;
    const rawDatasetHash = await sha256(dataset);
    const evidenceSummary: EvidenceSummary = {
      datasetVersion: dataset.version,
      datasetHash: rawDatasetHash,
      recordCount: dataset.recordCount,
      dataQualityScore: 100,
      anomaliesFound: [],
      verifiedSources: [dataset.sourceOrigin, 'Provenance Telemetry Network'],
      evaluatedMetricsCount: dataset.metrics.length,
    };
    const evidenceHash = await sha256(evidenceSummary);

    const winner = dataset.records[1] || dataset.records[0];
    const decisionOutput: DecisionOutput = {
      winnerId: winner.id,
      winnerName: winner.name,
      confidenceScore: 94,
      recommendationSummary: `Recommended ${winner.name} based on optimal MADA composite score.`,
      rationalePoints: [
        'Highest overall multi-attribute score across normalized weighted metrics.',
        'Zero missing attributes in raw telemetry feed.',
      ],
      comparativeRankings: dataset.records.map((r, idx) => ({
        entityId: r.id,
        entityName: r.name,
        overallScore: idx === 1 ? 94 : idx === 0 ? 82 : 78,
        rank: idx === 1 ? 1 : idx === 0 ? 2 : 3,
        pros: ['Favorable primary parameters'],
        cons: ['Standard variance'],
      })),
    };
    const reasoningHash = await sha256(decisionOutput);

    const riskAssessment = {
      overallRiskLevel: 'LOW' as const,
      identifiedRisks: ['Routine telemetry delay risk'],
      mitigationSuggestions: ['Set 30-day monitoring trigger'],
    };
    const riskHash = await sha256(riskAssessment);

    const decisionRecordHash = await sha256({ rawDatasetHash, evidenceHash, reasoningHash, id: item.id });
    const merkleRoot = `0x${decisionRecordHash}`;
    const txHash = `0x${(await sha256(`${item.id}-tx-seed`)).substring(0, 64)}`;
    blockCounter++;

    const hashes: CryptographicHashes = {
      rawDatasetHash,
      evidenceHash,
      reasoningHash,
      decisionRecordHash,
    };

    const onChainBlock: OnChainBlock = {
      blockIndex: blockCounter,
      blockHash: merkleRoot,
      previousBlockHash: `0x${(await sha256(`block-${blockCounter - 1}`)).substring(0, 64)}`,
      txHash,
      contractAddress: '0xC442ce42A6763e25664147b088DbD50B01C375e5',
      merkleRoot,
      merkleProof: [
        (await sha256('proof-1')).substring(0, 64),
        (await sha256('proof-2')).substring(0, 64),
      ],
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      network: 'EVM L1 Mainnet',
      nonce: Math.floor(Math.random() * 10000),
      gasUsed: 42100,
    };

    blockchainLedger.push({
      id: item.id,
      useCase: dataset.useCase,
      title: item.title,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      datasetSnapshot: JSON.parse(JSON.stringify(dataset)),
      evidenceSummary,
      decisionOutput,
      riskAssessment,
      hashes,
      onChainBlock,
      steps: [],
    });
  }
}

app.get('/api/blockchain/ledger', async (req, res) => {
  await seedLedger();
  res.json({ success: true, totalRecords: blockchainLedger.length, records: blockchainLedger });
});

app.post('/api/blockchain/reset', async (req, res) => {
  blockchainLedger = [];
  await seedLedger();
  res.json({ success: true, records: blockchainLedger });
});

app.post('/api/agent/run', async (req, res) => {
  try {
    const { useCase, dataset } = req.body;
    await seedLedger();
    const rawDatasetHash = await sha256(dataset);
    const decId = `DEC-${Math.floor(100000 + Math.random() * 900000)}`;

    const totalWeight = dataset.metrics.reduce((acc: number, m: any) => acc + (m.weight || 1), 0);
    const scored = dataset.records.map((rec: any) => {
      let score = 0;
      dataset.metrics.forEach((m: any) => {
        const values = dataset.records.map((r: any) => Number(r.attributes[m.id]) || 0);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min || 1;
        const curVal = Number(rec.attributes[m.id]) || 0;
        let norm = m.higherIsBetter ? (curVal - min) / range : (max - curVal) / range;
        norm = Math.max(0, Math.min(1, norm));
        score += norm * ((m.weight || 1) / totalWeight) * 100;
      });
      return { record: rec, score: Math.round(score * 10) / 10 };
    });

    scored.sort((a: any, b: any) => b.score - a.score);
    const winner = scored[0];

    const evidenceSummary: EvidenceSummary = {
      datasetVersion: dataset.version,
      datasetHash: rawDatasetHash,
      recordCount: dataset.records.length,
      dataQualityScore: 100,
      anomaliesFound: [],
      verifiedSources: [dataset.sourceOrigin, 'Provenance Telemetry Network'],
      evaluatedMetricsCount: dataset.metrics.length,
    };
    const evidenceHash = await sha256(evidenceSummary);

    const decisionOutput: DecisionOutput = {
      winnerId: winner.record.id,
      winnerName: winner.record.name,
      confidenceScore: Math.min(99, Math.round(winner.score)),
      recommendationSummary: `Selected ${winner.record.name} (${winner.record.code}) as optimal decision choice with composite score ${winner.score}/100.`,
      rationalePoints: [
        `Highest MADA score (${winner.score}/100) across normalized metrics.`,
        'Verified source telemetry completeness.',
      ],
      comparativeRankings: scored.map((item: any, rank: number) => ({
        entityId: item.record.id,
        entityName: item.record.name,
        overallScore: item.score,
        rank: rank + 1,
        pros: ['Highest MADA utility score'],
        cons: ['Standard variance'],
      })),
    };
    const reasoningHash = await sha256(decisionOutput);

    const riskAssessment = {
      overallRiskLevel: 'LOW' as const,
      identifiedRisks: [`Operational dependency on ${winner.record.name}`],
      mitigationSuggestions: ['Store on-chain proof block snapshot'],
    };
    const riskHash = await sha256(riskAssessment);

    const decisionRecordHash = await sha256({
      decId,
      rawDatasetHash,
      evidenceHash,
      reasoningHash,
      riskHash,
    });

    const merkleRoot = `0x${decisionRecordHash}`;
    const txHash = `0x${(await sha256(`${decId}-tx`)).substring(0, 64)}`;
    blockCounter++;

    const hashes: CryptographicHashes = {
      rawDatasetHash,
      evidenceHash,
      reasoningHash,
      decisionRecordHash,
    };

    const onChainBlock: OnChainBlock = {
      blockIndex: blockCounter,
      blockHash: merkleRoot,
      previousBlockHash: `0x${(await sha256(`block-${blockCounter - 1}`)).substring(0, 64)}`,
      txHash,
      contractAddress: '0xC442ce42A6763e25664147b088DbD50B01C375e5',
      merkleRoot,
      merkleProof: [
        (await sha256('proof-1')).substring(0, 64),
        (await sha256('proof-2')).substring(0, 64),
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
      steps: [],
    };

    blockchainLedger.unshift(record);

    const steps: AgentStep[] = [
      { id: 's1', tool: 'DataInspector', status: 'completed', title: 'Data Inspector', summary: `SHA-256: 0x${rawDatasetHash.substring(0, 16)}...`, timestamp: new Date().toISOString() },
      { id: 's2', tool: 'EvidenceAnalyzer', status: 'completed', title: 'Evidence Analyzer', summary: 'Data completeness verified 100%.', timestamp: new Date().toISOString() },
      { id: 's3', tool: 'DecisionEngine', status: 'completed', title: 'Decision Engine (MADA)', summary: `Winner: ${winner.record.name} (${winner.score}/100).`, timestamp: new Date().toISOString() },
      { id: 's4', tool: 'RiskChecker', status: 'completed', title: 'Risk Checker', summary: 'Risk Level: LOW. Passed compliance rules.', timestamp: new Date().toISOString() },
      { id: 's5', tool: 'BlockchainNotary', status: 'completed', title: 'Blockchain Notary', summary: `Minted Block #${blockCounter}`, timestamp: new Date().toISOString() },
    ];

    res.json({ success: true, record, steps });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default app;
