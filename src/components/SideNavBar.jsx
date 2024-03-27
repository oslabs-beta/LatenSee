import React from 'react';
import { useState } from 'react';
import Logo from './Logo';

const SideNavBar = () => {
  const [activeLink, setActiveLink] = useState('/');

  return (
    <div>
      <Logo />
      <nav className="sidenav">
        <a
          className={`dashboard ${activeLink === 'dashboard' ? 'active' : ''}`}
          href="#dashboard"
          onClick={() => setActiveLink('dashboard')}
        >
          Dashboard
        </a>
        <a
          className={`config ${activeLink === 'config' ? 'active' : ''}`}
          href="#config"
          onClick={() => setActiveLink('config')}
        >
          Configure
        </a>
      </nav>
    </div>
  );
};

export default SideNavBar;
