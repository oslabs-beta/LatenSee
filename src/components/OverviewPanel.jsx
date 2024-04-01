import React from 'react';
import ColdStartPercentage from './ColdStartPercentage';
import SpeedPerformance from './SpeedPerformance';
import DailyPerformance from './DailyPerformance';

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
      <div className="separator-bar"></div>
      <div className="daily-performance">
        <DailyPerformance
          data={data}
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
