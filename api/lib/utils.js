const jwt = require('jsonwebtoken');
const secret = 'clave_secreta';

module.exports = {
	generateToken: user => {
		const u = {
			_id: user._id,
			name: user.name,
			email: user.email,
			tipo_user: user.tipo_user,
			imagen: user.imagen
		};
		return token = jwt.sign(u, secret, {
			expiresIn: 60 * 60 * 24
		});
	},
	verifyToken: token => {
		return new Promise((resolve,reject) => {
			jwt.verify(token, secret, (err,user)=> {
				if (err) {
					reject(err);
				}
				resolve(user);
			});
		});
	},
	getCleanUser: user => {
		const { age, createdAt, updatedAt, __v, ...exposedData } = user;
		return exposedData;
	}
}