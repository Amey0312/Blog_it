import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold">{blog.title}</h1>
      <img src={blog.image} alt={blog.title} className="my-4" />
      <p>{blog.content}</p>
    </div>
  );
};

export default Blog;
