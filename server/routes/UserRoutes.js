const express = require("express");

const { checkIfUserAdmin } = require("../controllers/UserController");

const router = express.Router();

router.get("/checkIfUserAdmin/:userId", checkIfUserAdmin);
module.exports = router;
