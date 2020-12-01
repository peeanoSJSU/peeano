import React, {useContext} from 'react'
import {useHistory} from 'react-router-dom';

import UserContext from '../../context/UserContext';

export default function AuthOptions() {

    const {userData, setUserData} = useContext(UserContext);

    const history = useHistory();

    const signup = () => history.push("/signup");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        });
        localStorage.setItem("auth-token", "");
        history.go("0");
    }

    const buttonStyle = {
        marginTop: "5px"
    };
    return (
        <div className="mt-3 auth-options" >
            {
                userData.user ?
                (<button onClick={logout} className="btn--outline" style={buttonStyle}>Log Out</button>) :
                (<>
                <button onClick={signup} className="btn--outline" style={buttonStyle}>Sign Up</button>
                <button onClick={login} className="btn--outline" style={buttonStyle}>Login</button>
                </>)
            }
        </div>
    )
}
