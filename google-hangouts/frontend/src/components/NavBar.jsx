import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">My App</Link>
        <ul className="flex space-x-4">
          <li><Link to="/chat" className="text-white">Chat</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
