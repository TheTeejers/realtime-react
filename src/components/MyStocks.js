import React, { Component } from 'react';
import axios from 'axios'




class MyStocks extends Component {
  constructor(props){
    super(props);
    this.state = {

    }

    let savedStocks = []
    for (var i = 0; i < sessionStorage.length; i++){
      // console.log(sessionStorage.getItem(sessionStorage.key(i)));
      savedStocks.push(
        sessionStorage.getItem(sessionStorage.key(i))
      )
    }


    axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${savedStocks}&types=quote,news,chart&range=1m&last=5`)
    .then((response) => {
      console.log(response.data.AAPL);
      // console.log(sessionStorage.getItem(sessionStorage.key(0)));
      for (var i = 0; i < response.data.length; i++){

      }
      this.setState({

      })
      // sessionStorage.setItem("List", list)


    }).catch((error)=>{
      alert('Error getting data here')
    })
  }







  render() {


    return (
      <div className="App">


      </div>
    );
  }
}

export default MyStocks;
