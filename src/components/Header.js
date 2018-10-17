import React, { Component } from 'react';
import { Link } from 'react-router-dom'


// import Autocomplete from "./components/Autocomplete";

class Header extends Component {
  constructor(props){
    super(props);
    this.state = {
      authenticated: false
    }
  }
  render() {
    return (
      <div className="App">
        <div className="nav-bar">
          {this.props.authenticated ? <Link to='/LogOut' aria-label='Log Out'>Sign Out</Link> : (<div><Link to='/SignIn'>Register/Sign In</Link></div>)}
        </div>
      </div>
    );
  }
}

export default Header;
