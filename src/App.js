import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import { app } from './components/Firebase.js'
import { Spinner } from '@blueprintjs/core'
import './App.css';
import Routes from './components/Routes.js';
import StockList from './components/StockList.js';
import Header from './components/Header.js';
// import SignIn from './components/SignIn.js';
// import LogOut from './components/LogOut.js';

// import Autocomplete from "./components/Autocomplete";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      loading: true
    }
  }

  componentWillMount(){
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user){
        console.log('logged in');
        this.setState({
          authenticated: true,
          loading: false
        })
      } else {
        this.setState({
          authenticated: false,
          loading: false
        })
      }
    })
  }


  render() {

    if (this.state.loading === true){
      return (
        <div>
          <h3>Loading</h3>
          <Spinner />
        </div>
      )
    }

    return (
      <div className="App">
        <Header authenticated={this.state.authenticated} />

        <Routes />
        <StockList />

      </div>
    );
  }
}

export default App;
