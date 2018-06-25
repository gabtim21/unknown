import React,{Component} from 'react';
import Usuario from '../Usuario/Usuario';

import axios from '../../shared/axios-fmcloud';

import classes from '../Archivos/Archivos.css';

import Table from '../UI/Table/Table';

class Usuarios extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		axios.get('user')
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
		const headers = [
			'Nombre',
			'DNI',
			'Celular',
			'Email',
			'Acciones'
		];

		let rows = null;
		if(this.state.data!==null)
			rows = this.state.data.map(item => (<Usuario
												key={item._id}
												name={item.name}
												dni={item.dni}
												cel={item.cel}
												email={item.email}/>));
		return (<div className={classes.Archivos}>
	    	<div>
		    	<Table 
		    		headers={headers}
		    		rows={rows} />
	        </div>
	    </div>);
	}
}

export default Usuarios;