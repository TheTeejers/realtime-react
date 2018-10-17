import React, { Component } from 'react';
import axios from 'axios'
// import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import Checkbox from 'rc-checkbox';
// import {RadioGroup, Radio} from 'react-radio-group';
// import News from './News.js';
// import Test from './Test.js';
// import News from './News';
import '../App.css';


let savedStocks = []
// sessionStorage.clear()
class Quotes extends Component {

  constructor(props){
    super(props);
    this.state = {
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

    for (var i = 0; i < sessionStorage.length; i++){
      savedStocks.push(
        sessionStorage.getItem(sessionStorage.key(i))
      )
    }

  }


  componentDidMount() {
    this.getUsers();
  }


  getUsers() {
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
          // console.log(this.state.stockInfo.stockSymbol)
          // console.log(this.state.stockInfo.stockLatestPrice)
        })
        .then(users => {
          this.setState({
            isLoading: false
          });
        })
        .catch(error => this.setState({ error, isLoading: false }));
      }, 2000);
  }



  handleLabelInfoSelect(e) {
      this.setState({
          [e.target.value]: e.target.checked,
      })
    // console.log('Checkbox checked:', (e.target.checked));
    // console.log('Checkbox name:', (e.target.value));
  }

  handleRemoveStock(e){
    sessionStorage.removeItem(sessionStorage.key(e.target.value))
  }



  render() {


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
              {/* <td><button>Remove</button></td> */}
              <td><button onClick={this.handleRemoveStock} value={j}>Remove</button></td>
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
