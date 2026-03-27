import { Link } from "react-router-dom";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

          {/* LOGO (UPDATED) */}
          <Link
            to="/"
            className="
              text-2xl font-extrabold tracking-wide
              bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500
              bg-clip-text text-transparent
              hover:opacity-80 transition
            "
          >
            P2P File Share
          </Link>

          <div className="hidden md:flex items-center space-x-8 font-medium">
            <Link to="/features" className="hover:text-pink-500">
              Features
            </Link>
            <Link to="/about" className="hover:text-pink-500">
              About
            </Link>
            <Link to="/contact" className="hover:text-pink-500">
              Contact
            </Link>

            {/* LOGIN BUTTON (UPDATED) */}
            <Link
              to="/login"
              className="
                px-5 py-2 rounded-lg font-semibold text-white
                bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500
                hover:shadow-lg hover:shadow-pink-300/40
                hover:scale-105
                transition-all
              "
            >
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        {children}
      </main>

      {/* FOOTER (UNCHANGED) */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} P2P File Share Lab</p>
          <div className="space-x-6 mt-4 md:mt-0">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/features" className="hover:text-white">Features</Link>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
