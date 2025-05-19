import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import ViewBlog from "./pages/ViewBlog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/editor/:id" element={<EditorPage />} /> {/* edit mode */}
        <Route path="/blog/:id" element={<ViewBlog />} /> {/* view-only */}
      </Routes>
    </Router>
  );
}

export default App;
