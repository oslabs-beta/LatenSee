import React from 'react';
import myImage from './DALL_E_2024-03-26_14.07.15_-_Create_a_simpler__more_minimalist_app_icon_for__LatenSee___emphasizing_straightforward_and_clean_design_elements._The_icon_should_distill_the_essence_-removebg-preview.png';

const Logo = () => {
  return (
    <div className="logo-container">
      <img src={myImage} alt="logo" />
      <h2>
        <a href="/">LatenSee</a>
      </h2>
    </div>
  );
};

export default Logo;
