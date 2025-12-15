import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = { name: "John Doe" };
  const navigate = useNavigate();
  const logoutUser = () => {
    navigate("/");
  };
  return (
    <div className="shadow bg-white">
      <nav className="flex items-center justify-between mx-auto px-4 py-3.5 ">
        <Link to="/">
          <h1>Resumify</h1>
        </Link>
        <div className="flex items-center gap-4">
          <p>Hi, {user?.name}</p>
          <button onClick={logoutUser} className="px-7 py-1.5">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
