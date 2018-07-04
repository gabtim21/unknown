import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Sede from '../Sede/Sede';

import axios from '../../shared/axios-fmcloud';

import classes from '../Sede/Sede.css';


class Sedes extends Component{
	state = {
		data: null
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		axios.get('sedes')
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
			rows = this.state.data.map(item => (<Sede
												key={item._id}
												_id={item._id}
												imagen={item.imagen}
												name={item.name}
												description={item.description}
												recargar={this.cargarData}/>));
		return (<div className={classes.Sedes}>
	    	<div className={classes.content_box}>
    		<Link to="/sedes/ingresar"><button className={classes.Add}>Crear nueva sede</button></Link>
	    		{rows}
        	</div>
	    </div>);
	}
}

export default Sedes;