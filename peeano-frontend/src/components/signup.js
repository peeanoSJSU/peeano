import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import './LoginSignupStyles.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Signup() {

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const {setUserData} = useContext(UserContext);
	const history = useHistory();

	const submit = async (e) => { // Form requires button to be pressed twice to submit?
		e.preventDefault();
		const newUser = {
			username,
			password
		}

		const createUser = await axios.post('http://localhost:3001/signup', newUser);
		if (createUser.data.addedNewUser) {
			history.push("/");
		}

		/** All the auto-login stuff */
		// const loginRes = await axios.post('http://localhost:3001/login', {
		// 	username,
		// 	password
		// });
		// setUserData({
		// 	token: loginRes.data.token,
		// 	user: loginRes.data.user
		// });
		// localStorage.setItem("auth-token", loginRes.data.token);
		// history.push('/successsignup');

	};


	const classes = useStyles();
	return (
		<div>
			{/* <form onSubmit={submit}>
				<input type="text" id="signup-username" onChange={(e) => setUsername(e.target.value)}></input>
				<input type="password" id="signup-password" onChange={(e) => setPassword(e.target.value)}></input>

				<input type="submit" value="Sign Up"></input>
			</form> */}
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} onSubmit={submit} noValidate>
						<Grid container spacing={2}>
							{/* <Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
								/>
							</Grid> */}
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Username"
									name="username"
									autoComplete="username"
									onChange={(e) => setUsername(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={(e)=> setPassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">

						</Grid>
					</form>
				</div>
				<Box mt={5}>
				</Box>
			</Container>
		</div>
	)
}
