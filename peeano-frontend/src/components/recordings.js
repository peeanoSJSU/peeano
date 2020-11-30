import React, { useState } from 'react';
import './style.css';
import { Button } from './button';

function Recordings(){

	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	return(
		<div className='linkBody'>
			<div className='titleContainer'>
				<h1 className='pageTitle'>Recordings</h1>
			</div>
		</div>
	);
}

export default Recordings;
