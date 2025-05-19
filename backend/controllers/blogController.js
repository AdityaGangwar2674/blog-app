const Blog = require("../models/Blog");

const saveDraft = async (req, res) => {
  const { id, title, content, tags } = req.body;

  try {
    if (id) {
      const updated = await Blog.findByIdAndUpdate(
        id,
        { title, content, tags, isPublished: false, updatedAt: new Date() },
        { new: true }
      );
      return res.status(200).json(updated);
    } else {
      const newDraft = new Blog({
        title,
        content,
        tags,
        isPublished: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      const saved = await newDraft.save();
      return res.status(200).json(saved);
    }
  } catch (error) {
    console.error("Error saving draft:", error);
    return res.status(500).json({ error: "Failed to save draft" });
  }
};
const publishBlog = async (req, res) => {
  const { id, title, content, tags } = req.body;

  try {
    const blog = id
      ? await Blog.findByIdAndUpdate(
          id,
          {
            title,
            content,
            tags,
            status: "published",
            updated_at: new Date(),
          },
          { new: true }
        )
      : await Blog.create({ title, content, tags, status: "published" });

    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ updated_at: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveDraft,
  publishBlog,
  getAllBlogs,
  getBlogById,
};
