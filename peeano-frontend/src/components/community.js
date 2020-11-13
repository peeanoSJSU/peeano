import React, { useState } from 'react';
import './style.css';
import { Button } from './button';

function Community(){

	const [click, setClick] = useState(false);
	const handleClick = () => setClick(!click);

	return(
		<div className='linkBody'>

			<div className='titleContainer'>
				<h1 className='pageTitle'>Welcome to the community page</h1>
			</div>

			<div  className='container'>
				<ul className='unlist'>
					<li>
						<div onClick={handleClick}>
							Recording 1, Username <span className='space'> <i className={click ? 'far fa-play-circle fa-fw' : 'far fa-pause-circle fa-fw'} /> </span>
						</div>
					</li>

					<li>
						<div onClick={handleClick}>
							Recording 2, Username <span className='space'> <i className={click ? 'far fa-play-circle fa-fw' : 'far fa-pause-circle fa-fw'} /> </span>
						</div>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Community;



					/*<li>
						Recording 2, Username 
						
						<Button className='notCrazy'>
							<i className='far fa-play-circle'/>
						</Button>
					</li>
					
					<li>
						Recording 3, Username 
						
						<Button className='notCrazy'>
							<i className='far fa-play-circle'/>
						</Button>
					</li>

					<li>
						Recording 4, Username 
						
						<Button className='notCrazy'>
							<i className='far fa-play-circle'/>
						</Button>
					</li>

					<li>
						Recording 5, Username 
						
						<Button className='notCrazy'>
							<i className='far fa-play-circle'/>
						</Button>
					</li>*/