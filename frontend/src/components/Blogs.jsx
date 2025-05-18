import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  const published = blogs.filter((b) => b.status === "published");
  const drafts = blogs.filter((b) => b.status === "draft");

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Published</h2>
      {published.map((b) => (
        <div key={b._id} className="border p-2 mb-2">
          {b.title}
        </div>
      ))}
      <h2 className="text-lg font-bold mt-4 mb-2">Drafts</h2>
      {drafts.map((b) => (
        <div key={b._id} className="border p-2 mb-2 text-gray-600">
          {b.title}
        </div>
      ))}
    </div>
  );
}
