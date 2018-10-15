import React, { Component } from 'react';

// import Routes from './Routes.js';



let newsDataSelector = []
class News extends Component {

  render() {
    for (var m = 1; m < 51; m++){
      newsDataSelector.push(
        <option key={m} value={m}>{m}</option>
      )
    }
    return (
      <div key={0} className="App">
        <form >
          <label>
            <select>
              {newsDataSelector}
            </select>
          </label>
        </form>
      </div>
    );
  }
}

export default News;
