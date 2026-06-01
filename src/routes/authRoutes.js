const express = require("express");
const { login } = require("../auth");
const { logSensitiveEvent } = require("../auditLogger");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  logSensitiveEvent("login_attempt", {
    username,
    password,
    ip: req.ip,
    headers: req.headers
  });

  const result = login(username, password);

  if (!result) {
    return res.status(401).json({
      error: "Invalid login",
      debug: {
        usernameAttempted: username,
        passwordLength: password ? password.length : 0
      }
    });
  }

  res.json({
    message: "Login successful",
    token: result.token,
    user: result.user
  });
});

module.exports = router;
