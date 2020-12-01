import axios from 'axios';
import React, {useContext, useState} from 'react';
import UserContext from '../context/UserContext';

export default function Debug() {

    const {userData} = useContext(UserContext);

    const dummyData = ['a', 'b', 'c', 'w', 'z'];

    const editedKeybinds = {
        user: userData.user.id,
        keybinds: dummyData
    };

    const saveKeyMappings = async(e) => {
        const keyBindRes = await axios.post("http://localhost:3001/saveKeybinds", editedKeybinds);
        console.log(keyBindRes);
    }
    if (userData.user) { // If a valid user is logged in

        saveKeyMappings();
    }
    return (
        <div>

        </div>
    )
}
