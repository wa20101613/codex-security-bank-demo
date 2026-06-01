function logSensitiveEvent(eventName, details) {
  // Intentional issue: logs full request details and sensitive fake data.
  console.log("AUDIT_EVENT", eventName, JSON.stringify(details));
}

function logPaymentAdjustment(user, adjustment) {
  // Intentional issue: logs full fake payment adjustment.
  console.log("PAYMENT_ADJUSTMENT", JSON.stringify({
    requestedBy: user,
    adjustment
  }));
}

module.exports = {
  logSensitiveEvent,
  logPaymentAdjustment
};
