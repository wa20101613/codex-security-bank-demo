// Fake in-memory data for Codex Security training only.
// Do not replace this with real customer data.

// Intentional issue: fake hardcoded secrets for training.
const DATABASE_PASSWORD = "fake-training-db-password-do-not-use";
const PAYMENT_API_KEY = "fake-payment-api-key-do-not-use";
const ADMIN_BACKUP_TOKEN = "fake-admin-backup-token-do-not-use";

const users = [
  {
    id: 1,
    username: "alice",
    password: "password123",
    role: "employee",
    assignedCustomerIds: [1001, 1002, 1003]
  },
  {
    id: 2,
    username: "bob",
    password: "letmein",
    role: "employee",
    assignedCustomerIds: [1004, 1005]
  },
  {
    id: 3,
    username: "carol",
    password: "welcome1",
    role: "manager",
    assignedCustomerIds: [1001, 1002, 1003, 1004, 1005, 1006]
  },
  {
    id: 4,
    username: "admin",
    password: "admin",
    role: "admin",
    assignedCustomerIds: [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008]
  }
];

const customers = [
  {
    id: 1001,
    name: "Jane Example",
    email: "jane.example@example.test",
    accountId: "FAKE-ACCT-1001",
    balance: 2450.11,
    segment: "standard",
    riskRating: "low"
  },
  {
    id: 1002,
    name: "Robert Example",
    email: "robert.example@example.test",
    accountId: "FAKE-ACCT-1002",
    balance: 180.44,
    segment: "standard",
    riskRating: "medium"
  },
  {
    id: 1003,
    name: "Casey Example",
    email: "casey.example@example.test",
    accountId: "FAKE-ACCT-1003",
    balance: 12890.72,
    segment: "vip",
    riskRating: "low"
  },
  {
    id: 1004,
    name: "Morgan Example",
    email: "morgan.example@example.test",
    accountId: "FAKE-ACCT-1004",
    balance: 875.31,
    segment: "standard",
    riskRating: "medium"
  },
  {
    id: 1005,
    name: "Taylor Example",
    email: "taylor.example@example.test",
    accountId: "FAKE-ACCT-1005",
    balance: 54.12,
    segment: "standard",
    riskRating: "high"
  },
  {
    id: 1006,
    name: "Jordan Example",
    email: "jordan.example@example.test",
    accountId: "FAKE-ACCT-1006",
    balance: 6601.4,
    segment: "business",
    riskRating: "medium"
  },
  {
    id: 1007,
    name: "Riley Example",
    email: "riley.example@example.test",
    accountId: "FAKE-ACCT-1007",
    balance: 300.0,
    segment: "restricted",
    riskRating: "high"
  },
  {
    id: 1008,
    name: "Avery Example",
    email: "avery.example@example.test",
    accountId: "FAKE-ACCT-1008",
    balance: 9900.0,
    segment: "restricted",
    riskRating: "high"
  }
];

const customerNotes = [
  { customerId: 1001, note: "Fake note: customer asked about debit card replacement." },
  { customerId: 1001, note: "Fake note: customer requested address update." },
  { customerId: 1002, note: "Fake note: customer reported failed login." },
  { customerId: 1003, note: "Fake note: VIP customer asked about treasury features." },
  { customerId: 1004, note: "Fake note: customer requested fee review." },
  { customerId: 1005, note: "Fake note: high-risk fake account for training." },
  { customerId: 1006, note: "Fake note: business customer asked about ACH limits." },
  { customerId: 1007, note: "Fake restricted note: manual review required." },
  { customerId: 1008, note: "Fake restricted note: enhanced review required." }
];

const paymentHistory = [
  { id: 1, customerId: 1001, amount: 49.99, type: "fee_adjustment", status: "completed" },
  { id: 2, customerId: 1002, amount: 19.95, type: "refund", status: "completed" },
  { id: 3, customerId: 1003, amount: 500.0, type: "wire_fee_refund", status: "pending" },
  { id: 4, customerId: 1005, amount: 1200.0, type: "manual_credit", status: "review" }
];

const paymentAdjustments = [];

function simulatedQuery(sql) {
  return {
    warning: "This is a simulated SQL-style query for training only.",
    databasePasswordUsed: DATABASE_PASSWORD,
    sql
  };
}

module.exports = {
  DATABASE_PASSWORD,
  PAYMENT_API_KEY,
  ADMIN_BACKUP_TOKEN,
  users,
  customers,
  customerNotes,
  paymentHistory,
  paymentAdjustments,
  simulatedQuery
};
