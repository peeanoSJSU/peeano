// import React from "react";
// import 'p5/lib/addons/p5.sound';


import React, { useEffect } from "react";
import * as p5 from "p5";

 
const PianoSketch = () => {

  const Sketch = p5 => {

    let canvas;
    let state = 0; // 0 for guest/new user, 1 for logged in person with customized keymaps, 2 for keyboard key reassignment, 3 for recording
    let currentUser;
    let keyArray = [];

    let recording = {};
    let startTime = 0;

    let soundFiles = [
      "https://nguyenshana.github.io/piano-sounds/c1.m4a",
      "https://nguyenshana.github.io/piano-sounds/c1sharp.m4a",
      "https://nguyenshana.github.io/piano-sounds/d1.m4a",
      "https://nguyenshana.github.io/piano-sounds/d1sharp.m4a",
      "https://nguyenshana.github.io/piano-sounds/e1.m4a",
      "https://nguyenshana.github.io/piano-sounds/f1.m4a",
      "https://nguyenshana.github.io/piano-sounds/f1sharp.m4a",
      "https://nguyenshana.github.io/piano-sounds/g1.m4a",
      "https://nguyenshana.github.io/piano-sounds/g1sharp.m4a",
      "https://nguyenshana.github.io/piano-sounds/a1.m4a",
      "https://nguyenshana.github.io/piano-sounds/a1sharp.m4a",
      "https://nguyenshana.github.io/piano-sounds/b1.m4a",
      "https://nguyenshana.github.io/piano-sounds/c2.m4a"
    ]

    let defaultKeyMapping = {
      "c1" : ["white", "a", soundFiles[0], 20],
      "c1#" : ["black", "s", soundFiles[1], 40],
      "d1" : ["white", "d", soundFiles[2], 50],
      "d1#" : ["black", "e", soundFiles[3], 70],
      "e1" : ["white", "f", soundFiles[4], 80],

      "f1" : ["white", "g", soundFiles[5], 110],
      "f1#" : ["black", "h", soundFiles[6], 130],
      "g1" : ["white", "j", soundFiles[7], 140],
      "g1#" : ["black", "u", soundFiles[8], 160],
      "a1" : ["white", "k", soundFiles[9], 170],
      "a1#" :["black", "i", soundFiles[10], 190],
      "c2" : ["white", "l", soundFiles[11], 200]
    }

    // end main variables



    p5.setup = () => 
    {    

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

    }


    // not sure if this can a ctually be called from React
    p5.setState = (stateNum) =>
    {
      state = stateNum;
    }


    // currently drawing keys in order from left to right
    p5.draw = () =>
    {
      p5.fill(0);
      canvas = p5.createCanvas(p5.windowWidth, p5.windowHeight);
      if(state === 0) // new user or guest (if first time logged in, automatically set their keymapps to default; this needs to be toggled in React)
      {

        // draws keys
        for(let i = 0; i < keyArray.length; i++) 
        {
          keyArray[i].drawKey();
        }
        p5.drawMapButton();

        p5.drawRecordButton();

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

    } // end draw()



    /* BUTTON SECTION */

    let buttonX = 300;
    let buttonY = 100;
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

    let rbuttonX = 300;
    let rbuttonY = 50;
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
      p5.redraw();
      p5.fill(0);
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
          currentUser.updateKeyMappings(keyArray);
          currentSelectedKey = null;
        }
      }
      if (state === 3) { // recording
        let selectedKey;
        for(let n = 0; n < keyArray.length; n++) {
          if(keyArray[n].getKeyboardKey() === p5.key) {
            selectedKey = keyArray[n];
            recording[p5.millis() - startTime] = selectedKey;
          }
        }
      }

    } // end keyPressed()


    p5.keyReleased = () => {
      p5.redraw();
    }


    /**
    Function is called when mouse left button is pressed
    */
    p5.mouseClicked = () =>
    {
      // state button is pressed
      if(p5.mouseX > buttonX && p5.mouseX < buttonX + buttonWidth && p5.mouseY > buttonY && p5.mouseY < buttonY + buttonHeight) 
      {
        if(state === 2) 
        {
          state = 1;
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
      if(p5.mouseX > rbuttonX && p5.mouseX < rbuttonX + rbuttonWidth && p5.mouseY > rbuttonY && p5.mouseY < rbuttonY + rbuttonHeight) 
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
          currentUser.addRecording();
        }
        p5.redraw();
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
        // this.sound = p5.loadSound(sound);
        this.startY = 20;
      }

      play() {
        // this.sound.play();
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

      addRecording() {
        this.recordings.push(recording);
        console.log('added recording');
        // var intx = 30;
        // var inty = 200;
        p5.fill(0);
        for(let time in recording) {
         console.log(`${time} --> ${recording[time].getNote()}`);
         // p5.text(`${time} --> ${recording[time].getNote()}`, intx, inty);
         // inty += 10;
        }
      }

      getRecordings() {
        return this.recordings;
      }

    } // end User

  } // end Sketch

  useEffect(() => {
    new p5(Sketch);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   
   return (
      <></>
   );

} // end PianoSketch

export default PianoSketch;
