import React, { Component } from 'react';
// import TextInput from 'react-autocomplete-input'
import 'react-autocomplete-input/dist/bundle.css';
import Autocomplete from "./Autocomplete";
import MyStocks from "./MyStocks";

import axios from 'axios'

// const API_KEY = 'xf2xQyjwG_E-zDF12wFg'
// const numberReturned = 10
let list = []
let ownedStockNames = []
let ownedStockSymbols = []
let ownedStockSelection = []


class StockList extends Component {
  constructor(props){
    super(props);
    this.state = {
      options: [],
      selectedStocks: []
    }



    axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
    .then((response) => {

      for (var i = 0; i < response.data.length; i++){
        list.push(
          response.data[i].name + '---' + response.data[i].symbol
        )
      }
      this.setState({
        options: list
      })
      // sessionStorage.setItem("List", list)
      console.log(this.state.options.length)

    }).catch((error)=>{
      alert('Error getting data here')
    })
  }







  render() {
    for (var i = 0; i < sessionStorage.length; i++){

      if(ownedStockNames.indexOf(sessionStorage.key(i)) === -1) {
        ownedStockNames.push(sessionStorage.key(i));
      }
      if(ownedStockSymbols.indexOf(sessionStorage.getItem(sessionStorage.key(i))) === -1) {
        ownedStockSymbols.push(sessionStorage.getItem(sessionStorage.key(i)));
      }
      if(ownedStockSymbols[i] === "undefined") {
        ownedStockNames.splice(i, 1);
        ownedStockSymbols.splice(i, 1);
      }
    }

    // console.log(ownedStockNames);
    // console.log(ownedStockSymbols);
    // console.log(sessionStorage);


    if (sessionStorage.length > 0) {
      for (var n = 0; n < sessionStorage.length; n++){
        if (sessionStorage.getItem(sessionStorage.key(n)) === "undefined"){
          sessionStorage.removeItem(sessionStorage.key(n))
          console.log('here')
        }
        ownedStockSelection.push(
          <option key={n} value={sessionStorage.getItem(sessionStorage.key(n))}>{sessionStorage.key(n)} ({sessionStorage.getItem(sessionStorage.key(n))})</option>
        )

      }
    }

    return (
      <div className="App">
        <br/>

        <Autocomplete
          suggestions={this.state.options}
        />
        <form >
          <label>
            <select>
              <option value="allStocks">All Stocks</option>
              {ownedStockSelection}

            </select>
          </label>
        </form><br/>
        {ownedStockSelection}
        <MyStocks />
      </div>
    );
  }
}

export default StockList;
