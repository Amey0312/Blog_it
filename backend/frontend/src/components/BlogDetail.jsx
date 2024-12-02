import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection

const BlogDetail = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null); // State to hold the blog data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For redirecting after delete

  useEffect(() => {
    // Fetch blog data by ID
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBlog(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Confirm with the user before deleting the blog
    const confirmed = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmed) return;

    // Delete the blog by ID
    fetch(`http://localhost:5000/api/blogs/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        // Redirect to home page or blog list after successful deletion
        navigate("/"); // Redirect to the homepage
      })
      .catch((error) => {
        console.error("Error deleting blog:", error);
      });
  };

  if (isLoading) return <div className="text-center text-gray-500">Loading...</div>;

  if (!blog) return <div className="text-center text-red-500">Blog not found!</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full max-h-96 object-cover mb-6 rounded-lg shadow-lg"
      />
      <p className="text-gray-700 text-lg">{blog.content}</p>
      <p className="text-gray-500 mt-6 text-sm">
        Published on: {new Date(blog.date).toLocaleDateString()}
      </p>

      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Delete Blog
      </button>
    </div>
  );
};

export default BlogDetail;
