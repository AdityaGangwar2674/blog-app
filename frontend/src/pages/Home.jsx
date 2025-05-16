import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log(err));
  }, []);

  const published = blogs.filter((blog) => blog.status === "published");
  const drafts = blogs.filter((blog) => blog.status === "draft");

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <button
          onClick={() => navigate("/editor")}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          + Create New Blog
        </button>

        <h2 className="text-xl font-semibold mb-2">📃 Published Blogs</h2>
        <div className="grid gap-4">
          {published.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">✍️ Drafts</h2>
        <div className="grid gap-4">
          {drafts.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
