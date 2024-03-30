import React from 'react';
import { useState } from 'react';
import Logo from './Logo';

const SideNavBar = () => {
  const [activeLink, setActiveLink] = useState('/');

  const barChartSVG = (
    <svg
      width="35px"
      height="35px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#7a7a7a"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {' '}
        <path
          d="M7 19V11M12 19V7M17 19V15"
          stroke="#7a7a7a"
          stroke-width="2.4"
          stroke-linecap="round"
          stroke-linejoin="round"
        />{' '}
      </g>
    </svg>
  );

  const configSVG = (
    <svg
      fill="#929292"
      width="30px"
      height="30px"
      viewBox="0 0 32 32"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {' '}
        <title>wrench</title>{' '}
        <path d="M7.719 12.375l0.313-2.656-4.219-4.281c0.906-0.438 1.938-0.719 3.031-0.719 3.781 0 6.844 3.031 6.844 6.844 0 0.563-0.094 1.188-0.219 1.75l7.781 7.75c1.406 1.438 1.531 3.625 0.25 4.906s-3.5 1.188-4.938-0.25l-7.594-7.656c-0.688 0.219-1.375 0.375-2.125 0.375-3.781 0-6.844-3.094-6.844-6.875 0-1.063 0.219-2 0.625-2.906l4.344 4.406z" />{' '}
      </g>
    </svg>
  );

  const userSVG = (
    <svg
      fill="#7a7a7a"
      width="28px"
      height="28px"
      viewBox="0 0 56 56"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        <path d="M 28.0117 27.3672 C 33.0508 27.3672 37.3867 22.8672 37.3867 17.0078 C 37.3867 11.2187 33.0274 6.9297 28.0117 6.9297 C 22.9961 6.9297 18.6367 11.3125 18.6367 17.0547 C 18.6367 22.8672 22.9961 27.3672 28.0117 27.3672 Z M 13.2930 49.0703 L 42.7305 49.0703 C 46.4101 49.0703 47.7226 48.0156 47.7226 45.9531 C 47.7226 39.9062 40.1523 31.5625 28.0117 31.5625 C 15.8477 31.5625 8.2774 39.9062 8.2774 45.9531 C 8.2774 48.0156 9.5898 49.0703 13.2930 49.0703 Z" />
      </g>
    </svg>
  );

  return (
    <div>
      <nav className="sidenav">
        <div className="logo">
          <Logo />
        </div>
        <a
          className={`dashboard ${activeLink === 'dashboard' ? 'active' : ''}`}
          href="#dashboard"
          onClick={() => setActiveLink('dashboard')}
        >
          <div className="dashboard-link">
            {barChartSVG}
            <span>Dashboard</span>
          </div>
        </a>
        <a
          className={`config ${activeLink === 'config' ? 'active' : ''}`}
          href="#config"
          onClick={() => setActiveLink('config')}
        >
          <div className="config-link">
            {configSVG}
            <span>Configure</span>
          </div>
        </a>
        <a
          className={`user ${activeLink === 'user' ? 'active' : ''}`}
          href="#user"
          onClick={() => setActiveLink('user')}
        >
          <div className="user-link">
            {userSVG}
            <span>User</span>
          </div>
        </a>
      </nav>
    </div>
  );
};

export default SideNavBar;
