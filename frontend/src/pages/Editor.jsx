import { useEffect, useState, useRef, useCallback } from "react";
import { Editor, EditorState, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import Header from "../components/Header";

const EditorComponent = () => {
  const [title, setTitle] = useState("Untitled Blog");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [saveStatus, setSaveStatus] = useState("idle"); // 'idle' | 'saving' | 'saved' | 'error'
  const [lastSaved, setLastSaved] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);

  // Mock the auto-save functionality for demonstration
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (title || content) {
        handleSave("auto");
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [title, content]);

  // Simulate debounced save when typing stops
  useEffect(() => {
    if (!title && !content) return;

    const debounceTimer = setTimeout(() => {
      handleSave("auto");
    }, 5000);

    return () => clearTimeout(debounceTimer);
  }, [title, content, tags]);

  const handleSave = (saveType) => {
    setSaveStatus("saving");

    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");
      setLastSaved(new Date());

      // Reset status after showing feedback
      if (saveType !== "auto") {
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setTimeout(() => setSaveStatus("idle"), 1500);
      }
    }, 800);
  };

  const handlePublish = () => {
    if (!title || !content) {
      alert("Please add a title and content before publishing.");
      return;
    }

    setIsPublishing(true);

    // Simulate publish API call
    setTimeout(() => {
      setIsPublishing(false);
      alert("Blog published successfully!");
    }, 1500);
  };

  // Format the last saved time
  const formatLastSaved = () => {
    if (!lastSaved) return "";

    return lastSaved.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Enhanced Header with user info
  const Header = () => (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold flex items-center">
          <span className="mr-2">✏️</span>
          <span>Blogger</span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-indigo-300 flex items-center justify-center text-white font-bold">
              U
            </div>
            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>
        </div>
      </div>
    </header>
  );

  // Auto-save indicator component
  const AutoSaveIndicator = () => {
    return (
      <div className="fixed bottom-6 right-6">
        <div
          className={`
          flex items-center bg-white rounded-lg shadow-lg px-4 py-3 transition-all duration-300
          ${saveStatus === "idle" && !lastSaved ? "opacity-0" : "opacity-100"}
        `}
        >
          {saveStatus === "saving" && (
            <>
              <div className="h-4 w-4 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin mr-3"></div>
              <span className="text-sm font-medium text-gray-600">
                Saving...
              </span>
            </>
          )}

          {saveStatus === "saved" && (
            <>
              <div className="text-green-500 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600">
                Saved {lastSaved ? `at ${formatLastSaved()}` : ""}
              </span>
            </>
          )}

          {saveStatus === "error" && (
            <>
              <div className="text-red-500 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
                </svg>
              </div>
              <span className="text-sm font-medium text-red-600">
                Failed to save
              </span>
            </>
          )}

          {saveStatus === "idle" && lastSaved && (
            <>
              <div className="text-gray-400 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                </svg>
              </div>
              <span className="text-sm text-gray-400">
                Last saved at {formatLastSaved()}
              </span>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Editor Toolbar */}
          <div className="bg-gray-50 border-b border-gray-200 p-4 flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="mr-4 text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-gray-800">Editor</h1>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => handleSave("manual")}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-200"
              >
                Save Draft
              </button>

              <button
                onClick={handlePublish}
                className={`px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:opacity-90 transition duration-200 flex items-center ${
                  isPublishing ? "opacity-80" : ""
                }`}
                disabled={isPublishing}
              >
                {isPublishing ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin mr-2"></div>
                    Publishing...
                  </>
                ) : (
                  "Publish"
                )}
              </button>
            </div>
          </div>

          {/* Editor Content */}
          <div className="p-6">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Blog Title"
              className="w-full text-3xl font-bold mb-6 border-0 border-b border-gray-200 pb-2 focus:outline-none focus:border-indigo-500 transition-colors"
            />

            <div className="min-h-[400px] mb-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog content here..."
                className="w-full h-full min-h-[400px] resize-none border-0 focus:outline-none text-gray-700 placeholder-gray-400"
              />
            </div>

            <div className="border-t border-gray-200 pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Enter tags separated by commas (e.g. webdev, javascript, react)"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </main>

      <AutoSaveIndicator />
    </div>
  );
};

export default EditorComponent;
