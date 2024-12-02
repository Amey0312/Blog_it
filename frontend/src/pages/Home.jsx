import React, { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs
  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  // Add new blog
  const addBlog = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("image", formData.image);

    await fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      body: data,
    });

    // Refresh blog list
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold text-center my-6">My Blog</h1>
      <BlogList blogs={blogs} />
      <BlogForm onSubmit={addBlog} />
    </div>
  );
};

export default Home;
    