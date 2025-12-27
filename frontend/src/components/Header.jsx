import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <span className="text-2xl font-bold text-google-blue">B</span>
              <span className="text-2xl font-bold text-google-red">l</span>
              <span className="text-2xl font-bold text-google-yellow">o</span>
              <span className="text-2xl font-bold text-google-blue">c</span>
              <span className="text-2xl font-bold text-google-green">k</span>
              <span className="text-2xl font-bold text-google-red">P</span>
              <span className="text-2xl font-bold text-google-blue">r</span>
              <span className="text-2xl font-bold text-google-yellow">o</span>
              <span className="text-2xl font-bold text-google-green">o</span>
              <span className="text-2xl font-bold text-google-red">f</span>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`${
                isActive('/') ? 'text-google-blue' : 'text-gray-700'
              } hover:text-google-blue transition-colors`}
            >
              Home
            </Link>
            <Link
              to="/admin"
              className={`${
                isActive('/admin') ? 'text-google-blue' : 'text-gray-700'
              } hover:text-google-blue transition-colors`}
            >
              Issue Certificate
            </Link>
            <Link
              to="/verify"
              className={`${
                isActive('/verify') ? 'text-google-blue' : 'text-gray-700'
              } hover:text-google-blue transition-colors`}
            >
              Verify
            </Link>
            <Link
              to="/about"
              className={`${
                isActive('/about') ? 'text-google-blue' : 'text-gray-700'
              } hover:text-google-blue transition-colors`}
            >
              About
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
