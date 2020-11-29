import React, {useState} from 'react';
import axios from 'axios';
import './style.css';

function Signup() {

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
		const newUser = {
			username: input.username,
			password: input.password
		}

		axios.post('http://localhost:3001/signup', newUser);
	}

    return (
    	<div className='linkBody'>
<<<<<<< HEAD
    		<div className='titleContainer'>
            	<h1 className='pageTitle'>Signup</h1>
        	</div>
=======
			<form id="signup-form">
				<input onChange={handleChange} name="username" className="form-control" value={input.username} type="text" placeholder="Username" id="username"></input>
				<input onChange={handleChange} name="password" className="form-control" value={input.password} type="password" placeholder="Password" id="password"></input>
				<button onClick={handleClick} className="btn btn-primary" id="submitbtn">Submit</button>
			</form>
>>>>>>> 27ca6f3c82ddff5c9bdebef116726d0598c95b5e
        </div>
    );
}

export default Signup;
