import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { Button } from './button';

import AuthOptions from './auth/AuthOptions.js';


function Navbar(){
	const [click, setClick] = useState(false);
	const [button, setButton] = useState(true)


	const handleClick = () => setClick(!click);
	const closeMobileMenu = () => setClick(false);

	const showButton = () => {

		if(window.innerWidth <= 960) {
			setButton(false);
		} else {
			setButton(true);
		}
	};

	useEffect(() =>
	{
		showButton()
	}, [])

	window.addEventListener('resize', showButton);

	return(
		<>
			<nav className='mainnavbar'>
				<div className='mainnavbar-container'>


					<Link to='/' className='mainnavbar-title' onClick={closeMobileMenu}>
						PEEANO <i className='fas fa-headphones-alt fa-fw' />
					</Link>

					<block className='menu-icon' onClick={handleClick}>
						<i className={click ? 'fas fa-times' : 'fas fa-bars'} />
					</block>
					<ul className={click ? 'mainnav-menu active' : 'mainnav-menu'}>

						<li className='mainnav-item'>
							<Link to='/' className='mainnav-links' onClick={closeMobileMenu}>
								Home <i className='fas fa-music fa-fw' />
							</Link>
						</li>

						<li className='mainnav-item'>
							<Link to='/recordings' className='mainnav-links' onClick={closeMobileMenu}>
								Recordings <i className='fas fa-play-circle fa-fw fa-fw' />
							</Link>
						</li>

						{/* <li className='mainnav-item'>
							<Link to='/login' className='mainnav-links' onClick={closeMobileMenu}>
								Login <i className='fas fa-user fa-fw' />
							</Link>
						</li>

						<li className='mainnav-item'>
							<Link to='/signup' className='mainnav-links-mobile' onClick={closeMobileMenu}>
								Sign Up <i className='fas fa-edit fa-fw' />
							</Link>
						</li> */}

						<AuthOptions />

					</ul>
					{/* {button && <Button buttonStyle='btn--outline'>Sign Up <i className='fas fa-edit fa-fw' /> </Button>} */}
					</div>
			</nav>
		</>
	);
}

export default Navbar;
