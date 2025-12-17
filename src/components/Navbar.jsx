import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const user = { name: "John Doe" };
  const navigate = useNavigate();

  const logoutUser = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">
            Resu
            <span className="text-[#432DD7]">mify</span>
          </span>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
          <p className="text-sm text-gray-600">
            Hi, <span className="font-medium">{user?.name}</span>
          </p>

          <button
            onClick={logoutUser}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium
              rounded-lg border border-gray-200 text-gray-600
              hover:border-[#432DD7] hover:text-[#432DD7]
              transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
