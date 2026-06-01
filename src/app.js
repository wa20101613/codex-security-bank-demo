const express = require("express");

const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const fileRoutes = require("./routes/fileRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const debugRoutes = require("./routes/debugRoutes");

const app = express();

app.use(express.json({ limit: "10mb" }));

app.get("/", (req, res) => {
  res.json({
    message: "Codex Security bank demo API. Do not deploy.",
    environment: process.env.NODE_ENV || "development"
  });
});

app.use("/auth", authRoutes);
app.use("/customers", customerRoutes);
app.use("/admin", adminRoutes);
app.use("/files", fileRoutes);
app.use("/payments", paymentRoutes);
app.use("/debug", debugRoutes);

app.listen(3000, () => {
  console.log("Codex Security bank demo listening on port 3000");
});
