import { Link } from "react-router-dom";
import { auth } from "../config/firebase-config";
import Logo from "../assets/simulo.png";

const NavBar = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <nav className="flex bg-color1 p-4 fixed top-0 w-full h-28 shadow-lg">
      <img src={Logo} alt="logo" className="w-20" />
      <div className="flex justify-center w-full items-center gap-16 text-xl">
        <Link to="/due" className="text-color3 hover:text-gray-200">
          Due
        </Link>
        <Link to="/new" className="text-color3 hover:text-gray-200">
          New
        </Link>
        <Link to="/browse" className="text-color3 hover:text-gray-200">
          Browse
        </Link>
      </div>
      <div className="flex p-6">
        <button
          onClick={handleLogout}
          className="text-color3 hover:text-gray-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
