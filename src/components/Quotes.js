import React, { Component } from 'react';
import axios from 'axios'
// import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Checkbox from 'rc-checkbox';
// import {RadioGroup, Radio} from 'react-radio-group';
// import News from './News.js';
// import Test from './Test.js';
// import News from './News';
// import { Link } from 'react-router-dom'
import { app, facebookProvider, firebase } from './Firebase.js'



import '../App.css';




let savedStocks = []

// sessionStorage.clear()
class Quotes extends Component {

  constructor(props){
    super(props);
    this.state = {
      authenticated: false,
      userID: '',
      userEmail: '',
      stockInfo: {
        stockCompanyName: [],
        stockSymbol: [],
        stockLatestPrice: [],
        stockLatestTime: [],
        stockHigh: [],
        stockLow: [],
        stockWeek52High: [],
        stockWeek52Low: [],
        stockOpen: [],
        stockPreviousClose: [],
        stockChange: [],
        stockChangePercent: []
      },

      tableCompanyName: true,
      tableSymbol: true,
      tableLatestPrice: true,
      tableLatestTime: true,
      tableHigh: true,
      tableLow: true,
      tableWeek52High: true,
      tableWeek52Low: true,
      tableOpen: true,
      tablePreviousClose: true,
      tableChange: true,
      tableChangePercent: true,
      lowNumber: true,

      isLoading: true,
      errors: null
    };


    this.handleLabelInfoSelect = this.handleLabelInfoSelect.bind(this);

    // console.log(this.state.userID);
    // if (firebase.auth().currentUser !== null){
    //   var updatedStocks = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/stocks');
    //   updatedStocks.on('value', function(snapshot) {
    //     console.log('current user stocks', Object.values(snapshot.val()));
    //     savedStocks = Object.values(snapshot.val())
    //     console.log(savedStocks);
    //     console.log('current user stocks', Object.values(snapshot.val()));
    //
    //   });
    // }


 console.log(savedStocks);
  }


