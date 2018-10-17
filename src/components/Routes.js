import React from 'react'
import { Route } from 'react-router-dom';
// import StockList from './StockList.js';
import News from './News.js';
import Home from './Home.js';
import Quotes from './Quotes.js';
import SignIn from './SignIn.js';
import LogOut from './LogOut.js';



const Routes = () => (
  <main>
    <div className='Home'>
      <Route exact path='/' component={ () => <Home /> } />
      <Route path='/Home' component={ () => <Home /> } />
      <Route path='/News' component={ () => <News /> } />
      <Route path='/Quotes' component={ () => <Quotes /> } />
      <Route path='/SignIn' component={ () => <SignIn /> } />
      <Route path='/LogOut' component={ () => <LogOut /> } />


    </div>
  </main>
)

export default Routes
