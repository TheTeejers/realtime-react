import React, { Component } from 'react';
import axios from 'axios'



let typesSelected = []
let savedStocks = []
class MyStocks extends Component {

  constructor(props){
    super(props);
    this.state = {
      quote: false,
      news: false,
      chart: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);



    for (var i = 0; i < sessionStorage.length; i++){
      // console.log(sessionStorage.getItem(sessionStorage.key(i)));
      savedStocks.push(
        sessionStorage.getItem(sessionStorage.key(i))
      )
    }


    // axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${savedStocks}&types=${typesSelected}&range=1m&last=5`)
    // .then((response) => {
    //   console.log(response.data)
    //   for (var i = 0; i < savedStocks.length; i++){
    //     console.log(sessionStorage.getItem(sessionStorage.key(i)), response.data[savedStocks[i]].quote.change)
    //   }
    //
    //
    //   this.setState({
    //
    //   })
    //   // sessionStorage.setItem("List", list)
    //
    //
    // }).catch((error)=>{
    //   alert('Error getting data here')
    // })


  }

  handleInputChange(event) {

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log('value', value);
    console.log('name', name);
    this.setState({
      [name]: value
    });
    localStorage.setItem(name, value)
    if (value === true){
      console.log('hello');
      typesSelected.push(
        name
      )
    } else {
      typesSelected.shift(
        name
      )
    }
    console.log(typesSelected);
    console.log(savedStocks);
    console.log(sessionStorage.getItem(name));
    if (typesSelected.length > 0 && savedStocks.length > 0){
      axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${savedStocks}&types=${typesSelected}&range=1m&last=5`)
      .then((response) => {
        console.log(response.data)
        for (var i = 0; i < savedStocks.length; i++){
          console.log(sessionStorage.getItem(sessionStorage.key(i)), response.data[savedStocks[i]].quote.close)
        }


        this.setState({

        })
        // sessionStorage.setItem("List", list)


      }).catch((error)=>{
        alert('Error getting data here')
      })
    }

  }

  render() {


    return (
      <div className="App">
        <form>
          <label>
            <input name="quote" type="checkbox" onChange={this.handleInputChange} checked={this.state.quote} />
            Quotes
          </label>
          <label>
            <input name="news" type="checkbox" onChange={this.handleInputChange} checked={this.state.news} />
            News
          </label>
          <label>
            <input name="chart" type="checkbox" onChange={this.handleInputChange} checked={this.state.chart} />
            Charts
          </label>
        </form>


      </div>
    );
  }
}

export default MyStocks;
