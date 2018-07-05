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
		axios.get('carpetas/bysede/'+this.props.match.params.idSede)
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
		let boton = (<Link to={'/sedes/'+this.props.match.params.idSede+'/ingresar'}><button className={classes.Add}>Crear nueva carpeta</button></Link>);
		let rows = null;
		if(this.state.data!==null)
			rows = this.state.data.map(item => (<Carpeta
												key={item._id}
												_id={item._id}
												sede={this.props.match.params.idSede}
												name={item.name}
												description={item.description}
												recargar={this.cargarData}/>));
		return (<div className={classes.Archivos}>
	    	<div className={classes.content_box}>
				{localStorage.getItem('tipo_user')=="alto"?boton:null}
	    		{rows}
        	</div>
	    </div>);
	}
}

export default Carpetas;