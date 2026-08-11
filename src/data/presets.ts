import { Dataset } from '../types';

export const PROCUREMENT_PRESET: Dataset = {
  id: 'ds-procurement-2026',
  useCase: 'procurement',
  title: 'Global Supply Chain Supplier Matrix Q3-2026',
  version: '2026-08-11-v03',
  timestamp: '2026-08-11 08:40:00 UTC',
  recordCount: 3,
  sourceOrigin: 'SAP Enterprise ERP / Logistics Telemetry API v4',
  authorEmail: 'procurement-agent@enterprise.corp',
  metrics: [
    { id: 'unitCost', name: 'Unit Cost ($)', unit: 'USD', higherIsBetter: false, weight: 0.35 },
    { id: 'deliveryReliability', name: 'Delivery On-Time Rate (%)', unit: '%', higherIsBetter: true, weight: 0.25 },
    { id: 'qualityScore', name: 'Quality Index (1-100)', unit: 'pts', higherIsBetter: true, weight: 0.20 },
    { id: 'sustainabilityScore', name: 'ESG Carbon Score', unit: 'pts', higherIsBetter: true, weight: 0.10 },
    { id: 'historicalDisputeRate', name: 'Dispute Rate (%)', unit: '%', higherIsBetter: false, weight: 0.10 },
  ],
  records: [
    {
      id: 'supp-a',
      name: 'Global LogiCorp International',
      code: 'SUPP-A',
      attributes: {
        unitCost: 450,
        deliveryReliability: 88.5,
        qualityScore: 82,
        sustainabilityScore: 65,
        historicalDisputeRate: 4.2,
      },
      notes: 'Established Tier-1 vendor with high capacity but rising freight delay incidents.',
    },
    {
      id: 'supp-b',
      name: 'Apex Industrial Solutions',
      code: 'SUPP-B',
      attributes: {
        unitCost: 412,
        deliveryReliability: 97.4,
        qualityScore: 91,
        sustainabilityScore: 84,
        historicalDisputeRate: 0.8,
      },
      notes: 'ISO-9001 certified, automated fulfillment center with high sustainability rating.',
    },
    {
      id: 'supp-c',
      name: 'EcoSupply Tech Systems',
      code: 'SUPP-C',
      attributes: {
        unitCost: 485,
        deliveryReliability: 91.0,
        qualityScore: 94,
        sustainabilityScore: 96,
        historicalDisputeRate: 1.5,
      },
      notes: 'B-Corp certified, zero-carbon footprint supply chain, premium price point.',
    },
  ],
};

export const MEDICAL_PRESET: Dataset = {
  id: 'ds-medical-triage-402',
  useCase: 'medical',
  title: 'Acute Chest Pain Clinical Diagnostic Data (Patient #8841)',
  version: '2026-08-11-med-v01',
  timestamp: '2026-08-11 08:32:15 UTC',
  recordCount: 3,
  sourceOrigin: 'Epic EHR / ICU Cardiac Telemetry Monitoring Unit 3',
  authorEmail: 'triage-ai@stjude.hospital.org',
  metrics: [
    { id: 'troponinLevel', name: 'Hs-Troponin I (ng/L)', unit: 'ng/L', higherIsBetter: false, weight: 0.40 },
    { id: 'spo2Percent', name: 'Oxygen Saturation SpO2 (%)', unit: '%', higherIsBetter: true, weight: 0.20 },
    { id: 'systolicBP', name: 'Systolic Blood Pressure (mmHg)', unit: 'mmHg', higherIsBetter: false, weight: 0.15 },
    { id: 'heartRate', name: 'Heart Rate (BPM)', unit: 'BPM', higherIsBetter: false, weight: 0.15 },
    { id: 'comorbidityIndex', name: 'Charlson Comorbidity Score', unit: 'pts', higherIsBetter: false, weight: 0.10 },
  ],
  records: [
    {
      id: 'protocol-emergent',
      name: 'Protocol A: Immediate Cardiac Cath Lab Activation',
      code: 'PATH-EMERGENT',
      attributes: {
        troponinLevel: 142.5,
        spo2Percent: 91,
        systolicBP: 168,
        heartRate: 112,
        comorbidityIndex: 4,
      },
      notes: 'Indicated for STEMI / NSTEMI acute coronary syndrome with elevated troponin markers.',
    },
    {
      id: 'protocol-urgent',
      name: 'Protocol B: Inpatient Telemetry & Serial Biomarker Monitoring',
      code: 'PATH-URGENT',
      attributes: {
        troponinLevel: 142.5,
        spo2Percent: 91,
        systolicBP: 168,
        heartRate: 112,
        comorbidityIndex: 4,
      },
      notes: 'Observation unit stay with repeat troponin at 3h and 6h.',
    },
    {
      id: 'protocol-outpatient',
      name: 'Protocol C: Low-Risk Outpatient Stress Testing Discharge',
      code: 'PATH-LOW',
      attributes: {
        troponinLevel: 142.5,
        spo2Percent: 91,
        systolicBP: 168,
        heartRate: 112,
        comorbidityIndex: 4,
      },
      notes: 'Suitable for HEART score 0-3 with normal serial ECGs.',
    },
  ],
};

