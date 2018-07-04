import React,{Component} from 'react';
import { Redirect, Link } from 'react-router-dom';
import Sede from '../Sede/Sede';

import axios from '../../shared/axios-fmcloud';

import classes from '../Sede/Sede.css';


class Sedes extends Component{
	state = {
		data: null,
		//count: 0
	}
	componentDidMount(){
		this.cargarData()
	}
	cargarData = () => {
		//POR AHORA solamente se puede estar unido a una sede pOR AHORA;;
		if(localStorage.getItem('tipo_user')=="alto"){
			axios.get('sedes')
				.then(response => {
					console.log('mi response', response.data.data);
					this.setState({
						data: response.data.data,
						//count: this.state.count + 1
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
						data: response.data.data,
						//count: this.state.count + 1
					});
					console.log('mi data',this.state.data);
				})
				.catch(err => {
					console.log('error',err)
				});
		}
	}
	render(){
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
		} /*else {
			alert('No tienes sedes')
			return <Redirect to={'/logout'} />
		}*/
		
		return (<div className={classes.Sedes}>
	    	<div className={classes.content_box}>
    		<Link to="/sedes/ingresar"><button className={classes.Add}>Crear nueva sede</button></Link>
	    		{rows}
        	</div>
	    </div>);
	}
}

export default Sedes;