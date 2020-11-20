import React, { useState } from 'react';
import './style.css';
import { Button } from './button';

function Community(){

	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	return(
		<div className='linkBody'>
			<div className='titleContainer'>
				<h1 className='pageTitle'>Community page</h1>
			</div>
		</div>
	);
}

export default Community;