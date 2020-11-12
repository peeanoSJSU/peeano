import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './Main.js';
import PianoSketch from './sketches/sketch';
// import P5Wrapper from 'react-p5-wrapper';
// import Test from './sketches/Test';


function App() {
  return (
  	<div>
	    <Main />
	    <PianoSketch />
    </div>
  );
}

export default App;
