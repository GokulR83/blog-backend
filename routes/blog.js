const express = require("express");
const {
    createBlogPostController,
    getAllBlogPostController,
    getBlogPostController,
    deleteBlogPostController
} = require("../controllers/blogController");
const upload = require("../middleware/upload");



const router = express.Router();


//? Create Post
router.post("/create/:userId",upload.single('blogPicture'),createBlogPostController);

//?Get all the Blog Post
router.get("/",getAllBlogPostController);

//? Get One Post
router.get("/:postId",getBlogPostController);

//? Delete Post
router.delete("/:postId",deleteBlogPostController);


module.exports = router;