import React from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useState } from "react";
import './style.css';


export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function performValidation() {
        return username.length > 0 && password.length > 0;
    }
    function handleSubmit(event) {
        event.preventDefault();
    }
    return (
    <div className='linkBody'>
        <h1 className='pageTitle'>Login page</h1>
    <div className='sitefit'>
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup className='loginlabels' controlId="username" bsSize="sm">
                    <FormLabel className='loginlabels'>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup className='loginlabels' controlId="password" bsSize="sm">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button className='loginButton' block bsSize="large" disabled={!performValidation()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    </div>
    </div>
    );
}