  componentDidMount() {
    this.getStockData();
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if (user){
        console.log('logged in', user);
        this.setState({
          authenticated: true,
          loading: false,
          userID: user.uid,
          userEmail: user.email
        })

        console.log(this.state.userID);
        let userid = firebase.auth().currentUser.uid
        console.log("try", firebase.database().ref('/users/' + userid).once('value'));

      } else {
        this.setState({
          authenticated: false,
          loading: false,
          userID: '',
          userEmail: ''
        })
      }
    })
    firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
      stocks: {
          placeholder: 0
      },
      email: firebase.auth().currentUser.email
  });
  }




  getStockData() {
    console.log(savedStocks);
    setInterval(() => {

      let stockCompanyNameArray = []
      let latestPriceArray = []
      let latestTimeArray = []
      let latestHighArray = []
      let latestLowArray = []
      let week52HighArray = []
      let week52LowArray = []
      let openArray = []
      let previousCloseArray = []
      let changeArray = []

      let changePercentArray = []
      if (this.state.userID !== ''){
        // console.log(this.state.userID);
        // console.log("try", firebase.auth().currentUser.uid);
        // console.log("try", firebase.database().ref('users/' + firebase.auth().currentUser.uid));
        // firebase.database().ref('/users/' + firebase.auth().currentUser.uid).once('value')
        firebase.database().ref('/users/' + this.state.userID).once('value')
        .then((snapshot) => {
          var userStocks = (Object.values(snapshot.val().stocks));
          console.log();

          savedStocks = userStocks

        });

      }
      if (savedStocks.length > 0){



      axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${savedStocks}&types=quote`)


        .then((response) => {


          for (var i = 0; i < Object.keys(response.data).length; i++){
            stockCompanyNameArray.push(
              Object.values(response.data)[i].quote.companyName
            )
            latestPriceArray.push(
              Object.values(response.data)[i].quote.latestPrice
            )
            latestTimeArray.push(
              Object.values(response.data)[i].quote.latestTime
            )
            latestHighArray.push(
              Object.values(response.data)[i].quote.high
            )
            latestLowArray.push(
              Object.values(response.data)[i].quote.low
            )
            week52HighArray.push(
              Object.values(response.data)[i].quote.week52High
            )
            week52LowArray.push(
              Object.values(response.data)[i].quote.week52Low
            )
            openArray.push(
              Object.values(response.data)[i].quote.open
            )
            previousCloseArray.push(
              Object.values(response.data)[i].quote.previousClose
            )
            changeArray.push(
              Object.values(response.data)[i].quote.change
            )
            changePercentArray.push(
              Object.values(response.data)[i].quote.changePercent
            )
          }
          this.setState({
            stockInfo: {
              stockCompanyName: stockCompanyNameArray,
              stockSymbol: Object.keys(response.data),
              stockLatestPrice: latestPriceArray,
              stockLatestTime: latestTimeArray,
              stockHigh: latestHighArray,
              stockLow: latestLowArray,
              stockWeek52High: week52HighArray,
              stockWeek52Low: week52LowArray,
              stockOpen: openArray,
              stockPreviousClose: previousCloseArray,
              stockChange: changeArray,
              stockChangePercent: changePercentArray
            }
          });

        })
        .then(users => {
          this.setState({
            isLoading: false
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
      } else {
        console.log('none');
      }
    }, 2000);

  }



  handleLabelInfoSelect(e) {
      this.setState({
          [e.target.value]: e.target.checked,
      })


    // firebase.database().ref('users/' + this.state.userID).set({
    //
    //    stocks: Object.values(sessionStorage)
    //  });


    // console.log(firebase.database().ref(this.state.userID));
    // console.log(firebase.database().ref());
    // console.log(this.state.userID);


  }

  handleRemoveStock(e){

    let splitID = e.target.value.split(',')
    console.log(splitID, firebase.auth().currentUser.uid);


    // sessionStorage.removeItem(sessionStorage.key(splitID[1]))

    console.log(Object.values(sessionStorage)[splitID[1]]);
    console.log(Object.values(sessionStorage));

    console.log(e.target.value);
    firebase.database().ref('/users/' +splitID[0]).once('value')
    .then((snapshot) => {
      let userStocksTest = (snapshot.val().stocks);
      var userStocks = (Object.values(snapshot.val().stocks));
      var userStocksKeys = (Object.keys(snapshot.val().stocks));
      console.log('delete area', userStocks);
      for (var p = 0; p < userStocks.length; p++){
        if (Object.values(sessionStorage)[splitID[1]] === userStocks[p]){
          console.log('one');
          console.log(userStocksTest);
          console.log(userStocks[p]);
          console.log(userStocksKeys[p]);

          // firebase.database().ref('users/' + splitID[0] + '/stocks/').remove(userStocksKeys[p]);
          sessionStorage.removeItem(sessionStorage.key(splitID[1]))

           firebase.database().ref('users/' + splitID[0] + '/stocks/').update({

              [userStocksKeys[p]]: null
            });




        }
      }

    });


  }



  render() {
    // console.log(Object.values(sessionStorage));
    // console.log(sessionStorage.key(2));
    // console.log(this.state.userID);


    let liveStockDataPosted = []
    if (this.state.stockInfo.stockSymbol.length > 0){
      for (var j = 0; j < this.state.stockInfo.stockSymbol.length; j++){
        // console.log(sessionStorage.getItem(sessionStorage.key(j)));
        let color = []
        if(this.state.stockInfo.stockChangePercent[j] < 0){

          color.push(
            'negative'
          )
        } else {
          color.push(
            'positive'
          )
        }
        liveStockDataPosted.push(
          <tbody key={j}>
            <tr>
              <td>{this.state.stockInfo.stockCompanyName[j]}</td>

              <td><button onClick={this.handleRemoveStock} value={[this.state.userID,j]}>Remove</button></td>

              <td className={this.state.tableSymbol ? '' : 'hidden'}>{this.state.stockInfo.stockSymbol[j]}</td>
              <td className={`${this.state.tableLatestPrice ? '' : 'hidden'} ${color[0]}`}>${this.state.stockInfo.stockLatestPrice[j].toFixed(2)}</td>
              <td className={this.state.tableLatestTime ? '' : 'hidden'}>{this.state.stockInfo.stockLatestTime[j]}</td>
              <td className={this.state.tableHigh ? '' : 'hidden'}>${this.state.stockInfo.stockHigh[j].toFixed(2)}</td>
              <td className={this.state.tableLow ? '' : 'hidden'}>${this.state.stockInfo.stockLow[j].toFixed(2)}</td>
              <td className={this.state.tableWeek52High ? '' : 'hidden'}>${this.state.stockInfo.stockWeek52High[j].toFixed(2)}</td>
              <td className={this.state.tableWeek52Low ? '' : 'hidden'}>${this.state.stockInfo.stockWeek52Low[j].toFixed(2)}</td>
              <td className={this.state.tableOpen ? '' : 'hidden'}>${this.state.stockInfo.stockOpen[j].toFixed(2)}</td>
              <td className={this.state.tablePreviousClose ? '' : 'hidden'}>${this.state.stockInfo.stockPreviousClose[j].toFixed(2)}</td>
              <td className={`${this.state.tableChange ? '' : 'hidden'} ${color[0]}`}>${this.state.stockInfo.stockChange[j].toFixed(2)}</td>
              <td className={`${this.state.tableChangePercent ? '' : 'hidden'} ${color[0]}`}>{(this.state.stockInfo.stockChangePercent[j] *100).toFixed(2)}%</td>
            </tr>
          </tbody>
        )
      }
    }

    return (
    <div className="Home">

      <div>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value='tableSymbol'/> Symbol</label>
        <label><Checkbox defaultChecked={this.state.tableLatestPrice} onChange={this.handleLabelInfoSelect} value="tableLatestPrice"/> Latest Price</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableLatestTime"/> Latest Time</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableHigh"/> High</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableLow"/> Low</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableWeek52High"/> 52 Week High</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableWeek52Low"/> 52 Week Low</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableOpen"/> Open</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tablePreviousClose"/> Previous Close</label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableChange"/> Change </label>
        <label><Checkbox defaultChecked onChange={this.handleLabelInfoSelect} value="tableChangePercent"/> Percent Change </label>
      </div>

      <table>
        <thead>
          <tr>
            <th className='company'>Company</th>
            <th className='company'>Remove</th>
            <th className={this.state.tableSymbol ? '' : 'hidden'}>Symbol</th>
            <th className={this.state.tableLatestPrice ? '' : 'hidden'}>Latest Price</th>
            <th className={this.state.tableLatestTime ? '' : 'hidden'}>Latest Time</th>
            <th className={this.state.tableHigh ? '' : 'hidden'}>Today's High</th>
            <th className={this.state.tableLow ? '' : 'hidden'}    >Today's Low</th>
            <th className={this.state.tableWeek52High ? '' : 'hidden'}>52 Week High</th>
            <th className={this.state.tableWeek52Low ? '' : 'hidden'}>52 Week Low</th>
            <th className={this.state.tableOpen ? '' : 'hidden'}>Today's Open</th>
            <th className={this.state.tablePreviousClose ? '' : 'hidden'}>Previous Close</th>
            <th className={this.state.tableChange ? '' : 'hidden'}>Change</th>
            <th className={this.state.tableChangePercent ? '' : 'hidden'}>Change Percent</th>
          </tr>
        </thead>

              {liveStockDataPosted}




      </table>
    </div>
    );
  }
}
export default Quotes;
