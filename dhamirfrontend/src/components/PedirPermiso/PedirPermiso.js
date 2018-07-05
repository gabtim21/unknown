import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';

import Permiso from '../Permiso/Permiso';
import Table from '../UI/Table/Table';

class PedirPermiso extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		axios.get('files/bycarpeta/'+this.props.match.params.idCarpeta)
			.then(response => {
				console.log('mis files',response.data.data)
				this.setState({
					data: response.data.data
				});
			})
			.catch(err => {
				alert('No tiene documentos')
			})
	}
	render(){
		let boton = (
	    	<Link to={'/sedes/'+this.props.match.params.idSede+'/'+this.props.match.params.idCarpeta+'/ingresar'}><button className={classes.Add}>Ingresar archivo</button></Link>
			);
		let botonBasico = (
	    	<Link to={'/sedes/'+this.props.match.params.idCarpeta+'/permiso'}><button className={classes.Add}>Pedir permisos</button></Link>
			);
		const headers = [
			'Nombre',
			'Tipo',
			'Fecha de creación',
			'Version',
			'Acciones'
		];
		let rows = null;
		if(this.state.data!==null)
			rows = this.state.data.map(item => (
				<Permiso
					key={item._id}
					_id={item._id}
					name={item.name}
			        type={item.tipo}
			        version={item.version}
			        fecha={item.fecha}
			        idCarpeta={this.props.match.params.idCarpeta}
					recargar={this.cargarData}/>));
		return (<div className={classes.Archivos}>
	    	<div>
		    	<Table 
		    		headers={headers}
		    		rows={rows} />
	        </div>
	    </div>);
	}
}

export default PedirPermiso;