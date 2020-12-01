import React, { useEffect } from 'react';

import "p5/lib/addons/p5.sound.min";
import * as p5 from 'p5';

import UserContext from '../../context/UserContext';
import axios from 'axios';

/*
Problems:

- p5 doesn't wait for keymappings to be received
- if start proj & is logged in, p5 can't tell because it doesn't wait for the db data to be retrieved
- when logging out, need to refresh the page or else the record button and all the data will stay
- Recording title: be able to get the amount of recordings that they have
- the console.log(userData.user) in PianoSketch but outside Sketch is running twice for some reason


- Sometimes
- Adding recording; make auto-updating trackName in the db; only make it for display

*/


const PianoSketch = (props) => {

  const Sketch = p5 => {

    let canvas;
    let state = 0; // 0 for guest/new user, 1 for logged in person with customized keymaps, 2 for keyboard key reassignment, 3 for recording
    let originalState = 0;
    let currentUser;
    let keyArray = [];

    let recording = {};
    let startTime = 0;

    /* 
       DB setup
    */

    console.log(props.userData.user);
    if (props.userData.user) {
      state = 1;
      originalState = 1;
      let recording = props.getRecordings;
    }

    console.log("p5 user is: ", props.userData);

    // end DB setup


    let url = "https://nguyenshana.github.io/piano-sounds/"

    let soundFiles = [
      url + "c0.mp3",
      url + "c0s.mp3",
      url + "d0.mp3",
      url + "d0s.mp3",
      url + "e0.mp3",
      url + "f0.mp3",
      url + "f0s.mp3",
      url + "g0.mp3",
      url + "g0s.mp3",
      url + "a0.mp3",
      url + "a0s.mp3",
      url + "b0.mp3",

      url + "c1.mp3",
      url + "c1s.mp3",
      url + "d1.mp3",
      url + "d1s.mp3",
      url + "e1.mp3",
      url + "f1.mp3",
      url + "f1s.mp3",
      url + "g1.mp3",
      url + "g1s.mp3",
      url + "a1.mp3",
      url + "a1s.mp3",
      url + "b1.mp3",

      url + "c2.mp3",
      url + "c2s.mp3",
      url + "d2.mp3",
      url + "d2s.mp3",
      url + "e2.mp3",
      url + "f2.mp3",
      url + "f2s.mp3",
      url + "g2.mp3",
      url + "g2s.mp3",
      url + "a2.mp3",
      url + "a2s.mp3",
      url + "b2.mp3",
      url + "c3.mp3"
    ]

    let defaultKeyMapping = {
      "c0" : ["white", "1", soundFiles[0], 20],
      "c0#" : ["black", "2", soundFiles[1], 40],
      "d0" : ["white", "3", soundFiles[2], 50],
      "d0#" : ["black", "4", soundFiles[3], 70],
      "e0" : ["white", "5", soundFiles[4], 80],

      "f0" : ["white", "6", soundFiles[5], 110],
      "f0#" : ["black", "7", soundFiles[6], 130],
      "g0" : ["white", "8", soundFiles[7], 140],
      "g0#" : ["black", "9", soundFiles[8], 160],
      "a0" : ["white", "0", soundFiles[9], 170],
      "a0#" :["black", "-", soundFiles[10], 190],
      "b0" : ["white", "=", soundFiles[11], 200],


      "c1" : ["white", "a", soundFiles[12], 230],
      "c1#" : ["black", "s", soundFiles[13], 250],
      "d1" : ["white", "d", soundFiles[14], 260],
      "d1#" : ["black", "f", soundFiles[15], 280],
      "e1" : ["white", "g", soundFiles[16], 290],

      "f1" : ["white", "h", soundFiles[17], 320],
      "f1#" : ["black", "j", soundFiles[18], 340],
      "g1" : ["white", "k", soundFiles[19], 350],
      "g1#" : ["black", "l", soundFiles[20], 370],
      "a1" : ["white", ";", soundFiles[21], 380],
      "a1#" :["black", "'", soundFiles[22], 400],
      "b1" : ["white", "/", soundFiles[23], 410],


      "c2" : ["white", "q", soundFiles[24], 440],
      "c2#" : ["black", "w", soundFiles[25], 460],
      "d2" : ["white", "e", soundFiles[26], 470],
      "d2#" : ["black", "r", soundFiles[27], 490],
      "e2" : ["white", "t", soundFiles[28], 500],

      "f2" : ["white", "y", soundFiles[29], 530],
      "f2#" : ["black", "u", soundFiles[30], 550],
      "g2" : ["white", "i", soundFiles[31], 560],
      "g2#" : ["black", "o", soundFiles[32], 580],
      "a2" : ["white", "p", soundFiles[33], 590],
      "a2#" :["black", "[", soundFiles[34], 610],
      "b2" : ["white", "]", soundFiles[35], 620]
    }

    // end main variables


    p5.setup = () => 
    {
      if(window.location.pathname == "/" || window.location.pathname == "/home")
      {

      console.log("setup, state = ", state);
      p5.noLoop();
      p5.strokeWeight(4);

      if(state === 0) {
        let addKeyIndex = 0;
        for(let note in defaultKeyMapping) 
        {
          if(defaultKeyMapping[note][0] === "white")
          {
            keyArray[addKeyIndex] = new WhiteKey(note, defaultKeyMapping[note][1], defaultKeyMapping[note][2], defaultKeyMapping[note][3]);
          }
          else 
          {
            keyArray[addKeyIndex] = new BlackKey(note, defaultKeyMapping[note][1], defaultKeyMapping[note][2], defaultKeyMapping[note][3]);
          }
          addKeyIndex += 1;
        }

        currentUser = new User(keyArray);
      }
      // if signed in: set state = 1 & get their key array
      else if(state === 1) {
        let addKeyIndex = 0;
        for(let note in defaultKeyMapping) 
        {
          if(defaultKeyMapping[note][0] === "white")
          {
            keyArray[addKeyIndex] = new WhiteKey(note, defaultKeyMapping[note][1], defaultKeyMapping[note][2], defaultKeyMapping[note][3]);
          }
          else 
          {
            keyArray[addKeyIndex] = new BlackKey(note, defaultKeyMapping[note][1], defaultKeyMapping[note][2], defaultKeyMapping[note][3]);
          }
          addKeyIndex += 1;
        }

        currentUser = new User(keyArray);
      }
      else {
        console.log("setup remove all");
        p5.remove();
      }
      }

      /* if just creating a sketch to play recordings, don't draw anything
      else if (state === 4) {
        currentUser = new User(keyArray)
        FOR EACH ITEM IN RECORDING ARRAY, CALL USER. ADD RECORDING
      }
      */

    }


    // currently drawing keys in order from left to right
    p5.draw = () =>
    {
      if(window.location.pathname !== "/" || window.location.pathname !== "/home")
      {

		  p5.fill(0);
		  // canvas = p5.createCanvas(900, p5.windowHeight);
		  console.log("draw state = ", state);
		  if (state < 4) 
		  {
		    canvas = p5.createCanvas(900, 300);
		    canvas.parent('pianoPage');
		    canvas.position(100, 20, 'relative');
		  }
		  if(state === 0) // new user or guest (if first time logged in, automatically set their keymapps to default; this needs to be toggled in React)
		  {

		    // draws keys
		    for(let i = 0; i < keyArray.length; i++) 
		    {
		      keyArray[i].drawKey();
		    }
		    p5.drawMapButton();

		  } 
		  else if (state === 1) // someone is logged in; basically same as 0
		  {
		    // draws keys
		    for(let j = 0; j < keyArray.length; j++) 
		    {
		      keyArray[j].drawKey();
		    }
		    p5.drawMapButton();

		    p5.drawRecordButton();

		  }
		  else if (state === 2) // changing keystrokes
		  {
		    // draws keys
		    for(let k = 0; k < keyArray.length; k++) 
		    {
		      keyArray[k].drawKey();
		    }
		    p5.drawPlayButton();

		  }
		  else if (state === 3) // recording
		  {
		    // draws keys
		    for(let l = 0; l < keyArray.length; l++) 
		    {
		      keyArray[l].drawKey();
		    }

		    p5.drawEndRecordingButton();

		  }
		  else if (state === 4) // just playing recording, not display piano
		  {
		    p5.createCanvas(0, 0);
		  }
    }
    else {
      console.log("setup remove all");
      p5.remove();
    }

    } // end draw()


    p5.windowResized = () => {
      p5.redraw();
    }



    /* MAPPING BUTTON SECTION */

    let buttonX = 300;
    let buttonY = 200;
    let buttonWidth = 180;
    let buttonHeight = 30;

    /**
    Draws button to display for user to change to map mode
    */
    p5.drawMapButton = () => {
      p5.fill(0);
      p5.rect(buttonX, buttonY, buttonWidth, buttonHeight);
      p5.fill(255);
      p5.text('Click here to change mappings', buttonX + 7, buttonY + 20);
    }


    /**
    Draws button to display for user to change to regular mode
    */
    p5.drawPlayButton = () => {
      p5.fill(255);
      p5.rect(buttonX, buttonY, buttonWidth, buttonHeight);
      p5.fill(0);
      p5.text('Click here to play piano', buttonX + 25, buttonY + 20);
    }


    /* RECORDING BUTTON SECTION */

    let rbuttonX = 150;
    let rbuttonY = 200;
    let rbuttonWidth = 100;
    let rbuttonHeight = 30;

    /**
    Draws button to display for user to change to map mode
    */
    p5.drawRecordButton = () => {
      p5.fill(0);
      p5.rect(rbuttonX, rbuttonY, rbuttonWidth, rbuttonHeight);
      p5.fill(255);
      p5.text('Record', rbuttonX + 30, rbuttonY + 20);
    }


    /**
    Draws button to display for user to change to regular mode
    */
    p5.drawEndRecordingButton = () => {
      p5.fill(255);
      p5.rect(rbuttonX, rbuttonY, rbuttonWidth, rbuttonHeight);
      p5.fill(0);
      p5.text('End Recording', rbuttonX + 10, rbuttonY + 20);
    }




    /* USER INPUT SECTION (keyboard key press or mouse click) */

    let currentSelectedKey = null;
    let textX = 30;
    let textY = 200;

    /**
    Function is called when a keyboard key is pressed
    */
    p5.keyPressed = () =>
    {
    	if(window.location.pathname == "/" || window.location.pathname == "/home")
      {
      	
  			p5.redraw();
  			p5.fill(0);
  			console.log("keyPressed");
  			if(state === 0 || state === 1 || state === 3) {
  				p5.text(`Key pressed: ${p5.key}`, textX, textY);
  				// 
  				// loop through ALL of list to find corresponding key(s) & then play the audio
  				//
  				for(let m = 0; m < keyArray.length; m++) {
  				  if(keyArray[m].getKeyboardKey() === p5.key) {
  				    keyArray[m].drawPressedKey();
  				  }
  				}
  			}
  			else if (state === 2) { // change the keymapping and notify user
  			// text(`Key pressed: ${key} (no piano key selected to remap)`, textX, textY);

  				if(currentSelectedKey != null) 
  				{
  				  let sameKeyIndex = 0;
  				  while(sameKeyIndex < keyArray.length) 
  				  {
  				    if(keyArray[sameKeyIndex] === currentSelectedKey) 
  				    {
  				      break;
  				    }
  				    sameKeyIndex += 1;
  				  }
  				  keyArray[sameKeyIndex].changeKeyboardKey();
  				  currentSelectedKey = null;
  				}
  			}
  			if (state === 3) { // recording
  				for(let n = 0; n < keyArray.length; n++) {
  				  if(keyArray[n].getKeyboardKey() === p5.key) {
  				    recording[p5.millis() - startTime] = keyArray[n];
  				  }
  				}
  			}	

		  }
      else {
        console.log("remove all");
        p5.remove();
      }
    } // end keyPressed()


    p5.keyReleased = () => {
      if(window.location.pathname != "/" || window.location.pathname != "/home")
      {
        console.log("key released");
        p5.redraw();
      }
      else {
        console.log("setup remove all");
        p5.remove();
      }
    }


    /**
    Function is called when mouse left button is pressed
    */
    p5.mouseClicked = () =>
    {
      console.log(window.location.pathname);
      if(window.location.pathname == "/" || window.location.pathname == "/home")
      {
        console.log("mouse clicked");
        // Remaping button is pressed
        if(p5.mouseX > buttonX && p5.mouseX < buttonX + buttonWidth && p5.mouseY > buttonY && p5.mouseY < buttonY + buttonHeight) 
        {
          if(state === 2) 
          {
            if(originalState === 1) 
            {
              state = 1;
            }
            else 
            {
              state = 0;
            }
            currentUser.updateKeyMappings(keyArray);
            p5.redraw();
          }
          else if (state === 0 || state === 1) 
          {
            state = 2;
            p5.redraw();
          } 
        } 
        else if(state === 2) 
        { // see if user if selecting a key to remap
          currentSelectedKey = p5.selectKeyToRemap();
        }
        // Recording button
        if(p5.mouseX > rbuttonX && p5.mouseX < rbuttonX + rbuttonWidth && p5.mouseY > rbuttonY && p5.mouseY < rbuttonY + rbuttonHeight && originalState === 1) 
        {
          if(state === 0 || state === 1) 
          { // starting recording
            state = 3;
            recording = {};
            startTime = p5.millis();
          }
          else if(state === 3) 
          { // ending recording
            state = 1;
            currentUser.addRecordingToDB();
          }
          p5.redraw();
        }

        // display recordings below the piano
        // let recordingsArray = currentUser.getRecordings();
        // p5.fill(0);
        // for(let nn = 0; nn < recordingsArray.length; nn++) 
        // {
        //   let index = textY + 90;
        //   p5.text(`Recording #${nn + 1}`, textX + (nn * 200), index - 30);
        //   let keys = Object.keys(recordingsArray[nn]);
        //   keys.forEach(key=>{
        //     let note = recordingsArray[nn][key].getNote();
        //     p5.text(`${key}ms --> ${note}`, textX + (nn * 200), index);
        //     index += 20;
        //   });
        // }
      }
      else 
      {
        console.log("remove all");
        p5.remove();
      }
    } // end mouseClicked()


    /**
    Finds which piano key is clicked on and returns it
    */
    p5.selectKeyToRemap = () => {

      p5.redraw();
      let whiteKeys = [];
      let selectedBlackKey = false;
      let selectedKey = null;

      // iterate through black keys first because they're visually "on top"
      let findKeyIndex = 0;
      while(findKeyIndex < keyArray.length) 
      {
        if(keyArray[findKeyIndex].constructor.name === "BlackKey") 
        {
          if(keyArray[findKeyIndex].contains(p5.mouseX, p5.mouseY)) 
          {
            selectedKey = keyArray[findKeyIndex];
            findKeyIndex = keyArray.length;
            selectedBlackKey = true;
          }
        }
        else 
        {
          whiteKeys.push(keyArray[findKeyIndex]);
        }
        findKeyIndex += 1;
      }
      // if black key wasn't selected, then iterate through white keys
      if(!selectedBlackKey) 
      {
        findKeyIndex = 0;
        while(findKeyIndex < whiteKeys.length) 
        {
          if(whiteKeys[findKeyIndex].contains(p5.mouseX, p5.mouseY)) 
          {
            selectedKey = whiteKeys[findKeyIndex];
            findKeyIndex = whiteKeys.length;
          }

          findKeyIndex += 1;
        }
      }

      p5.fill(0);
      if(selectedKey == null) {
        p5.text("Please press on a piano key! :)", textX, textY);
      } else {
        p5.text(`Press on new keyboard key to map with ${selectedKey.getNote()}`, textX, textY);
      }

      return selectedKey;

    }

    // end of main functions



    /**
    Abstract class to hold Piano Key note name, sound file, and top-left Y position
    (tbh not sure if abstract is the correct term, but don't initialize this)
    */
    class PianoKey 
    {
      constructor(note, keyboardKey, sound) 
      {
        this.note = note;
        this.keyboardKey = keyboardKey;
        this.sound = p5.loadSound(sound);
        this.startY = 20;
      }

      play() {
        this.sound.play();
      }

      contains(x, y) 
      {
        if(x > this.startX && x < this.startX + this.width && y > this.startY && y < this.startY + this.height) 
        {
          return true;
        }
        return false;
      }

      changeKeyboardKey() {
        this.keyboardKey = p5.key;
        p5.redraw();
        p5.text(`New key = ${p5.key} for ${this.note}`, textX, textY);
      }

      getNote() {
        return this.note;
      }

      getKeyboardKey() {
        return this.keyboardKey;
      }

    }


    /**
    White piano key class
    */
    class WhiteKey extends PianoKey
    {
      // assume they all start at the same Y position
      constructor(note, keyboardKey, sound, startX) {
        super(note, keyboardKey, sound);
        this.startX = startX;
        this.width = 30;
        this.height = 140;
        this.drawWhiteKey();
      }

      drawKey() {
        this.drawWhiteKey();
      }

      // 75 because that's the height of a black key
      drawPressedKey() {
        p5.strokeWeight(0);
        p5.fill(200)
        p5.rect(this.startX, this.startY + 75, this.width, this.height - 75);
        p5.strokeWeight(1);
        p5.fill(0);
        p5.text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
        super.play();
      }

      drawWhiteKey() {
        p5.noFill();
        p5.rect(this.startX, this.startY, this.width, this.height);
        p5.fill(0);
        p5.text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
      }


    } // end WhiteKey



    /**
    Black piano key class
    */
    class BlackKey extends PianoKey
    {
      // assume they all start at the same Y position
      constructor(note, keyboardKey, sound, startX) {
        super(note, keyboardKey, sound);
        this.startX = startX;
        this.width = 20;
        this.height = 75;
        this.drawBlackKey();
      }

      drawKey() {
        this.drawBlackKey();
      }

      drawPressedKey() {
        p5.fill(100);
        p5.rect(this.startX + 1, this.startY, this.width - 2, this.height - 1);
        p5.fill(255);
        p5.text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
        super.play()
      }

      drawBlackKey() {
        p5.fill(0);
        p5.rect(this.startX, this.startY, this.width, this.height);
        p5.fill(255);
        p5.text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
      }

    } // end BlackKey



    /**
    Class to represent a user & their keyboard mappings
    */
    class User 
    {
      // keys input is an array of PianoKeys, both WhiteKey and BlackKey
      constructor(keys) {
        this.allKeys = keys;
        // format for recordings [{},{}]
        // recording = {timeInMillisec, PianoKey}
        this.recordings = [];
      }

      // SCRAP THIS
      // updateKeyMappingsToDB(keys) {
      //   this.allKeys = keys;
      //   // replace keybinds with keyArray & place within the Sketch
      //   console.log("starting update of db key mappings ... ");
      //   const setKeyMappings = async(e) => {
      //       const keyBindRes = await axios.post("http://localhost:3001/saveKeybinds", 
      //         {user: props.userData.user.id , keybinds: keys});
      //       console.log("SetKeyMappings() = ", keyBindRes);
      //   }
      //   setKeyMappings();
      // } 

      updateKeyMappings(keys) {
        this.allKeys = keys;
      } 

      // this resets the keyArray accessible throughout the entire file to the default mapping as well
      revertToDefaultMapping() 
      {
        let addKeyIndex = 0;
        for(let note in defaultKeyMapping) 
        {
          if(defaultKeyMapping[note][0] === "white")
          {
            keyArray[addKeyIndex] = new WhiteKey(note, defaultKeyMapping[note][1], defaultKeyMapping[note][2], defaultKeyMapping[note][3]);
          }
          else 
          {
            keyArray[addKeyIndex] = new BlackKey(note, defaultKeyMapping[note][1], defaultKeyMapping[note][2], defaultKeyMapping[note][3]);
          }
          addKeyIndex += 1;
        }
        this.allKeys = keyArray
      }

      getKeyMappings() {
        return this.allKeys;
      }

      // This method adds the recording to the database
      addRecordingToDB() {
        this.recordings.push(recording);
        console.log('recording: ', recording);

        let addToDB = [];
        var timeKeys = Object.keys(recording);
        timeKeys.forEach(timeKeys=>{
          // addToDB.push(JSON.stringify(recording[timeKeys], getCircularReplacer()));
          addToDB.push([timeKeys, recording[timeKeys].getNote()]);
        });

        console.log("starting to send recording to db");
        // change recording to recording array and trackName a changing number
        const addRecordings = async(e) => {
            const addedRecording = await axios.post("http://localhost:3001/saveRecording", 
              {user: props.userData.user.id, trackName: "someone: time & note 2", recordingPiece: addToDB });
            console.log("addRecording() = ", addedRecording.data.newRecordingAdded);
        }
        addRecordings();
        console.log('added recording to db');
      }

      // This method adds a recording to the p5 User object, not the database
      addRecording() {
        this.recordings.push(recording);
        console.log('added recording');
        p5.fill(0);
      }

      getRecordings() {
        return this.recordings;
      }

      playRecording(recordingIndex) {
        var timeKeys = Object.keys(this.recordings[recordingIndex]);
        var iteratingRecording = this.recordings[recordingIndex];
        timeKeys.forEach(timeKeys=>{
          this.playRecordingHelper(iteratingRecording[timeKeys], timeKeys);
        });
      } 

      playRecordingHelper(note, waitTime) {
        setTimeout(function() {
            note.play();
          }.bind(this), waitTime);
      }

    } // end User

  } // end Sketch

  useEffect(() => {
    setTimeout(function() {
            new p5(Sketch)
          }, 2000);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   
   return (
      <></>
   );

} // end PianoSketch


export default PianoSketch;