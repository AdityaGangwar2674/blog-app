const Header = () => (
  <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
    <div className="container mx-auto flex items-center">
      <div className="text-3xl font-bold flex items-center">
        <span className="mr-2">✏️</span>
        <span>Blogger</span>
      </div>
      <nav className="ml-auto">
        <button className="bg-white text-indigo-600 px-4 py-2 rounded-full font-medium hover:bg-opacity-90 transition duration-200 shadow-md">
          Sign In
        </button>
      </nav>
    </div>
  </header>
);

export default Header;
