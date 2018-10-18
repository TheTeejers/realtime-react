import React, { Component } from 'react';
import { app } from './Firebase.js'
import { Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core'






class LogOut extends Component {
  constructor(){
    super()
    this.state = {
      redirect: false
    }
  }

  componentWillMount(){
    app.auth().signOut().then((user) => {

      sessionStorage.clear()


      this.setState({
        redirect: true
      })
    })

  }


  render() {
    if (this.state.redirect === true){
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3>Loggin out</h3>
        <Spinner />
      </div>
    );
  }
}

export default LogOut;
