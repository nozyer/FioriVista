const express = require("express");

const { checkIfUserAdmin } = require("../controllers/UserController");
const { getAllUsers } = require("../controllers/UserController");
const { changeUserRole } = require("../controllers/UserController");
const { deleteUser } = require("../controllers/UserController");
const { addAdress } = require("../controllers/UserController");
const { fetchUserData } = require("../controllers/UserController");
const { updateUserDetails } = require("../controllers/UserController");

const router = express.Router();

router.get("/checkIfUserAdmin/:userId", checkIfUserAdmin);
router.get("/getAllUsers", getAllUsers);
router.post("/changeUserRole/:userId", changeUserRole);
router.delete("/deleteUser/:userUid", deleteUser);
router.post("/addAdress/:userId", addAdress);
router.get("/fetchUserData/:userId", fetchUserData);
router.post("/updateUserDetails/:userId", updateUserDetails);

module.exports = router;
