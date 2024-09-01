const express = require("express");

const upload = require("../middleware/upload");
const { 
    getUserController,
    updateUserController,
    deleteUserController,
    uploadProfilePicture 
} = require("../controllers/userController");


const router = express.Router();

//? Get User
router.get("/:userId", getUserController);

//?Update User
router.put("/update/:userId", updateUserController);

//? Delete
router.delete("/delete/:userId",deleteUserController);

//? Update Profile Picture
router.put('/upload/:userId', upload.single('profilePicture'),uploadProfilePicture);

module.exports = router;