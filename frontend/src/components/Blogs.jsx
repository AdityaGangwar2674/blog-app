import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(setBlogs);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-2">Published Blogs</h2>
      {blogs
        .filter((b) => b.status === "published")
        .map((blog) => (
          <div key={blog._id} className="mb-4">
            <Link
              to={`/blog/${blog._id}`}
              className="text-lg text-blue-600 hover:underline"
            >
              {blog.title}
              {" - " + blog.tags.join(", ")}
              {blog.content}
            </Link>
          </div>
        ))}

      <h2 className="text-2xl font-semibold mt-6 mb-2">Drafts</h2>
      {blogs
        .filter((b) => b.status === "draft")
        .map((blog) => (
          <div key={blog._id} className="mb-4">
            <Link
              to={`/editor/${blog._id}`}
              className="text-lg text-gray-600 hover:underline"
            >
              {blog.title || "Untitled Draft"}
              {" - " + blog.tags.join(", ")}
              {blog.content}
            </Link>
          </div>
        ))}
    </div>
  );
}
