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
		axios.get('carpetas/bysede/'+localStorage.getItem('sedes'))
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
    		<Link to="sedes/carpetas/ingresar"><button className={classes.Add}>Crear nueva carpeta</button></Link>
	    		{rows}
        	</div>
	    </div>);
	}
}

export default Carpetas;