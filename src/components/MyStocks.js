import React, { Component } from 'react';
import axios from 'axios'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {RadioGroup, Radio} from 'react-radio-group';
import News from './News.js';
import Test from './Test.js';
// import News from './News';


let savedStocks = []
let ownedStockSelection = []
let testArray = []
let count = 0
console.log('count ', count);
console.log(sessionStorage);
// sessionStorage.clear()
class MyStocks extends Component {

  constructor(props){
    super(props);

    this.state = {
      types : '',
      quoteSelections: [],
      isSelected: true

    }

    this.handleLoadData = this.handleLoadData.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleQuoteSelections = this.handleQuoteSelections.bind(this);
    this.getInitialState = this.getInitialState.bind(this);


    for (var i = 0; i < sessionStorage.length; i++){
      savedStocks.push(
        sessionStorage.getItem(sessionStorage.key(i))
      )
    }
  }

  componentDidMount() {
    this.handleLoadData()
    // this.handleTypeChange()
      this.getInitialState()
      console.log(this.state.types);
  }

  getInitialState() {
    setTimeout(() => {
      this.setState({
        types: ''
      });
    }, 100);
    console.log("nope");
    console.log(this.state.types);
  }

  handleQuoteSelections(selected){
    setTimeout(() => {
      this.setState({
        quoteSelections: selected
      });
      console.log(this.state.quoteSelections);
    }, 100);

  }

  handleTypeChange(setType) {
    setTimeout(() => {
      this.setState({
        types: setType
      });
      this.handleLoadData()
    }, 100);
  }


  handleLoadData(event){

    testArray=[]
    count++
    console.log('count ', count);
    console.log(this.state.types);
    if (this.state.types.length > 0 && savedStocks.length > 0){
      axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${savedStocks}&types=${this.state.types}`)
      // axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${savedStocks}&types=${this.state.types}&range=1m&last=5`)
      .then((response) => {
        console.log(response.data)
        console.log(this.state.types)
        testArray.shift();
        for (var i = 0; i < savedStocks.length; i++){
          if (this.state.types === 'quote'){

            console.log(sessionStorage.getItem(sessionStorage.key(i)), response.data[savedStocks[i]].quote.latestPrice)
            testArray.push(
              (sessionStorage.getItem(sessionStorage.key(i)), response.data[savedStocks[i]].quote.latestPrice)
            )
            console.log(testArray);
          }
        }
      }).catch((error)=>{
        alert('Error getting data here')
      })
    }


  }

  handleDataLoopStart(event){
    setInterval((event) => {
      this.handleLoadData(event)
    }, 3000);
  }

  render() {

    //
    // let stockList =[]
    // let quoteOptions = []
    // let allStocks = []
    // let chartTimeFrame = []
    // let newsData = []
    // let quoteHeaders = []
    // let latestPricePosted = []
    //
    // if (sessionStorage.length > 0) {
    //   for (var n = 0; n < sessionStorage.length; n++){
    //     if (sessionStorage.getItem(sessionStorage.key(n)) === "undefined"){
    //       sessionStorage.removeItem(sessionStorage.key(n))
    //       console.log('here')
    //     }
    //     ownedStockSelection.push(
    //       <option key={n} value={sessionStorage.getItem(sessionStorage.key(n))}>{sessionStorage.key(n)} ({sessionStorage.getItem(sessionStorage.key(n))})</option>
    //     )
    //
    //   }
    // }
    //
    //
    //
    //
    //
    // if (savedStocks.length >= 0){
    //   for (var j = 0; j < savedStocks.length; j++){
    //     stockList.push(
    //       <tbody key={j}>
    //         <tr>
    //           <td>{savedStocks[j]}</td>
    //           <td>{testArray[j]}</td>
    //         </tr>
    //       </tbody>
    //     )
    //   }
    // }
    //
    //
    // if (this.state.types === 'quote'){
    //   this.handleDataLoopStart()
    //
    //   allStocks.push(
    //     <option key={0} value="allStocks">All Stocks</option>
    //   )
    //   quoteOptions.push(
    //     <CheckboxGroup key={0}
    //       checkboxDepth={3}
    //       name="quoteSelections"
    //       value={this.state.quoteSelections}
    //       onChange={this.handleQuoteSelections}
    //       >
    //
    //       <label><Checkbox checked='true' value="latestPrice"/> Latest Price</label>
    //       <label><Checkbox value="latestTime"/> Latest Time</label>
    //       <label><Checkbox value="high"/> High</label>
    //       <label><Checkbox value="low"/> Low</label>
    //       <label><Checkbox value="previousClose"/> Previous Close</label>
    //       <label><Checkbox value="change"/> Change from Previous Close</label>
    //       <label><Checkbox value="open"/> Open</label>
    //       <label><Checkbox value="primaryExchange"/> Primary Exchange</label>
    //     </CheckboxGroup>
    //   )
    //   // for (var r = 0; r < this.state.quoteSelections.length; r++){
    //   //   if (this.state.quoteSelections === 'latestPrice'){
    //   //     quoteHeaders.push(
    //   //       <th key={0}>
    //   //         Latest Price
    //   //       </th>
    //   //     )
    //   //   }
    //   // }
    //   for (var p = 0; p < testArray.length; p++){
    //     console.log(sessionStorage.getItem(sessionStorage.key(p)));
    //     console.log(testArray);
    //     latestPricePosted.push(
    //
    //       <tbody key={p}>
    //         <tr>
    //           <td>{testArray[p]}</td>
    //         </tr>
    //       </tbody>
    //     )
    //   }
    // }
    //
    //
    //
    // if (this.state.types === 'chart'){
    //   allStocks.shift()
    //   // this.handleDataLoopStop()
    //   chartTimeFrame.push(
    //     <form key={0}>
    //       <label>
    //         <select>
    //           <option value="5y">5 Years</option>
    //           <option value="2y">2 Years</option>
    //           <option value="1y">1 Year</option>
    //           <option value="ytd">Year To Date</option>
    //           <option value="6m">6 Months</option>
    //           <option value="3m">3 Months</option>
    //           <option value="1m">1 Month</option>
    //           <option value="1d">1 day</option>
    //           {/* <option value="date">Custom Date</option> */}
    //
    //         </select>
    //       </label>
    //     </form>
    //   )
    //
    // } else
    //
    // if (this.state.types === 'news'){
    //   clearInterval()
    //   allStocks.shift()
    //     newsData.push(
    //       <News key={0}/>
    //     )
    // }
    return (
      <div className="App">
        {/* <form >
          <label>
            <select>
              {allStocks}
              {ownedStockSelection}

            </select>
          </label>
        </form><br/>

        <RadioGroup name="types" value='quote' onChange={this.handleTypeChange}>
          <Radio value="quote" /> Quote
          <Radio value="news"/> News
          <Radio value="chart"/> Chart
        </RadioGroup>
        {quoteOptions}
        {newsData}
        {chartTimeFrame}

        <table>
          <thead>
            <tr>
              <th>Stock</th>
              <th>Latest Price</th>
              {quoteHeaders}
              {testArray}
            </tr>

          </thead>
          {stockList}


        </table>
        {count}
        <h1>{testArray}</h1> */}
        <Test />
      </div>
    );
  }






}
export default MyStocks;
