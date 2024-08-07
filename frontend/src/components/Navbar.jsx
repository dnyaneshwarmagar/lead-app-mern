import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <ul>
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Home</Link>
        </li>
        <li className={location.pathname === '/add' ? 'active' : ''}>
          <Link to="/add">Add Lead</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
