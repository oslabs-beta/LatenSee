import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Chart from '../src/components/Chart';

jest.mock('react-apexcharts', () => {
  return function FakeChart(props) {
    return <div data-testid="apexchart"></div>;
  };
});
