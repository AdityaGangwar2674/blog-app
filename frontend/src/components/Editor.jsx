import { useState } from "react";
import { Editor as DraftEditor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";

export default function Editor() {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleSave = (status) => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    const blog = {
      title,
      content: rawContent,
      status,
    };

    fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      alert(`${status === "published" ? "Published" : "Saved"} successfully!`);
      setTitle("");
      setEditorState(EditorState.createEmpty());
    });
  };

  return (
    <div className="p-4">
      <input
        className="w-full p-2 border mb-2 text-lg font-semibold"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="border min-h-[200px] p-2">
        <DraftEditor editorState={editorState} onChange={setEditorState} />
      </div>

      <div className="mt-4 space-x-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => handleSave("published")}
        >
          Publish
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => handleSave("draft")}
        >
          Save Draft
        </button>
      </div>
    </div>
  );
}
