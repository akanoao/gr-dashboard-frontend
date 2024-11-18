import { Link } from 'react-router-dom';
import logo from "../assets/Logo/bgremoved_logo.png";

const Navbar = () => {
  return (
    <nav className="bg-gray-500">
      <div className="container mx-auto flex justify-center items-center">
        <Link to="/">
          <img
            src={logo}
            alt="Logo"
            className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-16"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;


