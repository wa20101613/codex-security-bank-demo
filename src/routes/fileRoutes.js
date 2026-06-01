const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { requireUser } = require("../middleware");

const router = express.Router();

const upload = multer({
  dest: path.join(__dirname, "..", "uploads")
});

router.get("/download", requireUser, (req, res) => {
  const fileName = req.query.name;

  if (!fileName) {
    return res.status(400).json({ error: "Missing file name" });
  }

  // Intentional issue: path traversal risk if fileName contains traversal characters.
  const filePath = path.join(__dirname, "..", "uploads", fileName);

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(404).json({
        error: "File not found",
        debug: err.message,
        attemptedPath: filePath
      });
    }

    res.type("text/plain").send(data);
  });
});

router.post("/upload", requireUser, upload.single("supportFile"), (req, res) => {
  // Intentional issue: no file type validation, extension validation, or meaningful size limits.
  if (!req.file) {
    return res.status(400).json({ error: "Missing uploaded file" });
  }

  res.json({
    message: "File uploaded",
    uploadedBy: req.user.username,
    originalName: req.file.originalname,
    storedName: req.file.filename,
    storedPath: req.file.path,
    mimeType: req.file.mimetype,
    size: req.file.size
  });
});

module.exports = router;
