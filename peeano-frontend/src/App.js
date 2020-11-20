import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Main from './Main.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import PianoSketch from './sketches/sketch';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Community from './components/community';
import './components/navbar.css';
import P5Wrapper from 'react-p5-wrapper';
import Test from './sketches/Test';

function App() {
  return (
  	//<Main />
  	<Router>
  		<Switch>
  			<Navbar>
  				<Route exact path='/' />
  			</Navbar>
  		</Switch>

            <Link to='/'/>
            <Route path='/' exact component={Home}/>

            <Link to='/home'/>
            <Route path='/home' exact component={Home}/>

            <Link to='/signup'/>
            <Route path='/signup' component={Signup}/>

            <Link to='/login'/>
            <Route path='/login' component={Login}/>

            <Link to='/community'/>
            <Route path='/community' component={Community}/>


  	</Router>
  );
}

export default App;