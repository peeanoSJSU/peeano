import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Main from './Main.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import Recordings from './components/recordings';
import './components/navbar.css';
import Debug from './components/Debug.js';
import SuccessSignUp from './components/SuccessSignUp';
import UserContext from './context/UserContext.js';
import axios from 'axios';

function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  });

  useEffect(() => {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem("auth-token");
        if (token === null) {
          localStorage.setItem("auth-token", "");
          token = "";
        }
        const tokenRes = await axios.post('http://localhost:3001/tokenIsValid', null, {headers: {"x-auth-token": token}});

        if (tokenRes.data) {
          const userRes = await axios.get('http://localhost:3001/user', {headers: {"x-auth-token": token}});
          setUserData({
            token,
            user: userRes.data
          });
        }
      }

      checkLoggedIn();
  }, []);

  return (
  	<Router>
      <UserContext.Provider value={{userData, setUserData}}>
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

            <Link to='/recordings'/>
            <Route path='/recordings' component={Recordings}/>

            {/* <Link to='/alantest' /> */}
            <Route path='/debug' component={Debug} />
            <Route path='/successsignup' component={SuccessSignUp} />

      </UserContext.Provider>
  	</Router>

  );
}

export default App;
