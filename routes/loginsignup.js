const router = require("express").Router();
const { login, signup } = require("../contollers/loginsignup");

router.post("/signup", signup);
router.post("/login", login);

module.exports = router;
