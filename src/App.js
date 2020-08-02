import React, { Fragment } from 'react';
import { useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import Skeleton from '@material-ui/lab/Skeleton';
import Films from './components/films';
import { fetchFilms } from './helpers/films.data-helpers';
import './App.css';

function App() {
  const { isLoading, error, data } = useQuery('filmsData', fetchFilms);
  if (isLoading) return (
    <div data-testid="loading-skeleton">
      <Skeleton variant="rect" /><br />
      <Skeleton variant="rect" /><br />
      <Skeleton variant="rect" /><br />
      <Skeleton variant="rect" /><br />
      <Skeleton variant="rect" /><br />
    </div>
  );
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Fragment>
      <div className="App" data-testid="app">
        <Films data={data} />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </Fragment>
  );
}

export default App;
