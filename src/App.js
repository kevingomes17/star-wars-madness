import React, { Fragment } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import Films from './components/films';
import './App.css';

function App() {
  return (
    <Fragment>
      <div className="App">
        <Films />
      </div>
      <ReactQueryDevtools initialIsOpen />
    </Fragment>
  );
}

export default App;
