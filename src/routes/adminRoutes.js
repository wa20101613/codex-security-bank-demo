const express = require("express");
const {
  users,
  customers,
  customerNotes,
  paymentHistory,
  paymentAdjustments,
  DATABASE_PASSWORD,
  PAYMENT_API_KEY,
  ADMIN_BACKUP_TOKEN
} = require("../db");
const { requireAdmin } = require("../middleware");
const { logSensitiveEvent } = require("../auditLogger");

const router = express.Router();

router.get("/export", requireAdmin, (req, res) => {
  // Intentional issue: admin gate can be bypassed with x-admin header.
  const exportData = {
    exportedAt: new Date().toISOString(),
    exportedBy: req.user,
    users,
    customers,
    customerNotes,
    paymentHistory,
    paymentAdjustments
  };

  logSensitiveEvent("admin_export", exportData);

  res.json(exportData);
});

router.get("/secrets", requireAdmin, (req, res) => {
  // Intentional issue: exposes fake secrets.
  res.json({
    databasePassword: DATABASE_PASSWORD,
    paymentApiKey: PAYMENT_API_KEY,
    adminBackupToken: ADMIN_BACKUP_TOKEN
  });
});

router.get("/users", requireAdmin, (req, res) => {
  // Intentional issue: exposes users including plaintext passwords.
  res.json({
    users
  });
});

module.exports = router;
