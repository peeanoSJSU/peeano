import axios from 'axios';
import React, {useContext, useState} from 'react';
import UserContext from '../context/UserContext';

export default function Debug() {

    const {userData} = useContext(UserContext);

    const getKeyMappings = async(e) => {
        const keyBindRes = await axios.get("http://localhost:3001/getKeybinds", {user: userData.user.id});
        console.log(keyBindRes);
    }
    if (userData.user) {getKeyMappings();}
    return (
        <div>

        </div>
    )
}
