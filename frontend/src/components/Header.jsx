import { Link } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export default function Header() {
  return (
    <header className="p-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">
        <Link to="/" className="text-white hover:text-gray-200">
          My Blog Editor
        </Link>
      </h1>
      <nav>
        <Link
          to="/editor"
          className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold px-4 py-2 rounded shadow hover:bg-gray-100 transition"
        >
          <PlusCircleIcon className="w-5 h-5" />
          New Post
        </Link>
      </nav>
    </header>
  );
}
