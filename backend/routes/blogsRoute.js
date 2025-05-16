const express = require("express");
const router = express.Router();
const {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/blogController");

router.post("/save-draft", saveDraft);
router.post("/publish", publishBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

module.exports = router;
