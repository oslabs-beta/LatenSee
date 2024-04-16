import React, { useState, useEffect } from 'react';
import myImage from '../components/LatenSeeLogoHD.png';
import 'animate.css';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useTour } from '../components/TourContext';

const Home = () => {
  const { initializeTour, startTour } = useTour();
  const [isTourReady, setIsTourReady] = useState(false);
  const [driverObj, setDriverObj] = useState(null);

  useEffect(() => {
    const newDriverObj = driver({
      showProgress: true,
      steps: [
        {
          element: '#config-link',
          popover: {
            title: 'Configuration',
            description:
              'Start here to set up new Lambda functions. You can also define how often to ping them in order to keep them warm.',
          },
        },
        {
          element: '#dashboard-link',
          popover: {
            title: 'Dashboard',
            description:
              "Then track all of the functions you've added, explore key metrics such as latency and cold starts, and compare this weeks performance data with previous weeks, all through clear graphs and summaries.",
          },
        },
        {
          element: '#user-link',
          popover: {
            title: 'User',
            description:
              "Manage your functions' settings here. Edit the warming frequency, start or stop warming, and delete functions as needed.",
          },
        },
      ],
    });

    setDriverObj(newDriverObj);
    initializeTour(newDriverObj);

    // Check local storage to decide if the tour should start automatically
    if (localStorage.getItem('hasVisited') !== 'true') {
      startTour(); // Start the tour automatically only on first visit
      localStorage.setItem('hasVisited', 'true'); // Set 'hasVisited' in local storage
    }

    setIsTourReady(true);
  }, [initializeTour, startTour]);

  const handleStartTour = () => {
    if (isTourReady && driverObj) {
      startTour();
    } else {
      console.log('Tour is not ready.');
    }
  };

  return (
    <div className='home-page'>
      <div className='animate__animated animate__backInRight'>
        <h1>
          Welcome to <br />
          LatenSee!
        </h1>
      </div>

      <button onClick={handleStartTour} className='start-tour-button'>
        New here?
      </button>

      <div>
        <img src={myImage} alt='logo' className='floating' />
      </div>
    </div>
  );
};

export default Home;