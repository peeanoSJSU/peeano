import React, { useState, useContext } from 'react';
import './style.css';
import UserContext from '../context/UserContext';
import { Button } from './button';


function Recordings(){

	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true)

	const handleClick = () => setClick(!click);

	return(
		<div className='recordinglinkBody'>
		        <div className='recordingBlock'>
		        	<h1 className='titleBlock'>SampleUser Recordings</h1>
		        	<ul className='unlist'>
		        		<li onClick={handleClick}>
		        			<p1>Recording 1 <i className={click ? 'fas fa-pause-circle fa-fw fa-fw' : 'fas fa-play-circle fa-fw fa-fw'} /></p1>
		        			
		        			<ul className='recordElementUl'>
		        				<li>
		        					<p1>C0___D0#___E1___G0___C1___A2___A2#___B2___C1</p1>
		        				</li>
		        				<li>
		        					<p1>424___569___643__734__904__1020__1044__1060__1088</p1>
		        				</li>
		        			</ul>

		        		</li>
		        		<li>
		        			<p1>Recording 2 <i className='fas fa-play-circle fa-fw fa-fw' /></p1>

		        			<ul className='recordElementUl'>
		        				<li>
		        					<p1>D2___D0#___E2___C2___C2#___E1___A2#___F2___G1___G1#___B1___F1</p1>
		        				</li>
		        				<li>
		        					<p1>245___295___332__354__385___431___474___542__595___620___690__730</p1>
		        				</li>
		        			</ul>

		        		</li>
		        		<li>
		        			<p1>Recording 3 <i className='fas fa-play-circle fa-fw fa-fw' /></p1>

		        			<ul className='recordElementUl'>
		        				<li>
		        					<p1>C0___E0___F1#___D1___C1</p1>
		        				</li>
		        				<li>
		        					<p1>502___543__599___623__645</p1>
		        				</li>
		        			</ul>

		        		</li>
		        		<li>
		        			<p1>Recording 4 <i className='fas fa-play-circle fa-fw fa-fw' /></p1>

		        			<ul className='recordElementUl'>
		        				<li>
		        					<p1>F2___C0#___G2___G1#___B1#___E1___D2#___G1___A1___G1#___A2___C1___C2__</p1>
		        				</li>
		        				<li>
		        					<p1>346___392___422__456___485___520___560___590___620___690___700__740__830</p1>
		        				</li>
		        				<li>
		        					<p1>F2___C0#___G2___G1#</p1>
		        				</li>
		        				<li>
		        					<p1>869___900___940__993</p1>
		        				</li>
		        			</ul>

		        		</li>
		        	</ul>
		        </div>

		</div>
	);
}

export default Recordings;