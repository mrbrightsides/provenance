export const DEPLOYED_CONTRACT_ADDRESS = "0xC442ce42A6763e25664147b088DbD50B01C375e5";

export const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "string", "name": "decisionId", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "useCase", "type": "string" },
      { "indexed": true, "internalType": "bytes32", "name": "rawDatasetHash", "type": "bytes32" },
      { "indexed": false, "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" },
      { "indexed": false, "internalType": "string", "name": "winnerName", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "indexed": true, "internalType": "address", "name": "notary", "type": "address" }
    ],
    "name": "DecisionNotarized",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "string", "name": "decisionId", "type": "string" },
      { "indexed": false, "internalType": "bool", "name": "isGenuine", "type": "bool" },
      { "indexed": false, "internalType": "bytes32", "name": "computedHash", "type": "bytes32" },
      { "indexed": false, "internalType": "bytes32", "name": "onChainHash", "type": "bytes32" },
      { "indexed": false, "internalType": "uint256", "name": "verifiedAt", "type": "uint256" }
    ],
    "name": "DecisionVerified",
    "type": "event"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "decisionId", "type": "string" },
      { "internalType": "string", "name": "useCase", "type": "string" },
      { "internalType": "string", "name": "title", "type": "string" },
      { "internalType": "bytes32", "name": "rawDatasetHash", "type": "bytes32" },
      { "internalType": "bytes32", "name": "evidenceHash", "type": "bytes32" },
      { "internalType": "bytes32", "name": "reasoningHash", "type": "bytes32" },
      { "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" },
      { "internalType": "string", "name": "winnerName", "type": "string" }
    ],
    "name": "notarizeDecision",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "string", "name": "decisionId", "type": "string" },
      { "internalType": "bytes32", "name": "computedDatasetHash", "type": "bytes32" }
    ],
    "name": "verifyDatasetIntegrity",
    "outputs": [
      { "internalType": "bool", "name": "isGenuine", "type": "bool" },
      { "internalType": "bytes32", "name": "storedHash", "type": "bytes32" }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "index", "type": "uint256" }],
    "name": "getDecisionIdByIndex",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "string", "name": "decisionId", "type": "string" }],
    "name": "getDecisionRecord",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "decisionId", "type": "string" },
          { "internalType": "string", "name": "useCase", "type": "string" },
          { "internalType": "string", "name": "title", "type": "string" },
          { "internalType": "bytes32", "name": "rawDatasetHash", "type": "bytes32" },
          { "internalType": "bytes32", "name": "evidenceHash", "type": "bytes32" },
          { "internalType": "bytes32", "name": "reasoningHash", "type": "bytes32" },
          { "internalType": "bytes32", "name": "merkleRoot", "type": "bytes32" },
          { "internalType": "string", "name": "winnerName", "type": "string" },
          { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
          { "internalType": "address", "name": "notary", "type": "address" }
        ],
        "internalType": "struct ProvenanceLedger.DecisionRecord",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalDecisions",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  }
];
