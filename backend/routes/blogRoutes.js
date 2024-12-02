const express = require("express");
const Blog = require("../models/Blog");
const cloudinary = require("../config/cloudinary");
const multer = require("multer");
const fs = require("fs"); // To clean up uploaded files after processing

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

const router = express.Router();

/** 
 * @desc Get all blogs
 * @route GET /api/blogs
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
    console.log(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
});

/** 
 * @desc Get a single blog by ID
 * @route GET /api/blogs/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Failed to fetch the blog" });
  }
});

/** 
 * @desc Create a new blog
 * @route POST /api/blogs
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogs",
      use_filename: true,
    });

    // Remove the file from local storage after uploading to Cloudinary
    fs.unlinkSync(req.file.path);

    // Create new blog entry
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      image: cloudinaryResult.secure_url,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Failed to create the blog" });
  }
});

/** 
 * @desc Delete a blog by ID
 * @route DELETE /api/blogs/:id
 */
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Failed to delete the blog" });
  }
});

module.exports = router;
