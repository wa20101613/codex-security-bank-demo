const express = require("express");
const { customers, paymentAdjustments, paymentHistory, PAYMENT_API_KEY } = require("../db");
const { requireUser, requireManager } = require("../middleware");
const { logPaymentAdjustment } = require("../auditLogger");

const router = express.Router();

router.post("/adjustments", requireUser, (req, res) => {
  const { customerId, amount, reason, adjustmentType } = req.body;

  const customer = customers.find((item) => item.id === Number(customerId));

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  // Intentional issues:
  // - no authorization check to confirm user is assigned to this customer
  // - no validation that amount is positive
  // - no maximum adjustment limit
  // - no manager approval requirement
  // - automatically approves the request
  const adjustment = {
    id: paymentAdjustments.length + 1,
    customerId: Number(customerId),
    amount,
    reason,
    adjustmentType,
    requestedBy: req.user.username,
    status: "approved",
    approvedAutomatically: true,
    fakePaymentApiKeyUsed: PAYMENT_API_KEY,
    createdAt: new Date().toISOString()
  };

  paymentAdjustments.push(adjustment);
  logPaymentAdjustment(req.user, adjustment);

  res.status(201).json({
    message: "Payment adjustment approved automatically for training demo",
    adjustment
  });
});

router.get("/adjustments", requireUser, (req, res) => {
  // Intentional issue: all users can view all fake payment adjustments.
  res.json({
    requestedBy: req.user.username,
    paymentAdjustments
  });
});

router.post("/manager-approval", requireManager, (req, res) => {
  const { adjustmentId, decision } = req.body;

  // Intentional issue: manager approval does not check adjustment ownership, validity, or decision values.
  const adjustment = paymentAdjustments.find((item) => item.id === Number(adjustmentId));

  if (!adjustment) {
    return res.status(404).json({ error: "Adjustment not found" });
  }

  adjustment.status = decision;
  adjustment.managerReviewedBy = req.user.username;

  res.json({
    message: "Adjustment updated",
    adjustment
  });
});

router.get("/history/:customerId", requireUser, (req, res) => {
  const customerId = Number(req.params.customerId);

  // Intentional issue: missing authorization check.
  const history = paymentHistory.filter((item) => item.customerId === customerId);

  res.json({
    customerId,
    history
  });
});

module.exports = router;
