import React, { Component } from 'react';
import axios from 'axios'
// import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
// import {RadioGroup, Radio} from 'react-radio-group';
// import News from './News.js';
// import News from './News';



let count = 0
class MyStocks extends Component {
  constructor(props){
    super(props);
    this.state = {
      time : '',
    }
  }

  componentDidMount() {
    // this.handleLoadData()
    // setInterval(this.handleLoadData, 3000);
    // this.interval = setInterval((event) => this.setState({ time: '' }), 5000);
  }
  componentWillUnmount() {
    clearTimeout(this.handleLoadData);
  }

  handleLoadData(event){

    setTimeout(() => {
      count++
      console.log('count', count);
      axios.get(`http://worldclockapi.com/api/json/est/now`)
        .then((response) => {
          // console.log(response.data);
          console.log(this.state.time);

          this.setState({
            time: response.data.currentFileTime
          })
        }).catch((error)=>{
          alert('Error getting data here')
        })
      }, 1000);
    }

    // handleDataLoopStart(){
    //   setTimeout(() => {
    //     this.handleLoadData()
    //   }, 1500);
    // }


// }






  render() {

    this.handleLoadData()
    return (
    <div className="Home">
      <h1>{this.state.time}</h1>
    </div>
    );
  }
}
export default MyStocks;
