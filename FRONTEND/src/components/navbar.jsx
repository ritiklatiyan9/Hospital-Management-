// src/components/Navbar.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchUserData, logout } from '../features/auth/authSlice';
import { Menu, X, Home, Calendar, Info, UserPlus, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogin = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className="text-gray-700 hover:text-blue-500 flex items-center space-x-2 py-2"
      onClick={() => setIsOpen(false)}
    >
      <Icon size={20} />
      <span>{children}</span>
    </Link>
  );

  return (
    <nav className="bg-white shadow-md fixed w-full z-10 top-0">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-800">
            <Link to="/">Hospital</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <NavLink to="/" icon={Home}>Home</NavLink>
            <NavLink to="/appointment" icon={Calendar}>Appointment</NavLink>
            <NavLink to="/about" icon={Info}>About Us</NavLink>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 flex items-center space-x-2"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-green-900 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200 flex items-center space-x-2"
              >
                <LogIn size={20} />
                <span>Login</span>
              </button>
            )}
          </div>

          <div className="md:hidden z-30">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-white z-20 flex flex-col items-center justify-center space-y-6"
            >
              <NavLink to="/" icon={Home}>Home</NavLink>
              <NavLink to="/appointment" icon={Calendar}>Appointment</NavLink>
              <NavLink to="/about" icon={Info}>About Us</NavLink>
              <NavLink to="/register" icon={UserPlus}>Register</NavLink>

              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 flex items-center justify-center space-x-2"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="w-40 md:w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
