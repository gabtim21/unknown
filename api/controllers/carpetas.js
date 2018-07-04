const path = require('path');
const fs = require('fs');

const Sede = require('../models/sedes.js');
const Carpeta = require('../models/carpetas.js');
const File = require('../models/files.js');

const exposedFields = [
	'name',
	'description',
	'fecha',
	'sedes'
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
		const data = {
			...req.body
		}
		var carpeta = new Carpeta(data);
		carpeta
			.save()
			.then(result => {
				res.status(200).json({
					message: 'Carpeta creada con exito',
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
		Carpeta.find().sort('fecha')
			.select(exposedFields.join(' ')).populate({path: 'sedes'})
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
	findBySede: (req,res,next) => {
		const id = req.params.id;
		Carpeta.find({sedes: id}).sort('fecha')
			.select(exposedFields.join(' ')).populate({path: 'sedes'})
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
		Carpeta.findById(id).populate({path: 'sedes'})
			.exec()
			.then(doc => {
				if(doc){
					res.status(200).json({
						data: doc['_doc'],
					});
				}else{
					res.status(404).json({message: 'La carpeta no se encontro'});
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
		Carpeta.update({_id: id}, {$set: updateParams})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Carpeta actualizada correctamente',
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
		Carpeta.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Carpeta Eliminada'
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},

	upload: (req,res,next) =>{
		const carpetaId = req.params.id;
		const file_name = 'No sube..';
		console.log(req.files);
		if(req.files){
			
			const file_path = req.files.imagen.path;
			const file_split = file_path.split('\\');
			const file_name = file_split[2];

			const ext_split = file_name.split('\.');
			const file_ext = ext_split[1];

			if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
				Carpeta.findByIdAndUpdate(carpetaId, {imagen: file_name},(err, carpetaUpdate) => {
					if(!carpetaUpdate){
						res.status(404).json({
							message: 'No se actualizo el usuario'
						});
					}else{
						res.status(200).json({
							carpeta: carpetaUpdate
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
		const path_file = './uploads/carpetas/'+imageFile;
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
}