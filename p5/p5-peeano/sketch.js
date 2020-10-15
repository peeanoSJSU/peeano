var canvas;
var state = 0; // 0 for guest/new user, 1 for logged in person with customized keymaps, 2 for keyboard key reassignment
var currentUser;
var keyArray = [];

var defaultKeyMapping = {
	"c1" : ["white", "a", "soundFile.audio", 20],
	"c1#" : ["black", "s", "soundFile.audio", 40],
	"d1" : ["white", "d", "soundFile.audio", 50],
	"d1#" : ["black", "f", "soundFile.audio", 70],
	"e1" : ["white", "e", "soundFile.audio", 80],

	"f1" : ["white", "f", "soundFile.audio", 110],
	"f1#" : ["black", "g", "soundFile.audio", 130],
	"g1" : ["white", "h", "soundFile.audio", 140],
	"g1#" : ["black", "j", "soundFile.audio", 160],
	"a1" : ["white", "l", "soundFile.audio", 170],
	"a1#" :["black", "j", "soundFile.audio", 190],
	"c2" : ["white", "l", "soundFile.audio", 200]
}


/************************** GENERAL FUNCTIONS *****************************/


function setup() 
{
	noLoop();
}


// not sure if this can actually be called from React
function setState(stateNum) 
{
	state = stateNum;
}


// currently drawing keys in order from left to right

function draw() 
{
	canvas = createCanvas(windowWidth, windowHeight);
	if(state == 0) // new user or guest (if first time logged in, automatically set their keymapps to default; this needs to be toggled in React)
	{
		// Creating keys & adding them to PianoKey array
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

		drawMapButton();

		print("state = 0");

	} 
	else if (state == 1) // someone is logged in 
	{
		// draws keys
		for(var i = 0; i < keyArray.length; i++) 
		{
			keyArray[i].drawKey();
		}
		drawMapButton();

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
	if(state == 0 || state == 1) {
		text(`Key pressed: ${key}`, textX, textY);
		// 
		// loop through ALL of list to find corresponding key(s) & then play the audio
		//
	}
	else if (state == 2) { // change the keymapping and notify user
		text(`Key pressed: ${key} (no piano key selected to remap)`, textX, textY);

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

} // end keyPressed()


/**
Function is called when mouse left button is pressed
*/
function mouseClicked()
{
	// state button is pressed
	if(mouseX > buttonX && mouseX < buttonX + buttonWidth && mouseY > buttonY && mouseY < buttonY + buttonHeight) {
		if(state == 2) {
			state = 1;
			redraw();
		}
		else if (state == 0 || state == 1) {
			state = 2;
			redraw();
		}
	}
	else if(state == 2) {
		currentSelectedKey = selectKeyToRemap();
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
		// this.sound = loadSound(sound);
		this.startY = 20;
	}

	play() {
		print(`${this.note} is played with keyboard key ${this.keyboardKey}`);
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

} // end User

