import React from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useState } from "react";
import axios from 'axios';



export default function Login() {

    	// axios.get('/login');
	const [input, setInput] = useState({
		username: '',
		password: ''
	});
	function handleChange(event) {
		const {name, value} = event.target;

		setInput(prevInput => {
			return {...prevInput,
				[name]: value
			}
		})
	}

	function handleClick(event) {
		event.preventDefault();
		const userInfo = {
			username: input.username,
			password: input.password
		}

		axios.post('http://localhost:3001/login', userInfo);
	}

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // function performValidation() {
    //     return username.length > 0 && password.length > 0;
    // }
    // function handleSubmit(event) {
    //     event.preventDefault();
    // }



    return (
        <div className="Login">
            {/* <form onSubmit={handleSubmit}>
                <FormGroup controlId="username" bsSize="sm">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="sm">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!performValidation()} type="submit">
                    Login
                </Button>
            </form> */}

            <form id="login-form">
				<input onChange={handleChange} name="username" className="form-control" value={input.username} type="text" placeholder="Username" id="login-username"></input>
				<input onChange={handleChange} name="password" className="form-control" value={input.password} type="password" placeholder="Password" id="login-password"></input>
				<button onClick={handleClick} className="btn btn-primary" id="submitbtn">Submit</button>
			</form>
        </div>
    );
}


