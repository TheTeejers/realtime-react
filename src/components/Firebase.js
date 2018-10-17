import firebase from 'firebase'
import Rebase from 're-base'

var config = {
  apiKey: "AIzaSyA_EXyswWWtHxz3agJDRCW1nGhoNtfjEsY",
  authDomain: "loughry-stock-tracker.firebaseapp.com",
  databaseURL: "https://loughry-stock-tracker.firebaseio.com",
  projectId: "loughry-stock-tracker",
  storageBucket: "loughry-stock-tracker.appspot.com",
  messagingSenderId: "973841891270"
};
const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()
export  { firebase, app, base, facebookProvider };
