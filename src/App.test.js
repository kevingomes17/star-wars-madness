import React from 'react';
import { render, cleanup, screen, waitForElement } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('App renders the Skeleton and then the Data Grid', async () => {
  const { getByTestId } = render(<App />);
  expect(getByTestId('loading-skeleton')).toBeInTheDocument();

  const firstRecord = await waitForElement(() => getByTestId('app'));
  expect(getByTestId('record-0')).not.toBeEmpty();
});
