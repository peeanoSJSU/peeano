import React from 'react';
import PianoSketch from './sketches/sketch';
import './style.css';

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