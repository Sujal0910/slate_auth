const router = require("express").Router();
const { ROLE } = require("../../config/roles");
// Bring in the User Registration function
const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../../Controllers/auth");

router.get("/", async (req, res) => {
  return res.send("Auth service running...");
});

// Users Registeration Route
router.post("/signup", async (req, res) => {
  await userRegister(req.body, ROLE.user, res);
});

// Admin Registration Route
router.post("/signup-admin", async (req, res) => {
  await userRegister(req.body, ROLE.admin, res);
});
router.post("/signup-teacher[id]", async (req, res) => {
  await userRegister(req.body, ROLE.teacher[id], res);
});

// Super Admin Registration Route
router.post("/signup-student[id]", async (req, res) => {
  await userRegister(req.body, ROLE.student[id], res);
});

// Users Login Route
router.post("/login", async (req, res) => {
  await userLogin(req.body, ROLE.user, res);
});

// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, ROLE.admin, res);
});

// Super Admin Login Route
router.post("/login-teacher[id]", async (req, res) => {
  await userLogin(req.body, ROLE.teacher[id], res);
});

// Super Admin Protected Route
router.get(
  "/admin-protected",
  userAuth,
  checkRole([ROLE.admin]),
  async (req, res) => {
    return res.json("Hello Teacher");
  }
);

module.exports = router;
