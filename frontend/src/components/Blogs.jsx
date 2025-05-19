import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(setBlogs);
  }, []);

  const published = blogs.filter((b) => b.status === "published");
  const drafts = blogs.filter((b) => b.status === "draft");

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        My Blog Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        <section className="flex-1">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-green-700">
            Published Blogs
          </h2>
          {published.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {published.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No published blogs yet.</p>
          )}
        </section>

        {/* Draft Blogs */}
        <section className="flex-1">
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2 text-yellow-700">
            Drafts
          </h2>
          {drafts.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {drafts.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No drafts saved.</p>
          )}
        </section>
      </div>
    </div>
  );
}
