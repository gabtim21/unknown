import React,{Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import Sede from '../Sede/Sede';

import axios from '../../shared/axios-fmcloud';

import classes from '../Sede/Sede.css';
import saludo from '../../assets/saludo.GIF';


class Sedes extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		if(localStorage.getItem('tipo_user')=="alto"){
			axios.get('sedes')
				.then(response => {
					console.log('mi response', response.data.data);
					this.setState({
						data: response.data.data
					});
					console.log('mi data',this.state.data);
				})
				.catch(err => {
					console.log('error',err)
				});
		} else {
			axios.get('sedes/'+localStorage.getItem('sedes'))
				.then(response => {
					console.log('mi response', response.data.data);
					this.setState({
						data: response.data.data
					});
					console.log('mi data',this.state.data);
				})
				.catch(err => {
					console.log('error',err)
				});
		}
	}
	render(){

		let boton = (<Link to="/sedes/ingresar"><button className={classes.Add}>Crear nueva sede</button></Link>);
		let rows = null;
		if(this.state.data!==null){
			if(localStorage.getItem('tipo_user')=="alto"){
				rows = this.state.data.map(item =>(<Sede
												key={item._id}
												_id={item._id}
												name={item.name}
												description={item.description}
												recargar={this.cargarData}/>));
			} else {
				rows = (<Sede
					key={this.state.data._id}
					_id={this.state.data._id}
					name={this.state.data.name}
					description={this.state.data.description}
					recargar={this.cargarData}/>);
			}
		}
		
		return (<div className={classes.Sedes}>

	    	<div className={classes.contentdetails}>
	    	{localStorage.getItem('tipo_user')=="alto"?boton:null}
			{rows}
    		
	    		
        	</div>
	    </div>);
	}
}

export default Sedes;