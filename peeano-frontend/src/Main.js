import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Landing from './components/landing.js';
import Login from './components/login.js';
import SignUp from './components/signup.js';

export default function Main() {
    return (
        <Router>
            <div className="container">
                <Link to='/'>Landing</Link>
                <br/>
                <Link to='/login'>Login</Link>
                <br />
                <Link to='/signup'>Sign Up</Link>

                <br />
                <Route path='/' exact component={Landing} />
                <Route path='/login' component={Login} />
                <Route path='/signup' component={SignUp} />
            </div>
        </Router>
    )
}
