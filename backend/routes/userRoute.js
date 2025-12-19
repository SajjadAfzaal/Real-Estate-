const express = require("express");
const router = express.Router();

const { user } = require("../controllers/userController");

router.get("/testuser", user);

module.exports = router;
