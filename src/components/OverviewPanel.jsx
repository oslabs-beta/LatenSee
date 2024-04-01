import React from 'react';
import ColdStartPercentage from './ColdStartPercentage';
import SpeedPerformance from './SpeedPerformance';

const OverviewPanel = ({ data }) => {
  return (
    <div className="general-overview">
      <div className="side-by-side">
        <ColdStartPercentage
          data={data}
          coldStartPercentagelastWeek={6}
          coldStartPercentagethisWeek={10}
        />

        <SpeedPerformance
          data={data}
          averageLatencylastWeek={0.4}
          averageLatencythisWeek={0.35}
        />
      </div>
      <div>{/* <WeeklyPerformance /> */}</div>
    </div>
  );
};

export default OverviewPanel;
