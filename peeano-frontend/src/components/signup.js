import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';

export default function Signup() {

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const {setUserData} = useContext(UserContext);
	const history = useHistory();

	const submit = async (e) => {
		e.preventDefault();
		const newUser = {
			username,
			password
		}

		await axios.post('http://localhost:3001/signup', newUser);

		const loginRes = await axios.post('http://localhost:3001/login', {
			username,
			password
		});
		setUserData({
			token: loginRes.data.token,
			user: loginRes.data.user
		});
		localStorage.setItem("auth-token", loginRes.data.token);
		history.push("/");
	};

	return (
		<div>
			<form>
				<input type="text" id="signup-username" onChange={(e) => setUsername(e.target.value)}></input>
				<input type="password" id="signup-password" onChange={(e) => setPassword(e.target.value)}></input>

				<input type="submit" value="Sign Up"></input>
			</form>
		</div>
	)
}
