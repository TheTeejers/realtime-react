import React from 'react'
import { Route } from 'react-router-dom';
// import StockList from './StockList.js';
import News from './News.js';
import Home from './Home.js';



const Routes = () => (
  <main>
    <div className='Home'>
      <Route exact path='/' component={ () => <Home /> } />
      <Route path='/Home' component={ () => <Home /> } />
      <Route path='/News' component={ () => <News /> } />


    </div>
  </main>
)

export default Routes
