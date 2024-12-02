import React, { useState } from "react";

const BlogForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [errors, setErrors] = useState({}); // To track form validation errors

  // Handle input and file changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Validate form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData); // Call the parent's onSubmit function
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div>
        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.content ? "border-red-500" : "border-gray-300"
          }`}
          rows="5"
        />
        {errors.content && (
          <p className="text-red-500 text-sm">{errors.content}</p>
        )}
      </div>

      <div>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="w-full"
          accept="image/*"
        />
        {errors.image && <p className="text-red-500 text-sm">{errors.image}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default BlogForm;
