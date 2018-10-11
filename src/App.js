import React, { Component } from 'react';

import './App.css';
import Routes from './components/Routes.js';
import StockList from './components/StockList.js';
// import Autocomplete from "./components/Autocomplete";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <Routes />
        <StockList />

      </div>
    );
  }
}

export default App;
