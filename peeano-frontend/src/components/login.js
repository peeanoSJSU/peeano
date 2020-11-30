import React, {useState, useContext} from 'react';
import {useHistory} from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const {setUserData} = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        const loginUser = {username, password};
        const loginRes = await axios.post("http://localhost:3001/login", loginUser);

        if (!loginRes) { // If no user found, don't leave login page.
            alert("no user!");
        }

        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/");
    }

    return (
        <div>
            <form onSubmit={submit}>
                <input id="login-username" type="text" onChange={(e) => setUsername(e.target.value)}></input>
                <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="submit" value="Login"></input>
            </form>
        </div>
    )
}
