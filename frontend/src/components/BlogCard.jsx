const BlogCard = ({ blog }) => {
  return (
    <div className="border p-4 rounded shadow-sm bg-white">
      <h3 className="text-lg font-bold">{blog.title}</h3>
      <p className="text-sm text-gray-600 mb-1">
        Status: <span className="font-medium">{blog.status}</span>
      </p>
      <p
        className="text-gray-700 mt-2 line-clamp-3"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogCard;
