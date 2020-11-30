import React, { useState, useContext } from 'react';
import './style.css';
import { Button } from './button';
import UserContext from '../context/UserContext';

function Recordings(){

	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	const {userData} = useContext(UserContext);

	return(
		<div className='linkBody'>
			<div className='titleContainer'>
				<h1 className='pageTitle'>Recordings</h1>
			</div>
		</div>
	);
}

export default Recordings;
