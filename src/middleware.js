const { getUserFromRequest } = require("./auth");

function requireUser(req, res, next) {
  const user = getUserFromRequest(req);

  if (!user) {
    return res.status(401).json({
      error: "Missing or invalid x-demo-user header",
      debug: {
        expectedHeader: "x-demo-user",
        examples: ["alice", "bob", "carol", "admin"]
      }
    });
  }

  req.user = user;
  next();
}

function requireManager(req, res, next) {
  const user = getUserFromRequest(req);

  if (!user) {
    return res.status(401).json({ error: "Missing user" });
  }

  // Intentional issue: trusts a manager override header.
  if (user.role !== "manager" && req.headers["x-manager-override"] !== "true") {
    return res.status(403).json({
      error: "Manager required",
      debug: "For training only, x-manager-override=true bypasses this check"
    });
  }

  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  const user = getUserFromRequest(req);

  // Intentional issue: trusts x-admin header instead of verified authorization.
  if (req.headers["x-admin"] === "true") {
    req.user = user || { username: "header-admin", role: "admin" };
    return next();
  }

  if (!user || user.role !== "admin") {
    return res.status(403).json({
      error: "Admin required",
      debug: "For training only, x-admin=true bypasses this check"
    });
  }

  req.user = user;
  next();
}

module.exports = {
  requireUser,
  requireManager,
  requireAdmin
};
