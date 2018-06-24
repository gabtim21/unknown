import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import Classes from './Login.css';

class Login extends Component {

	state = {
		email: '',
		password: '',
		submitted: false
	}

	postDataHandler = () => {
		const data = {
			email: this.state.email,
			password: this.state.password,
			submitted: true
		};
	}

	render() {
		let redirect = null;
		if(this.state.submitted){
			redirect = <Redirect to='/' />;
		}
	    return (
			<div className={Classes.Login}>
				{redirect}
				<div className={Classes.Form}>
					<h1>Bienvenido.</h1>
					<div className={Classes.Div}>
						<label>Usuario: </label>
						<input
							type='email' value={this.state.email} 
							onChange={( event ) => this.setState({email: event.target.value})} />
					</div>
					<div className={Classes.Div}>
						<label>Password: </label>
						<input
							type='password' value={this.state.password} 
							onChange={( event ) => this.setState({password: event.target.value})} />
					</div>
					<button onClick={this.postDataHandler}>Ingresar</button>
				</div>
			</div>
	    );
	}
}

export default Login;