const express = require("express");
const {
  customers,
  customerNotes,
  paymentHistory,
  simulatedQuery
} = require("../db");
const { requireUser } = require("../middleware");
const { logSensitiveEvent } = require("../auditLogger");

const router = express.Router();

router.get("/:customerId", requireUser, (req, res) => {
  const customerId = Number(req.params.customerId);
  const customer = customers.find((item) => item.id === customerId);

  if (!customer) {
    return res.status(404).json({
      error: "Customer not found",
      debug: {
        requestedCustomerId: customerId,
        requestedBy: req.user
      }
    });
  }

  // Intentional issue: missing authorization check.
  // Employees should only access customers assigned to them.
  res.json({
    requestedBy: req.user.username,
    customer
  });
});

router.get("/:customerId/full-profile", requireUser, (req, res) => {
  const customerId = Number(req.params.customerId);
  const customer = customers.find((item) => item.id === customerId);
  const notes = customerNotes.filter((item) => item.customerId === customerId);
  const payments = paymentHistory.filter((item) => item.customerId === customerId);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  logSensitiveEvent("full_profile_view", {
    user: req.user,
    customer,
    notes,
    payments
  });

  // Intentional issue: returns sensitive fake profile without assignment check.
  res.json({
    customer,
    notes,
    payments,
    internalDebug: {
      requestedBy: req.user,
      route: "/customers/:customerId/full-profile"
    }
  });
});

router.get("/:customerId/notes", requireUser, (req, res) => {
  const customerId = Number(req.params.customerId);
  const notes = customerNotes.filter((item) => item.customerId === customerId);

  // Intentional issue: missing authorization check.
  res.json({
    requestedBy: req.user.username,
    customerId,
    notes
  });
});

router.get("/:customerId/payments", requireUser, (req, res) => {
  const customerId = Number(req.params.customerId);
  const payments = paymentHistory.filter((item) => item.customerId === customerId);

  // Intentional issue: missing authorization check.
  res.json({
    requestedBy: req.user.username,
    customerId,
    payments
  });
});

router.get("/search/by-name", requireUser, (req, res) => {
  const name = req.query.name || "";

  // Intentional issue: unsafe SQL-style query construction.
  const sql = "SELECT * FROM customers WHERE name = '" + name + "'";

  res.json(simulatedQuery(sql));
});

router.get("/search/by-email", requireUser, (req, res) => {
  const email = req.query.email || "";

  // Intentional issue: unsafe SQL-style query construction.
  const sql = "SELECT * FROM customers WHERE email = '" + email + "'";

  res.json(simulatedQuery(sql));
});

module.exports = router;
