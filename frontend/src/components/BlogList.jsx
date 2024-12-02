import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch blogs from the API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setBlogs(data);
        } else {
          throw new Error("Response is not valid JSON");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  // Show loading message while fetching
  if (loading) {
    return (
      <div className="text-center text-gray-500 text-lg mt-10">Loading blogs...</div>
    );
  }

  // Show error message if there was an error
  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">
        Error: {error}
      </div>
    );
  }

  // Show message if no blogs are available
  if (blogs.length === 0) {
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        No blogs available. Start by creating one!
      </div>
    );
  }

  // Render the list of blogs
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map(({ _id, title, image, content }) => (
        <div
          key={_id}
          className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition-shadow"
        >
          {/* Display blog image */}
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          {/* Blog Title */}
          <h2 className="text-xl font-semibold text-gray-800 truncate">{title}</h2>
          {/* Blog Content Preview */}
          <p className="text-gray-600 mt-2">
            {content.length > 100 ? `${content.substring(0, 100)}...` : content}
          </p>
          {/* Read More Link */}
          <Link
            to={`/blog/${_id}`}
            className="inline-block mt-4 text-blue-600 font-medium hover:text-blue-800"
          >
            Read More →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
