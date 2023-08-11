import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-[#FFD700] p-4 mb-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">My App</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-white">Peer to Peer</Link></li>
          <li><Link to="/send" className="text-white">SMS</Link></li>
          <li><Link to="/outbound" className="text-white">CALLS</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
