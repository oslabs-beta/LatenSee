import React from 'react';
import { useState } from 'react';
import Logo from './Logo';
import SVGfiles from './SVGfiles';

const SideNavBar = () => {
  const [activeLink, setActiveLink] = useState('/');

  return (
    <nav className='sidenav'>
      <div className='logo'>
        <Logo />
      </div>
      <a
        className={`dashboard ${activeLink === 'dashboard' ? 'active' : ''}`}
        href='#dashboard'
        onClick={() => setActiveLink('dashboard')}
      >
        <div id='dashboard-link'>
          {SVGfiles.barChartSVG}
          <span>Dashboard</span>
        </div>
      </a>
      <a
        className={`config ${activeLink === 'config' ? 'active' : ''}`}
        href='#config'
        onClick={() => setActiveLink('config')}
      >
        <div id='config-link'>
          {SVGfiles.configSVG}
          <span>Configure</span>
        </div>
      </a>
      <a
        className={`user ${activeLink === 'user' ? 'active' : ''}`}
        href='#user'
        onClick={() => setActiveLink('user')}
      >
        <div id='user-link'>
          {SVGfiles.userSVG}
          <span>User</span>
        </div>
      </a>
    </nav>
  );
};

export default SideNavBar;
