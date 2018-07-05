import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Archivo from '../Archivo/Archivo';

import axios from '../../shared/axios-fmcloud';

import classes from './Archivos.css';

import Table from '../UI/Table/Table';

class Archivos extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		axios.get('files/bycarpeta/'+this.props.match.params.idCarpeta)
			.then(response => {
				console.log('mi data',response.data.data)
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
			<span>
		    	<Link to={'/sedes/'+this.props.match.params.idSede+'/'+this.props.match.params.idCarpeta+'/ingresar'}><button className={classes.Add}>Ingresar archivo</button></Link>
		    	<Link to={'/sedes/'+this.props.match.params.idSede}><button className={classes.Regresar}>Regresar</button></Link>
			</span>);
		const headers = [
			'Nombre',
			'Tipo',
			'Fecha de creación',
			'Version',
			'Ult. modificacion',
			''
		];
		let rows = null;
		if(this.state.data!==null)
			rows = this.state.data.map(item => (<Archivo
												key={item._id}
												_id={item._id}
												name={item.name}
										        type={item.tipo}
										        version={item.version}
										        ultima_modif={item.ultima_modif}
										        fecha={item.fecha}
												recargar={this.cargarData}/>));
		return (<div className={classes.Archivos}>
	    	<div className={classes.contentdetails}>
				{localStorage.getItem('tipo_user')=="basico"?null:boton}
		    	<div className={classes.contenttwo}>
		    	<Table 
		    		headers={headers}
		    		rows={rows} />
		    	</div>
	        </div>
	    </div>);
	}
}

export default Archivos;