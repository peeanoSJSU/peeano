import React from 'react';
<<<<<<< HEAD
import PianoSketch from './sketches/sketch';
import './style.css';
=======
import './style.css';

>>>>>>> 27ca6f3c82ddff5c9bdebef116726d0598c95b5e

function Home() {
    return (
    	<div className='linkBody'>
			<div className='mainContainer'>
				<div className='titleContainer'>
					<h1 className='homeTitle'></h1>
					<div className='pianoBckgrd'>
						<div id='pianoPage'> <PianoSketch/> </div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Home;


    	<div className='linkBody'>
			<div className='mainContainer'>
				<div className='titleContainer'>
					<h1 className='pageTitle'>Welcome to Peeano virtual piano</h1>
					<div className='pianoBckgrd'>
						<div id='pianoPage'> <PianoSketch/> </div>
					</div>
				</div>
			</div>
		</div>