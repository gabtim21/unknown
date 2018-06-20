/*const path = require('path');
const fs = require('fs');*/

const Sede = require('../models/sedes.js');
const Carpeta = require('../models/carpetas');
const File = require('../models/files');

const exposedFields = [
	'name',
	'description',
	'imagen'
];

/*function saveSede(req,res){
	var sede = new Sede();
	var params = req.body;

	sede.name = params.name;
	sede.description = params.description;
	sede.imagen = 'NULL';

	sede.save((err, sedeStored) =>{
		if(err){
			res.status(500).send({message: 'Erro Gabtimm'});
		}else{
			if(!sedeStored){
				res.status(404).send({message: 'No fue guardado'});
			}else{
				res.status(200).send({sede: sedeStored});
			}
		}
	});
	

}*/

module.exports = {
	create : (req,res,next) => {
		var sede = new Sede({
			...req.body
		});
		sede
			.save()
			.then(result => {
				res.status(200).json({
					message: 'Sede creada con exito',
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
		Sede.find()
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
	findOne: (req, res, next) => {
		const id = req.params.id;
		Sede.findById(id)
			.exec()
			.then(doc => {
				if(doc){
					res.status(200).json({
						data: doc['_doc'],
					});
				}else{
					res.status(404).json({message: 'El usuario no se encontro'});
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
		Sede.update({_id: id}, {$set: updateParams})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Sede actualizada correctamente',
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
		Sede.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Sede Eliminada'
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