import React from 'react';
import { render, screen } from '@testing-library/react';
import FunctionPerformanceTable from '../src/components/FunctionPerformanceTable';
import ConfigForm from '../src/components/ConfigForm'
import { HashRouter } from 'react-router-dom';

test('renders FunctionPerformanceTable with data', () => {
  //simulate the mounting of component in jsdom. once it is rendered successfully, we are able to run further testing
  render(<HashRouter><ConfigForm/></HashRouter> );
});
