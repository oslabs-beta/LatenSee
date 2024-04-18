import React from 'react';
import myImage from './LatenSeeLogoHD.png';

const Logo = () => {
  return (
    <div className='logo-container'>
      <img src={myImage} alt='logo' />
      <h2>
        <a href='/'>LatenSee</a>
      </h2>
    </div>
  );
};

export default Logo;
