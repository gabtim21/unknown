const jwt = require('jsonwebtoken');
const secret = 'clave_secreta';

const utils = require('../lib/utils');

module.exports={
	refreshToken: (req,res,next) => {
		
		var token = req.body.token || req.query.token;
		if (!token) {
			return res.status(401).json({ message: 'Must pass token'});
		}

		utils.verifyToken(token)
			.then(user => {

				User.findById({
					'_id': user._id
				}, function(err, user) {
					if (err) throw err;

					const exposedData = utils.getCleanUser(user['_doc']);
					const newToken = utils.generateToken(exposedData);

					res.status(200).json({
						user: exposedData,
						token: newToken
					});
				});
			})
			.catch(err => {
				res.status(500).json(err);
			});
	},
	verifyToken: (req,res,next) => {
		const token = req.headers['authorization'];
		if (!token) res.status(401).json({
			error: true,
			message: 'Please register Log in using a valid email to submit posts'
		});
		utils.verifyToken(token)
			.then(function(user){

				req.user = user;
				next();
			})
			.catch(function(err){
				console.log(err)
				res.status(500).json({
					error: err
				});
			});
	}
}
