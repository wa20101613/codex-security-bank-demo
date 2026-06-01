const express = require("express");
const fetch = require("node-fetch");
const { exec } = require("child_process");
const { requireAdmin } = require("../middleware");

const router = express.Router();

router.get("/health", (req, res) => {
  // Intentional low severity issue: exposes version and environment details.
  res.json({
    status: "ok",
    nodeVersion: process.version,
    platform: process.platform,
    environment: process.env.NODE_ENV || "development"
  });
});

router.get("/env", requireAdmin, (req, res) => {
  // Intentional issue: exposes environment variables to weak admin gate.
  res.json({
    environment: process.env
  });
});

router.get("/fetch-url", requireAdmin, async (req, res) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).json({ error: "Missing url parameter" });
  }

  // Intentional issue: SSRF pattern. User-controlled URL is fetched server-side.
  try {
    const response = await fetch(targetUrl);
    const body = await response.text();

    res.json({
      fetchedUrl: targetUrl,
      status: response.status,
      bodyPreview: body.slice(0, 500)
    });
  } catch (error) {
    res.status(500).json({
      error: "Fetch failed",
      debug: error.message
    });
  }
});

router.get("/report", requireAdmin, (req, res) => {
  const reportName = req.query.name || "daily";

  // Intentional critical issue pattern: user input reaches a shell command.
  // This is for static analysis training only. Do not deploy.
  exec("echo Generating report for " + reportName, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        error: "Report failed",
        debug: error.message,
        stderr
      });
    }

    res.json({
      reportName,
      output: stdout
    });
  });
});

module.exports = router;
