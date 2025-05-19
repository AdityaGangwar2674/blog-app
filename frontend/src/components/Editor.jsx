import { useState, useEffect, useRef } from "react";
import { Editor, EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export default function BlogEditor({ blogid }) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [toast, setToast] = useState("");
  const [blogId, setBlogId] = useState(null);

  const typingTimeoutRef = useRef(null);
  const isUnmounted = useRef(false);

  const parseTags = (tagString) =>
    tagString
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

  const saveDraft = async (isManual = false) => {
    const content = convertToRaw(editorState.getCurrentContent());
    const isContentEmpty =
      editorState.getCurrentContent().getPlainText().trim().length === 0;
    if (!title.trim() && isContentEmpty) return;

    try {
      const res = await fetch("/api/blogs/save-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blogId,
          title,
          content: JSON.stringify(content),
          tags: parseTags(tags),
        }),
      });

      const data = await res.json();

      if (!blogId && data._id) setBlogId(data._id);

      if (!isUnmounted.current) {
        setToast(isManual ? "Draft saved!" : "Draft auto-saved!");
        setTimeout(() => {
          setToast("");
        }, 3000);
      }
    } catch (err) {
      console.error("Failed to auto-save draft:", err);
    }
  };

  useEffect(() => {
    isUnmounted.current = false;
    return () => {
      isUnmounted.current = true;
    };
  }, []);

  useEffect(() => {
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      saveDraft();
    }, 5000);

    return () => clearTimeout(typingTimeoutRef.current);
  }, [title, tags, editorState]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      saveDraft();
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  useEffect(() => {
    if (!blogid) return;

    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${blogid}`);
        const data = await res.json();

        setTitle(data.title || "");
        setTags((data.tags || []).join(", "));
        const contentState = convertFromRaw(JSON.parse(data.content));
        setEditorState(EditorState.createWithContent(contentState));
        setBlogId(data._id);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
      }
    };

    fetchBlog();
  }, [blogid]);

  const publish = async () => {
    const content = convertToRaw(editorState.getCurrentContent());
    try {
      const res = await fetch("/api/blogs/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: blogId,
          title,
          content: JSON.stringify(content),
          tags: parseTags(tags),
        }),
      });

      if (!res.ok) throw new Error("Publish failed");

      setTitle("");
      setTags("");
      setEditorState(EditorState.createEmpty());
      setBlogId(null);

      setToast("Blog published!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error("Failed to publish blog:", err);
      setToast("Failed to publish blog");
      setTimeout(() => setToast(""), 3000);
    }
  };

  return (
    <>
      <div className="p-4 max-w-2xl mx-auto">
        <input
          className="w-full text-2xl font-bold mb-4 border-b"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="w-full text-base mb-4 border p-2 rounded"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className="border p-2 mb-4 min-h-[200px] cursor-text">
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>
        <button
          className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
          onClick={() => saveDraft(true)}
        >
          Save Draft
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded"
          onClick={publish}
        >
          Publish
        </button>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div
          className="fixed bottom-4 right-4 bg-black bg-opacity-80 text-white px-4 py-2 rounded shadow-lg z-50"
          role="alert"
          aria-live="assertive"
        >
          {toast}
        </div>
      )}
    </>
  );
}
