import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import Spinner from '../UI/Spinner/Spinner';
import Input from '../UI/Input/Input';
import Classes from '../Login/Login.css';

import {updateObject, checkValidity} from '../../shared/utility';

class FormularioArchivo extends Component{
	state = {
		archivoForm: {
			name:{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeHolder: 'Nombre del archivo'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			tipo:{
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeHolder: 'Tipo (.docx .pdf etc)'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			fecha:{
				elementType: 'input',
				elementConfig: {
					type: 'date',
					placeHolder: 'Telefono / Celular'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			file:{
				elementType: 'input',
				elementConfig: {
					type: 'file',
					placeHolder: 'Ingresa el archivo'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
			},
			ultima_modif:{
				elementType: 'input',
				elementConfig: {
					type: 'date',
					placeHolder: 'Ultima modificacion'
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
		console.log('entra aca')
		event.preventDefault();
		const formData = new FormData();
		for (let formElementIdentifier in this.state.archivoForm){
			formData.append(formElementIdentifier,this.state.archivoForm[formElementIdentifier].value);
		}
		console.log(formData);
		this.setState({loading: true, error: false});
		axios.post('files', formData)
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
		const updatedFormElement = updateObject(this.state.archivoForm[inputIdentifier], {
			value: inputIdentifier=='file'?event.target.files[0]:event.target.value,
			valid: checkValidity(event.target.value, this.state.archivoForm[inputIdentifier].validation),
			touched: true
		});
		const updatedloginForm = updateObject(this.state.archivoForm,{
			[inputIdentifier]: updatedFormElement
		});

		let formIsValid = true;
		for (let inputIdentifier in updatedloginForm) {
			formIsValid = updatedloginForm[inputIdentifier].valid && formIsValid;
		}
		this.setState({archivoForm: updatedloginForm, formIsValid: formIsValid});
	}

	render(){
		const formElementsArray = [];
		for (let key in this.state.archivoForm){
			formElementsArray.push({
				id: key,
				config: this.state.archivoForm[key]
			});
		}
		let form = (
			<div className={Classes.Login}>
			<form className={Classes.Form} onSubmit={this.submitHandler}>
			<h4>Ingresa los datos requeridos para poder subir un archivo.</h4>
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
				<button className={Classes.Login} disabled={!this.state.formIsValid}>Ingresar archivo</button>
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
			authRedirect = (<Redirect to={'/archivos'} />);
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

export default FormularioArchivo;