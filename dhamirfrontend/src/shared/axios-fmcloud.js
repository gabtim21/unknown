import axios from 'axios';

const instance = axios.create({
	baseURL: 'http://35.237.186.173/',
	headers: {
		'Authorization': localStorage.getItem('token')
	}
});

export default instance;