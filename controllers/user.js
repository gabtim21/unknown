const User = require('../models/user.js');
const utils = require('../lib/utils.js');

const exposedFields = [
	
	'name',
	'email',
	'imagen',
	'dni',
	'password',
	'cel'
];

module.exports = {
	signup: (req,res,next)=>{
		var user = new User({
			...req.body
		});
		user
			.save()
			.then(result => {
				const token = utils.generateToken({
					_id: result['_doc']['_id'],
					name: result['_doc']['name'],
					username: result['_doc']['username'],
					email: result['_doc']['email']
				});
				const exposedData = utils.getCleanUser(result['_doc']);
				res.status(200).json({
					message: 'User succesfully signup!',
					data: exposedData,
					token: token
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	signin: (req,res,next) => {
		User
			.findOne({email: req.body.email})
			.select(exposedFields.join(' ')+' password')
			.exec((err,user) => {
				if(err) res.status(500).json(err);
				if(!user){
					return res.status(401).json({
						error: true,
						message: 'Username or Password is wrong'
					});
				}
				user.comparePassword(req.body.password)
					.then(valid => {
						if(!valid){
							return res.status(401).json({
								error: true,
								message: 'Username or Password is wrong'
							});
						}
						res.json({
							message: 'User succesfully logged!',
							data: user,
							token: utils.generateToken(user)
						});
					})
					.catch(err => {
						res.status(500).json(err);
					});
			});
	},

	find: (req,res,next)=>{
		User.find()
			.select(exposedFields.join(' '))
			.exec()
			.then(docs => {
				const response = {
					count: docs.length,
					data: docs.map(doc => {
						return {
							...doc['_doc']
						};
					})
				};
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	findOne: (req,res,next) => {
		const id = req.params.id;
		Plan.findById(id)
			.exec()
			.then(doc => {
				if (doc) {
					res.status(200).json({
						data: doc['_doc'],
					});
				}else{
					res.status(404).json({message: 'No valid entry found for provided ID'});
				}
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	create: (req,res,next)=>{
		var user = new User({
			...req.body
		});
		user
			.save()
			.then(result => {
				res.status(200).json({
					message: 'User succesfully created!',
					data:{
						...result['doc']
					}
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	update: (req,res,next) => {
		const id = req.params.id;
		let updateParams = {
			...req.body
		};
		User.update({_id: id},{$set: updateParams})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'User updated!',
					data: result['_doc']
				});
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error:err
				});
			});
	},
	delete: (req,res,next) => {
		const id = req.params.id;
		User.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'User deleted!'
				});
			})
			.catch(err =>{
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	upload: (req,res,next) =>{
		const userId = req.params.id;
		const file_name = 'No sube..';
		console.log(req.files);
		if(req.files){
			
			const file_path = req.files.imagen.path;
			const file_split = file_path.split('\\');
			const file_name = file_split[2];

			const ext_split = file_name.split('\.');
			const file_ext = ext_split[1];

			if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
				User.findByIdAndUpdate(userId, {imagen: file_name},(err, userUpdate) => {
					if(!userUpdate){
						res.status(404).json({
							message: 'No se actualizo el usuario'
						});
					}else{
						res.status(200).json({
							user: userUpdate
						});
					}
				});
			}else{
				res.status(200).json({
					message: 'La extencion del archivo no es valida'
				});
			}
		}else{
			res.status(200).json({
				message: 'No se subio ninguna imagen'
			});
		}
		
	},

	getImagen: (req,res,next) => {
		const imageFile = req.params.imageFile;
		const path_file = './uploads/users/'+imageFile;
		fs.exists(path_file, (exists) => {
			if(exists){
				res.sendFile(path.resolve(path_file));
			}else{
				res.status(200).json({
					message: 'No existe la imagen'
				});
			}
		});
	}
};