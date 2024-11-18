import { Link } from 'react-router-dom';
import logo from "../assets/Logo/bgremoved_logo.png";

const MainDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Main Dashboard</h1>

        <div className="max-w-sm w-full bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg mx-auto">
          <Link to="/certificate">
            <img
              className="w-full h-48 object-cover"
              src={logo}
              alt="Card Image"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-center">Certificate</h2>
              
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
