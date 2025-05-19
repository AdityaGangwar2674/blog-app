import { Link } from "react-router-dom";
import {
  TagIcon,
  DocumentTextIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";

export default function BlogCard({ blog }) {
  let contentPreview = "";
  try {
    const contentRaw = JSON.parse(blog.content);
    contentPreview = contentRaw.blocks
      .map((block) => block.text)
      .join(" ")
      .slice(0, 150);
  } catch {
    contentPreview = "";
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-5 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
      <div>
        <Link
          to={
            blog.status === "draft"
              ? `/editor/${blog._id}`
              : `/blog/${blog._id}`
          }
          className="text-xl font-semibold text-blue-700 hover:underline flex items-center gap-2"
        >
          <DocumentTextIcon className="h-5 w-5 text-blue-500" />
          {blog.title ||
            (blog.status === "draft" ? "Untitled Draft" : "Untitled")}
        </Link>

        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          <TagIcon className="h-4 w-4 text-gray-400" />
          {blog.tags.length === 0 && (
            <span className="text-gray-400">No tags</span>
          )}
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 cursor-pointer hover:bg-blue-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-gray-700 line-clamp-3">
          {contentPreview || "No content yet."}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            blog.status === "draft"
              ? "bg-yellow-200 text-yellow-800"
              : "bg-green-200 text-green-800"
          }`}
        >
          {blog.status.toUpperCase()}
        </span>

        {blog.status === "draft" && (
          <Link
            to={`/editor/${blog._id}`}
            className="inline-flex items-center gap-1 text-sm text-yellow-600 hover:text-yellow-800"
          >
            <PencilIcon className="h-4 w-4" />
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}
