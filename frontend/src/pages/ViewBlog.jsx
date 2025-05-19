import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import Header from "../components/Header";

export default function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await fetch(`/api/blogs/${id}`);
      const data = await res.json();
      setBlog(data);

      const contentState = convertFromRaw(JSON.parse(data.content));
      setEditorState(EditorState.createWithContent(contentState));
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <div className="p-4 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
        <p className="text-gray-500 mb-4">Tags: {blog.tags.join(", ")}</p>
        <div className="border p-4 min-h-[200px] bg-gray-100">
          <Editor editorState={editorState} readOnly={true} />
        </div>
      </div>
    </>
  );
}
