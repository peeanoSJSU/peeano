var canvas;
var state; // 0 for init, 1 for regular, 2 for keyboard key reassignment


function setup() 
{
  noLoop();
}


// currently drawing keys in order from left to right
// NOTE: figure out pattern to draw keys in a for/while loop
// NOTE #2: be able to update keyboard key without it writing the inital value
function draw() 
{
  canvas = createCanvas(windowWidth, windowHeight);
  // maybe use dictionary to hold note and sound
  // soundArray = {note: [keyboardKey, sound], "c1": ["a", "c1.audio"]};

  new WhiteKey("c1", "a", "soundFile.audio", 20);
  new BlackKey("c1#", "s", "soundFile.audio", 40); // white + 20
  new WhiteKey("d1", "d", "soundFile.audio", 50); // black + 10
  new BlackKey("d1#", "f", "soundFile.audio", 70);
  new WhiteKey("c1", "e", "soundFile.audio", 80);

  new WhiteKey("c1", "f", "soundFile.audio", 110);
  new BlackKey("c1#", "g", "soundFile.audio", 130);
  new WhiteKey("d1", "h", "soundFile.audio", 140);
  new BlackKey("d1#", "j", "soundFile.audio", 160);
  var lastKey = new WhiteKey("c1", "l", "soundFile.audio", 170);

  // lastKey.changeKeyboardKey();
  print("draw() is called");
}


// NOTE: can this be inside of a class instead?
function keyPressed() {
	draw();
	text(`Key pressed: ${key}, Key code: ${keyCode}`, 30, 200);
}


/**
Super class to hold Piano Key note name, sound file, and top-left Y position
*/
class PianoKey 
{
	constructor(note, sound) 
	{
		this.note = note;
		// this.sound = loadSound(sound);
		this.startY = 20;
	}

	changeKeyboardKey() {
		this.keyboardKey = key;
		print(`New key = ${key}`);
		this.drawKey();
	}

}


/**
White piano key class
*/
class WhiteKey extends PianoKey
{
	// assume they all start at the same Y position
	constructor(note, keyboardKey, sound, startX) {
		super(note, sound);
		this.keyboardKey = keyboardKey;
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
}


/**
Black piano key class
*/
class BlackKey extends PianoKey
{
	// assume they all start at the same Y position
	constructor(note, keyboardKey, sound, startX) {
		super(note, sound);
		this.keyboardKey = keyboardKey;
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
}

