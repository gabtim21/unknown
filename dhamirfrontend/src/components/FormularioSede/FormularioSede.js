import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import Classes from '../Login/Login.css';

import {updateObject, checkValidity} from '../../shared/utility';

class FormularioSede extends Component{
	state = {
		sedeForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeHolder: 'Nombre'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			description: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeHolder: 'Descripcion'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			image: {
				elementType: 'input',
				elementConfig: {
					type: 'file',
					placeHolder: 'Imagen sede'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			}
		},
		error: false,
		loading: false,
		formIsValid: false,
		isAuthenticated: false
	}

	submitHandler = ( event ) => {
		event.preventDefault();
		const formData = new FormData();
		for (let formElementIdentifier in this.state.sedeForm){
			formData.append(formElementIdentifier,this.state.sedeForm[formElementIdentifier].value);
		}
		this.setState({loading: true, error: false});
		axios.post('sedes', formData)
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
		const updatedFormElement = updateObject(this.state.sedeForm[inputIdentifier], {
			value: inputIdentifier=='image'?event.target.files[0]:event.target.value,
			valid: checkValidity(event.target.value, this.state.sedeForm[inputIdentifier].validation),
			touched: true
		});
		const updatedloginForm = updateObject(this.state.sedeForm,{
			[inputIdentifier]: updatedFormElement
		});

		let formIsValid = true;
		for (let inputIdentifier in updatedloginForm) {
			formIsValid = updatedloginForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({sedeForm: updatedloginForm, formIsValid: formIsValid});
	}

	render(){
		const formElementsArray = [];
		for (let key in this.state.sedeForm){
			formElementsArray.push({
				id: key,
				config: this.state.sedeForm[key]
			});
		}
		let form = (
			<div className={Classes.Login}>
			<form className={Classes.Form} onSubmit={this.submitHandler}>
			<h4>Ingresa los datos pedidos</h4>
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
				<button className={Classes.Login} disabled={!this.state.formIsValid}>Crear sede</button>
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
			authRedirect = (<Redirect to={'/sedes'} />);
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

export default FormularioSede;