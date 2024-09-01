const express = require("express");
const { loginController, registerController, logoutController, refetchUserController } = require("../controllers/authController");
const router = express.Router();


//? Signup router
router.post("/signup",registerController);

//? LogIn router
router.post("/login",loginController);

//? Log out router
router.post("/logout",logoutController);

//? Fetch Current User
router.get("/refetch", refetchUserController);


module.exports = router;