/*
Map files: https://github.com/processing/p5.js-sound/tree/master/lib
*/


var canvas;
var state = 0; // 0 for guest/new user, 1 for logged in person with customized keymaps, 2 for keyboard key reassignment, 3 for recording
var currentUser;
var keyArray = [];

var recording = {};
var startTime = 0;

var soundFiles = [
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

var defaultKeyMapping = {
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

// var whiteThenBlackKeys = {
// 	"c1" : ["white", "a", "soundFile.audio", 20],
// 	"d1" : ["white", "d", "soundFile.audio", 50],
// 	"e1" : ["white", "e", "soundFile.audio", 80],
// 	"f1" : ["white", "f", "soundFile.audio", 110],
// 	"g1" : ["white", "h", "soundFile.audio", 140],
// 	"a1" : ["white", "l", "soundFile.audio", 170],
// 	"c2" : ["white", "l", "soundFile.audio", 200],

// 	"c1#" : ["black", "s", "soundFile.audio", 40],
// 	"d1#" : ["black", "f", "soundFile.audio", 70],
// 	"f1#" : ["black", "g", "soundFile.audio", 130],
// 	"g1#" : ["black", "j", "soundFile.audio", 160],
// 	"a1#" :["black", "j", "soundFile.audio", 190]
// }


/************************** GENERAL FUNCTIONS *****************************/


function setup() 
{
	noLoop();
	strokeWeight(4);

	if(state == 0) {
		var addKeyIndex = 0;
		for(var note in defaultKeyMapping) 
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


// not sure if this can actually be called from React
function setState(stateNum) 
{
	state = stateNum;
}


// currently drawing keys in order from left to right
function draw() 
{
	fill(0);
	canvas = createCanvas(windowWidth, windowHeight);
	if(state == 0) // new user or guest (if first time logged in, automatically set their keymapps to default; this needs to be toggled in React)
	{

		// draws keys
		for(var i = 0; i < keyArray.length; i++) 
		{
			keyArray[i].drawKey();
		}
		drawMapButton();

		drawRecordButton();

		print("state = 0");

	} 
	else if (state == 1) // someone is logged in; basically same as 0
	{
		// draws keys
		for(var i = 0; i < keyArray.length; i++) 
		{
			keyArray[i].drawKey();
		}
		drawMapButton();

		drawRecordButton();

		print("state = 1 :)");

	}
	else if (state == 2) // changing keystrokes
	{
		// draws keys
		for(var i = 0; i < keyArray.length; i++) 
		{
			keyArray[i].drawKey();
		}
		drawPlayButton();

		print("state = 2 :))");
	}
	else if (state == 3) // recording
	{
		// draws keys
		for(var i = 0; i < keyArray.length; i++) 
		{
			keyArray[i].drawKey();
		}

		drawEndRecordingButton();

		print("state = 3");
	}

} // end draw()



/* BUTTON SECTION */

var buttonX = 300;
var buttonY = 100;
var buttonWidth = 180;
var buttonHeight = 30;

/**
Draws button to display for user to change to map mode
*/
function drawMapButton() {
	fill(0);
	rect(buttonX, buttonY, buttonWidth, buttonHeight);
	fill(255);
	text('Click here to change mappings', buttonX + 7, buttonY + 20);
}


/**
Draws button to display for user to change to regular mode
*/
function drawPlayButton() {
	fill(255);
	rect(buttonX, buttonY, buttonWidth, buttonHeight);
	fill(0);
	text('Click here to play piano', buttonX + 25, buttonY + 20);
}


/* RECORDING BUTTON SECTION */

var rbuttonX = 300;
var rbuttonY = 50;
var rbuttonWidth = 100;
var rbuttonHeight = 30;

/**
Draws button to display for user to change to map mode
*/
function drawRecordButton() {
	fill(0);
	rect(rbuttonX, rbuttonY, rbuttonWidth, rbuttonHeight);
	fill(255);
	text('Record', rbuttonX + 30, rbuttonY + 20);
}


/**
Draws button to display for user to change to regular mode
*/
function drawEndRecordingButton() {
	fill(255);
	rect(rbuttonX, rbuttonY, rbuttonWidth, rbuttonHeight);
	fill(0);
	text('End Recording', rbuttonX + 10, rbuttonY + 20);
}



/* USER INPUT SECTION (keyboard key press or mouse click) */

var currentSelectedKey = null;
var textX = 30;
var textY = 200;

/**
Function is called when a keyboard key is pressed
*/
function keyPressed() 
{
	redraw();
	fill(0);
	if(state == 0 || state == 1 || state == 3) {
		text(`Key pressed: ${key}`, textX, textY);
		// 
		// loop through ALL of list to find corresponding key(s) & then play the audio
		//
		for(var i = 0; i < keyArray.length; i++) {
			if(keyArray[i].getKeyboardKey() == key) {
				keyArray[i].drawPressedKey();
			}
		}
	}
	else if (state == 2) { // change the keymapping and notify user
		// text(`Key pressed: ${key} (no piano key selected to remap)`, textX, textY);

		if(currentSelectedKey != null) 
		{
			var sameKeyIndex = 0;
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
	if (state == 3) { // recording
		var selectedKey;
		for(var i = 0; i < keyArray.length; i++) {
			if(keyArray[i].getKeyboardKey() == key) {
				selectedKey = keyArray[i];
				recording[millis() - startTime] = selectedKey;
			}
		}
	}

} // end keyPressed()


function keyReleased() {
	redraw();
}


/**
Function is called when mouse left button is pressed
*/
function mouseClicked()
{
	// state button is pressed
	if(mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) 
	{
		if(state == 2) 
		{
			state = 1;
			redraw();
		}
		else if (state == 0 || state == 1) 
		{
			state = 2;
			redraw();
		} 
	} 
	else if(state == 2) 
	{ // see if user if selecting a key to remap
		currentSelectedKey = selectKeyToRemap();
	}
	if(mouseX > rbuttonX && mouseX < rbuttonX + rbuttonWidth && mouseY > rbuttonY && mouseY < rbuttonY + rbuttonHeight) 
	{
		if(state == 0 || state == 1) 
		{ // starting recording
			state = 3;
			recording = {};
			startTime = millis();
		}
		else if(state == 3) 
		{ // ending recording
			state = 1;
			currentUser.addRecording();
		}
		redraw();
	}

} // end mouseClicked()


/**
Finds which piano key is clicked on and returns it
*/
function selectKeyToRemap() {

	redraw();
	var whiteKeys = [];
	var selectedBlackKey = false;
	var selectedKey = null;

	// iterate through black keys first because they're visually "on top"
	var findKeyIndex = 0;
	while(findKeyIndex < keyArray.length) 
	{
		if(keyArray[findKeyIndex].constructor.name == "BlackKey") 
		{
			if(keyArray[findKeyIndex].contains(mouseX, mouseY)) 
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
			if(whiteKeys[findKeyIndex].contains(mouseX, mouseY)) 
			{
				selectedKey = whiteKeys[findKeyIndex];
				findKeyIndex = whiteKeys.length;
			}

			findKeyIndex += 1;
		}
	}

	fill(0);
	if(selectedKey == null) {
		text("Please press on a piano key! :)", textX, textY);
	} else {
		text(`Press on new keyboard key to map with ${selectedKey.getNote()}`, textX, textY);
	}

	return selectedKey;

}



/******************************  CLASSES *********************************/



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
		this.sound = loadSound(sound);
		this.startY = 20;
	}

	play() {
		print(`${this.note} is played with keyboard key ${this.keyboardKey}`);
		this.sound.play();
	}

	contains(x, y) 
	{
		if(x > this.startX && x < this.startX + this.width && y > this.startY && y < this.startY + this.height) 
		{
			print(`${this.note} is clicked on`);
			return true;
		}
		return false;
	}

	changeKeyboardKey() {
		this.keyboardKey = key;
		redraw();
		text(`New key = ${key} for ${this.note}`, textX, textY);
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
		strokeWeight(0);
		fill(200)
		rect(this.startX, this.startY + 75, this.width, this.height - 75);
		strokeWeight(4);
		fill(0);
		text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
		super.play();
	}

	drawWhiteKey() {
		noFill();
		rect(this.startX, this.startY, this.width, this.height);
		fill(0);
		text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
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
		fill(100);
		rect(this.startX, this.startY, this.width, this.height);
		fill(255);
		text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
		super.play()
	}

	drawBlackKey() {
		fill(0);
		rect(this.startX, this.startY, this.width, this.height);
		fill(255);
		text(this.keyboardKey, this.startX + this.width/2 , this.startY + this.height - 5);
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
		for(var note in defaultKeyMapping) 
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
		// for(var time in recording) {
		// 	print(time, recording[time].getNote());
		// }
	}

	getRecordings() {
		return this.recordings;
	}

} // end User

