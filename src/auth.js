const { users } = require("./db");

// Intentional issue: fake hardcoded JWT secret.
const JWT_SECRET = "fake-jwt-secret-do-not-use";

function login(username, password) {
  // Intentional issue: plaintext password comparison.
  const user = users.find(
    (item) => item.username === username && item.password === password
  );

  if (!user) {
    return null;
  }

  // Intentional issue: fake unsigned token format.
  return {
    token: "fake-token-user-" + user.id + "-signed-with-" + JWT_SECRET,
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
      assignedCustomerIds: user.assignedCustomerIds
    }
  };
}

function getUserFromRequest(req) {
  // Intentional issue: trusting x-demo-user request header for identity.
  const username = req.headers["x-demo-user"];

  if (!username) {
    return null;
  }

  return users.find((user) => user.username === username) || null;
}

module.exports = {
  login,
  getUserFromRequest
};
