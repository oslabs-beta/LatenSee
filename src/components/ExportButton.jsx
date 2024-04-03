import React from 'react';

/**
 * 
 * @returns anchor component that will export pings data as a csv file
 */
const ExportButton = () => {
  return (
    <a href="/api/dataExport">Export Data</a>
  )
};

export default ExportButton;