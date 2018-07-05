import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import axios from '../../shared/axios-fmcloud';

import classes from './Archivos.css';

import Archivo from '../Archivo/Archivo';
import Table from '../UI/Table/Table';

class Archivos extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		if(localStorage.getItem('tipo_user')=="basico"){
			axios.get('permisos/byuser/'+localStorage.getItem('id')+'/'+this.props.match.params.idCarpeta)
				.then(response => {
					console.log('mis permisos',response.data.data)
					this.setState({
						data: response.data.data
					});
				})
				.catch(err => {
					alert('No tiene documentos')
				})
		} else {
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
	}
	render(){
		let boton = (
			<span>
		    	<Link to={'/sedes/'+this.props.match.params.idSede+'/'+this.props.match.params.idCarpeta+'/ingresar'}><button className={classes.Add}>Ingresar archivo</button></Link>
		    	<Link to={'/sedes/'+this.props.match.params.idSede}><button className={classes.Regresar}>Regresar</button></Link>
			</span>
			);
		let botonBasico = (
	    	<Link to={'/sedes/'+this.props.match.params.idCarpeta+'/permiso'}><button className={classes.Add}>Pedir permisos</button></Link>
			);
		const headers = [
			'Nombre',
			'Tipo',
			'Fecha de creación',
			'Version',
			'Ult. modificacion',
			'Acciones'
		];
		let rows = null;
		if(this.state.data!==null){
			if(localStorage.getItem('tipo_user')=="basico"){
				rows = this.state.data.map(item => (
					<Archivo
						key={item.file._id}
						_id={item.file._id}
						name={item.file.name}
				        type={item.file.tipo}
				        version={item.file.version}
				        ultima_modif={item.file.ultima_modif}
				        fecha={item.file.fecha}
				        permisos={item.permisos}
						recargar={this.cargarData}/>));		
			} else {
				rows = this.state.data.map(item => (
					<Archivo
						key={item._id}
						_id={item._id}
						name={item.name}
				        type={item.tipo}
				        version={item.version}
				        ultima_modif={item.ultima_modif}
				        fecha={item.fecha}
						recargar={this.cargarData}/>));		
			}
		}


		return (<div className={classes.Archivos}>
	    	<div className={classes.contentdetails}>
				{localStorage.getItem('tipo_user')=="basico"?botonBasico:boton}
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