import React, { Component } from 'react';
import { app, facebookProvider } from './Firebase.js'
// import { Firebase, app, facebookProvider } from './Firebase.js'
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core'






class SignIn extends Component {
  constructor(props){
    super(props)
    this.state = {
      redirect: false
    }
    this.authWithFacebook=this.authWithFacebook.bind(this)
    this.authWithEmailPassword=this.authWithEmailPassword.bind(this)
  }

  authWithFacebook(){
    console.log('authed with FB');
    app.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({  intent: Intent.DANGER, message: 'Unable to sign in with Facebook'})
          alert("Unable to sign in with Facebook")
        } else {
          this.setState({
            redirect: true
          })
        }
      })
  }

  authWithEmailPassword(event){
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value
    app.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        if (providers.length === 0){
          //create user
          this.setState({
            redirect: true
          })
          return app.auth().createUserWithEmailAndPassword(email, password)
        } else if (providers.indexOf('password') === -1){
          //they used Facebook
          this.loginForm.reset()
          // alert('Email has already been used with Login In With Facebook')
          this.toaster.show({intent: Intent.DANGER, message: 'Email has already been used with Login In With Facebook'})

        } else {
          //sign user in
          this.setState({
            redirect: true
          })
          return app.auth().signInWithEmailAndPassword(email, password)

        }
      })
      .catch((error) => {
        this.toaster.show({intent: Intent.DANGER, message: error.message})
        alert(error.message)
      })
      console.log('authed with email');
      console.log(this.state.redirect);


    }


  render() {
    console.log(this.state.redirect);

    if (this.state.redirect === true){
      console.log(this.state.redirect);

      return <Redirect to='/' />
    }
    return (
      <div className="App">
        <Toaster ref={(element) => {this.toaster = element}} />
        <button onClick={() => {this.authWithFacebook()}}>Log In with Facebook</button>
        {/* <button onClick={() => {this.authWithEmailPassword()}}>Log In with Email</button> */}
        <div></div>
        <form onSubmit={(event) => {this.authWithEmailPassword(event)}} ref={(form) => {this.loginForm = form}}>
          <label>
            Email:
            <input name='email' type='email'ref ={(input) => {this.emailInput = input}} placeholder='Email'/>
            <input name='password' type='password'ref ={(input) => {this.passwordInput = input}} placeholder='Password'/>
          </label>
          <input type='submit' value='Sign In'/>
        </form>
      </div>
    );
  }
}

export default SignIn;
