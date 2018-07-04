const path = require('path');
const fs = require('fs');

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
		const data = {
			...req.body
		}
		console.log('mi data',data)
		var sede = new Sede(data);
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
	},

	upload: (req,res,next) =>{
		const sedeId = req.params.id;
		const file_name = 'No sube..';
		console.log(req.files);
		if(req.files){
			
			const file_path = req.files.imagen.path;
			const file_split = file_path.split('\\');
			const file_name = file_split[2];

			const ext_split = file_name.split('\.');
			const file_ext = ext_split[1];

			if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
				Sede.findByIdAndUpdate(sedeId, {imagen: file_name},(err, sedeUpdate) => {
					if(!sedeUpdate){
						res.status(404).json({
							message: 'No se actualizo el usuario'
						});
					}else{
						res.status(200).json({
							sede: sedeUpdate
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
		const path_file = './uploads/sedes/'+imageFile;
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