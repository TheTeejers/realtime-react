import React, { Component } from 'react';
import axios from 'axios'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';


let savedStocks = []
class MyStocks extends Component {

  constructor(props){
    super(props);
    this.state = {
      types : ['quote']
    }

    this.handleLoadData = this.handleLoadData.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);

    for (var i = 0; i < sessionStorage.length; i++){
      savedStocks.push(
        sessionStorage.getItem(sessionStorage.key(i))
      )
    }
  }

  componentDidMount() {
      this.handleLoadData()
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
    console.log(this.state.types);
    if (this.state.types.length > 0 && savedStocks.length > 0){
      axios.get(`https://api.iextrading.com/1.0/stock/market/batch?symbols=${savedStocks}&types=${this.state.types}&range=1m&last=5`)
      .then((response) => {
        console.log(response.data)
        console.log(this.state.types)
        for (var i = 0; i < savedStocks.length; i++){
          if (this.state.types === 'quote'){
            console.log(sessionStorage.getItem(sessionStorage.key(i)), response.data[savedStocks[i]].quote.latestPrice)
          }
        }
      }).catch((error)=>{
        alert('Error getting data here')
      })
    }
  }


  render() {


    return (
      <div className="App">
        <CheckboxGroup
          checkboxDepth={2}
          name="types"
          value={this.state.types}
          onChange={this.handleTypeChange}>

          <label><Checkbox value="quote"/> Quote</label>
          <label><Checkbox value="news"/> News</label>
          <label><Checkbox value="chart"/> Chart</label>
        </CheckboxGroup>


      </div>
    );
  }






}
export default MyStocks;
