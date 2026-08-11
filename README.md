# PROVENANCE AI — Cryptographic Audit & Memory Layer for Autonomous AI Agents

> **NTU InnovateX Hackathon 2026 Submission**  
> **Track 2**: Web3 Applications, AI Agents and Real-World Use Cases  
> 🔗 **Live Web App**: [https://provenance-ai.vercel.app/](https://provenance-ai.vercel.app/)  
> 📁 **GitHub Repository**: [https://github.com/mrbrightsides/provenance](https://github.com/mrbrightsides/provenance)  
> 📜 **EVM Deployed Smart Contract (CA)**: [`0xC442ce42A6763e25664147b088DbD50B01C375e5`](https://provenance-ai.vercel.app/)

---

## 🏆 Project Overview

**PROVENANCE AI** is a decentralized, tamper-evident audit and cryptographic memory layer designed for autonomous AI agents operating in high-stakes enterprise workflows. 

As AI agents transition from simple chatbots to autonomous actors making multi-million dollar procurement decisions, triage assignments, and credit underwriting approvals, businesses face a critical threat: **the "Black Box" AI Risk**. Without cryptographic proof, agentic decisions are vulnerable to retroactive data tampering, hallucination disputes, and regulatory compliance failures.

PROVENANCE AI solves this by decoupling high-performance off-chain AI reasoning (powered by **Gemini 3.6**) from on-chain immutable notarization on an EVM smart contract (`ProvenanceLedger.sol`). Every decision is mathematically bound to a raw dataset SHA-256 hash and a 4-leaf Merkle root tree.

---

## 🚀 Key Features & Architectural Innovations

### 1. 🤖 Gemini 3.6 Multi-Agent Evaluation Engine
- **Evidence Analysis**: Ingests multi-candidate datasets and evaluates telemetry streams.
- **Decision Engine**: Executes multi-attribute utility calculations with structured JSON output.
- **Risk Assessor**: Detects anomalies, outlier variances, and compliance conflicts before finalizing decisions.

### 2. 🧮 100% Transparent Mathematical Scoring Matrix (MADA)
- **Min-Max Normalization ($N_{ij}$)**:
  - *Higher is Better*: $N = \frac{x - \text{Min}}{\text{Max} - \text{Min}}$
  - *Lower is Better*: $N = \frac{\text{Max} - x}{\text{Max} - \text{Min}}$
- **Weighted Utility Score**:
  $$\text{Utility Score} = \sum_{j} (N_{ij} \times \text{WeightRatio}_j) \times 100$$
- Eliminates unit bias across disparate metrics (e.g., USD cost vs. SLA percentage vs. risk points).

### 3. 🛠️ Custom Evaluation Builder & Manual Entry Mode
- **Dynamic Candidate Rows**: Add/remove custom candidate options on the fly.
- **Custom Metric Columns**: Add custom evaluation parameters with customizable units (`USD`, `%`, `pts`, `ms`, etc.).
- **Interactive Weight Adjuster**: Real-time slider & weight normalization with instant formula updates.
- **Directional Toggles**: Toggle metrics between "Higher is Better" ($\uparrow$) and "Lower is Better" ($\downarrow$).

### 4. 🔬 Forensic Tamper Verifier Laboratory
- Real-time simulation of single-byte dataset corruption.
- Demonstrates how off-chain data alteration immediately invalidates the computed SHA-256 hash against the immutable on-chain record stored in `ProvenanceLedger.sol`.

### 5. 📜 Official Verifiable Audit Certificates
- Generates printable, high-authority compliance certificates with cryptographic QR seals, transaction hashes, Merkle root signatures, and notary timestamps.

### 6. ⚡ On-Chain EVM Smart Contract (`ProvenanceLedger.sol`)
- **Deployed Address**: `0xC442ce42A6763e25664147b088DbD50B01C375e5`
- Implements `notarizeDecision()` and `verifyDatasetIntegrity()`.
- Stores cryptographic hashes on-chain while keeping raw confidential business datasets secure off-chain.

---

## 🏗️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        PROVENANCE AI WORKFLOW                          │
└────────────────────────────────────────────────────────────────────────┘
                                   │
 1. OBSERVE ─────────► Ingests Raw Candidate Telemetry Datasets
                                   │
 2. REASON   ─────────► Gemini 3.6 Multi-Agent Reasoning Engine
                                   │
 3. VERIFY   ─────────► Computes SHA-256 Hash + 4-Leaf Merkle Root
                                   │
 4. ACT & PROVE ─────► Calls `notarizeDecision()` on EVM Contract
                       CA: 0xC442ce42A6763e25664147b088DbD50B01C375e5
                                   │
 5. AUDIT    ─────────► Forensic Real-Time Tamper-Proof Verification
```

---

## 🌐 Real-World Use Cases Covered

1. **Strategic Vendor Procurement**: Evaluates Unit Cost ($), Quality Index, Delivery SLA (%), and ESG Score.
2. **Emergency Medical Triage**: Evaluates NEWS2 Score, Oxygen Saturation, ICU Urgency, and Wait Time.
3. **Commercial Credit Underwriting**: Evaluates DSCR Ratio, Debt-to-Equity, Credit Bureau Score, and Collateral.
4. **Custom Builder**: Any custom multi-criteria enterprise decision (Cloud Infrastructure Vendor Selection, Web3 Developer Candidate Hiring, Freight Logistics, etc.).

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React Icons
- **Backend**: Node.js, Express.js (Port 3000 container proxy)
- **AI SDK**: `@google/genai` (Gemini 3.6 Flash)
- **Blockchain / Smart Contract**: Solidity ^0.8.20 (`ProvenanceLedger.sol`)
- **Deployment & Hosting**: Live on Vercel & EVM Network

---

## 💻 Local Development Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/mrbrightsides/provenance.git
   cd provenance
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 📄 License & Hackathon Credits

Built for **NTU InnovateX Hackathon 2026** — Track 2: Web3 Applications, AI Agents and Real-World Use Cases.  
Released under the MIT License.
