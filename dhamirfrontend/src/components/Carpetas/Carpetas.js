import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Carpeta from '../Carpeta/Carpeta';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';


class Carpetas extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		axios.get('carpetas')
			.then(response => {
				console.log('mi data',response.data.data)
				this.setState({
					data: response.data.data
				});
			})
			.catch(err => {
				alert('no funciona')
			})
	}
	render(){
		let rows = null;
		if(this.state.data!==null)
			rows = this.state.data.map(item => (<Carpeta
												key={item._id}
												_id={item._id}
												name={item.name}
												description={item.description}
												recargar={this.cargarData}/>));
		return (<div className={classes.Archivos}>
	    	<div className={classes.content_box}>
    		<Link to="/carpetas/ingresar"><button className={classes.Add}>Crear nueva carpeta</button></Link>
	    		{rows}
        	</div>
	    </div>);
	}
}

export default Carpetas;