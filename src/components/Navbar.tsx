import { Link } from 'react-router-dom';
import logo from "../assets/Logo/logo.png";

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-500">
      <div className="container mx-auto flex justify-start items-center p-4">
        {/* Logo and Text */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-16 mr-4"
          />
          <span className="text-gray-700 text-xl font-semibold">
            All Dashboards
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


