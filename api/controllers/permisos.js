const path = require('path');
const fs = require('fs');

const Permiso = require('../models/permisos.js');
const Archivo = require('../models/files.js');

const exposedFields = [
	'usuario',
	'file',
	'permisos'
];

module.exports = {
	create : (req,res,next) => {
		const data = {
			...req.body
		}
		console.log('mi data',data)
		var permiso = new Permiso(data);
		permiso
			.save()
			.then(result => {
				res.status(200).json({
					message: 'Permiso creado con exito',
					data: {
						...result['_doc']
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
	find: (req,res,next) => {
		Permiso.find()
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
				console.log('mi data', response);
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});	
	},
	//busca todos los permisos de un usuario
	findByUser: (req,res,next) => {
		const id = req.params.id;
		Permiso.find({usuario: id})
			.select(exposedFields.join(' ')).populate('file carpeta')
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
	//busca todos los permisos de un usuario dentro de una carpeta
	findByUserCarpeta: (req,res,next) => {
		const idUser = req.params.idUser;
		const idCarpeta = req.params.idCarpeta;
		Permiso.find({"usuario": idUser}, {"file.carpeta": idCarpeta})
			.select(exposedFields.join(' ')).populate('file')
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
	findOne: (req, res, next) => {
		const id = req.params.id;
		Permiso.findById(id).populate('usuario file')
			.exec()
			.then(doc => {
				if(doc){
					res.status(200).json({
						data: doc['_doc'],
					});
				}else{
					res.status(404).json({message: 'El permiso no se encontro'});
				}
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
		Permiso.update({_id: id}, {$set: updateParams})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Permiso actualizado correctamente',
					data: result['_doc']
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	delete: (req,res,next) => {
		const id = req.params.id;
		Permiso.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Permiso eliminado'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}
}