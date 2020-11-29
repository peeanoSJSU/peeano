import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Main from './Main.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Recordings from './components/recordings';
import './components/navbar.css';
<<<<<<< HEAD
=======
import P5Wrapper from 'react-p5-wrapper';
import Test from './sketches/Test';
>>>>>>> 27ca6f3c82ddff5c9bdebef116726d0598c95b5e

function App() {
  return (
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

<<<<<<< HEAD
            <Link to='/recordings'/>
            <Route path='/recordings' component={Recordings}/>
=======
            <Link to='/community'/>
            <Route path='/community' component={Community}/>

>>>>>>> 27ca6f3c82ddff5c9bdebef116726d0598c95b5e

  	</Router>

  );
}

export default App;
