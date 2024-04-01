import React from 'react';
import ColdStartPercentage from './ColdStartPercentage';

const OverviewPanel = ({ data }) => {
  return (
    <div className="general-overview">
      <div>
        <ColdStartPercentage
          data={data}
          coldStartPercentagelastWeek={6}
          coldStartPercentagethisWeek={5}
        />
      </div>
      <div>{/* <WeeklyPerformance /> */}</div>
    </div>
  );
};

export default OverviewPanel;
