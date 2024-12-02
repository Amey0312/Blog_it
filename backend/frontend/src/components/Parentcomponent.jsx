import React from "react";
import BlogForm from "./BlogForm";

const ParentComponent = () => {
  const handleFormSubmit = (formData) => {
    console.log("Submitted Data:", formData);

    // FormData example for API calls
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("image", formData.image);

    // Send data to backend
    fetch("http://localhost:5000/api/blogs", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Blog created:", data);
      })
      .catch((error) => {
        console.error("Error creating blog:", error);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create a New Blog</h1>
      <BlogForm onSubmit={handleFormSubmit} />
    </div>
  );
};

export default ParentComponent;
