import React, {useState, useContext} from 'react';
import './style.css';
import PianoSketch from './sketches/sketch';
import UserContext from '../context/UserContext';
import axios from 'axios';


/*
Problems:

- p5 doesn't wait for keymappings to be received
- if start proj & is logged in, p5 can't tell because it doesn't wait for the db data to be retrieved
- when logging out, need to refresh the page or else the record button and all the data will stay
- Recording title: be able to get the amount of recordings that they have
- the console.log(userData.user) in PianoSketch but outside Sketch is running twice for some reason
- is the recording an array or dictionary? (need to check the length)

*/


function Home() {

  const {userData} = useContext(UserContext);
  if(userData) {
    console.log("home current user = ", userData.user); 
  }

  // ** db keyMapping stuff

  // unused
  const getKeyMappings = async(e) => {
    if(userData.user) {
      const keyBindRes = await axios.get("http://localhost:3001/getKeybinds", 
        {user: userData.user.id});
      console.log("getKeyMappings() = ", keyBindRes.data.keybindings);
      return keyBindRes.data.keybindings;
    }
    console.log("no user, no keymappings");
  }


  return (
  	<div className='linkBody'>
		<div className='mainContainer'>
			<div className='titleContainer'>
				<h1 className='homeTitle'></h1>
				<div className='pianoBckgrd'>
					<div id='pianoPage'> 
          <PianoSketch userData={userData}/> 
					</div>
				</div>
			</div>
		</div>
	</div>
	)
}

export default Home;