import React from 'react';
import ColdStartPercentage from './ColdStartPercentage';
import SpeedPerformance from './SpeedPerformance';
import DailyPerformance from './DailyPerformance';

//accepting props (data) from Dashboard
const OverviewPanel = ({ data }) => {
  console.log('comparison data from overview: ', data);
  //destructuring and naming first object dataThisWeek, second object dataLastWeek
  const [dataThisWeek, dataLastWeek] = data;
  return (
    <div className="general-overview">
      <div className="side-by-side">
        <ColdStartPercentage
          dataThisWeek={dataThisWeek}
          dataLastWeek={dataLastWeek}
        />

        <SpeedPerformance
          dataThisWeek={dataThisWeek}
          dataLastWeek={dataLastWeek}
        />
      </div>
      <div className="separator-bar"></div>
      <div className="daily-performance">
        <DailyPerformance
          // data={data}
          avgLatencyM={0.3}
          avgLatencyT={0.35}
          avgLatencyW={0.29}
          avgLatencyTh={0.41}
          avgLatencyF={0.47}
          avgLatencyS={0.5}
          avgLatencySu={0.39}
        />
      </div>
      <div className="separator-bar"></div>
    </div>
  );
};

export default OverviewPanel;