export const LOAN_PRESET: Dataset = {
  id: 'ds-credit-loan-9902',
  useCase: 'loan',
  title: 'Commercial Credit Underwriting Evaluation - Horizon BioTech Corp',
  version: '2026-08-11-fin-v02',
  timestamp: '2026-08-11 08:25:00 UTC',
  recordCount: 3,
  sourceOrigin: 'Moody Analytics / Corporate Credit Bureau & Treasury Feeds',
  authorEmail: 'risk-comm-underwriting@metrobank.com',
  metrics: [
    { id: 'debtServiceCoverage', name: 'DSCR Ratio', unit: 'x', higherIsBetter: true, weight: 0.30 },
    { id: 'debtToEquity', name: 'Debt to Equity', unit: 'x', higherIsBetter: false, weight: 0.25 },
    { id: 'creditRatingScore', name: 'Credit Score', unit: 'pts', higherIsBetter: true, weight: 0.20 },
    { id: 'collateralCoverage', name: 'Collateral Margin (%)', unit: '%', higherIsBetter: true, weight: 0.15 },
    { id: 'liquidityRatio', name: 'Quick Ratio', unit: 'x', higherIsBetter: true, weight: 0.10 },
  ],
  records: [
    {
      id: 'loan-option-a',
      name: 'Facility A: $2.5M Senior Secured Revolving Line @ 6.25%',
      code: 'LOAN-OPT-A',
      attributes: {
        debtServiceCoverage: 1.85,
        debtToEquity: 1.15,
        creditRatingScore: 780,
        collateralCoverage: 145,
        liquidityRatio: 1.62,
      },
      notes: 'Secured by accounts receivable and equipment lien. Fits risk profile.',
    },
    {
      id: 'loan-option-b',
      name: 'Facility B: $3.5M Unsecured Growth Term Loan @ 8.50%',
      code: 'LOAN-OPT-B',
      attributes: {
        debtServiceCoverage: 1.85,
        debtToEquity: 1.15,
        creditRatingScore: 780,
        collateralCoverage: 60,
        liquidityRatio: 1.62,
      },
      notes: 'Higher yield but collateral shortfall creates secondary default exposure.',
    },
    {
      id: 'loan-option-c',
      name: 'Facility C: Decline Application / Request Cash-Collateral Guarantee',
      code: 'LOAN-OPT-C',
      attributes: {
        debtServiceCoverage: 1.85,
        debtToEquity: 1.15,
        creditRatingScore: 780,
        collateralCoverage: 0,
        liquidityRatio: 1.62,
      },
      notes: 'Conservative posture, risk adverse rejection option.',
    },
  ],
};

export const PRESET_DATASETS: Record<string, Dataset> = {
  procurement: PROCUREMENT_PRESET,
  medical: MEDICAL_PRESET,
  loan: LOAN_PRESET,
};
