import { useEffect, useState, useRef, useCallback } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import Header from "../components/Header";

const EditorComponent = () => {
  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [tags, setTags] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saving' | 'saved'
  const timeoutRef = useRef(null);

  // Create a ref for the Draft.js Editor instance
  const editorRef = useRef(null);

  const content = JSON.stringify(convertToRaw(editorState.getCurrentContent()));

  const autoSave = useCallback(() => {
    if (!title && editorState.getCurrentContent().hasText() === false) {
      setSaveStatus("idle");
      return;
    }
    setSaveStatus("saving");
    fetch("http://localhost:5000/api/blogs/save-draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags: tags.split(",") }),
    })
      .then(() => {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000); // reset after 2 seconds
      })
      .catch(() => {
        setSaveStatus("idle"); // on error, just reset
      });
  }, [title, content, tags]);

  useEffect(() => {
    const interval = setInterval(autoSave, 30000);
    return () => clearInterval(interval);
  }, [autoSave]);

  const handleTyping = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(autoSave, 5000);
  };

  const handlePublish = () => {
    fetch("http://localhost:5000/api/blogs/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags: tags.split(",") }),
    }).then(() => alert("Published successfully!"));
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            handleTyping();
          }}
          placeholder="Title"
          className="w-full p-2 mb-4 border rounded"
        />

        <div
          className="mb-4 p-2 border rounded min-h-[200px]"
          onClick={() => editorRef.current && editorRef.current.focus()}
          style={{ cursor: "text" }}
        >
          <Editor
            editorState={editorState}
            onChange={(state) => {
              setEditorState(state);
              handleTyping();
            }}
            placeholder="Write your blog content here..."
            ref={editorRef} // assign ref here
          />
        </div>

        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma-separated)"
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Save status UI */}
        <div className="mb-2 min-h-[20px]">
          {saveStatus === "saving" && (
            <p className="text-blue-600">Saving draft...</p>
          )}
          {saveStatus === "saved" && (
            <p className="text-green-600">Draft saved!</p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={autoSave}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Save Draft
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorComponent;
