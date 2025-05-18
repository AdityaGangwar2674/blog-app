import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="p-4 bg-blue-600 text-white flex justify-between">
      <h1 className="text-xl font-bold">
        <Link to="/" className="text-white">
          My Blog Editor
        </Link>
      </h1>
      <nav className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/editor">New Post</Link>
      </nav>
    </header>
  );
}
