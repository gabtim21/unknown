import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import Classes from '../Login/Login.css';	

import {updateObject, checkValidity} from '../../shared/utility';

class FormularioUsuario extends Component{
	state = {
		loginForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeHolder: 'Nombres Completos'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			dni: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeHolder: 'DNI'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			cel: {
				elementType: 'input',
				elementConfig: {
					type: 'number',
					placeHolder: 'Telefono / Celular'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			tipo_user: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeHolder: 'Tipo de Usuario'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeHolder: 'Email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeHolder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				valid: false,
				touched: false
			},
			imagen: {
				elementType: 'input',
				elementConfig: {
					type: 'file',
					placeHolder: 'icon'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
		},
		error: false,
		loading: false,
		formIsValid: false,
		isAuthenticated: false
	}

	submitHandler = ( event ) => {
		event.preventDefault();
		const formData = {};
		for (let formElementIdentifier in this.state.loginForm){
			formData[formElementIdentifier] = this.state.loginForm[formElementIdentifier].value;
		}
		this.setState({loading: true, error: false});
		axios.post('user/signup', formData)
			.then( response => {
				this.setState({
					loading: false,
					error: false,
					isAuthenticated: true
				});
			})
			.catch( error => {
				this.setState({
					loading: false,
					error: error.response.data
				});
			});
	}

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedFormElement = updateObject(this.state.loginForm[inputIdentifier], {
			value: event.target.value,
			valid: checkValidity(event.target.value, this.state.loginForm[inputIdentifier].validation),
			touched: true
		});
		const updatedloginForm = updateObject(this.state.loginForm,{
			[inputIdentifier]: updatedFormElement
		});

		let formIsValid = true;
		for (let inputIdentifier in updatedloginForm) {
			formIsValid = updatedloginForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({loginForm: updatedloginForm, formIsValid: formIsValid});
	}

	render(){
		const formElementsArray = [];
		for (let key in this.state.loginForm){
			formElementsArray.push({
				id: key,
				config: this.state.loginForm[key]
			});
		}
		let form = (
			<div className={Classes.Login}>
			<form className={Classes.Form} onSubmit={this.submitHandler}>
			<h4>Ingresa los datos pedidos y agrega un nuevo usuario</h4>
				{formElementsArray.map(formElement => (
					<div className={Classes.Div}>
					<Input
						key={formElement.id}
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}
						changed={(event) => this.inputChangeHandler(event, formElement.id)} />
					</div>))}
				<button className={Classes.Login} disabled={!this.state.formIsValid}>Crear usuario</button>
			</form>
			</div>
			);

		if( this.state.loading ){
			form = <Spinner />;
		}
		let errorMessage = null;

		if (this.state.error ){
			errorMessage = (
				<p>{this.state.error.message}</p>
			);
		}
		let authRedirect = null;
		if ( this.state.isAuthenticated ){
			authRedirect = (<Redirect to={'/usuarios'} />);
		}
		return (
			<div>
				{authRedirect}
				{errorMessage}
				{form}
			</div>
		);
	}
}

export default FormularioUsuario;