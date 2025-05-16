const BlogCard = ({ blog }) => {
  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 border border-gray-100">
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 hover:text-indigo-600 transition duration-200">
            {blog.title}
          </h3>
          <span
            className={`px-2 py-1 text-xs rounded-full font-medium ${
              blog.status === "published"
                ? "bg-green-100 text-green-800"
                : "bg-amber-100 text-amber-800"
            }`}
          >
            {blog.status === "published" ? "Published" : "Draft"}
          </span>
        </div>

        <div
          className="text-gray-600 mt-2 text-sm line-clamp-2 h-10 overflow-hidden"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-1">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 flex justify-end space-x-2 border-t border-gray-100">
        <button className="text-sm text-gray-600 hover:text-indigo-600 px-3 py-1 rounded transition duration-200">
          Edit
        </button>
        <button className="text-sm bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1 rounded transition duration-200">
          View
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
