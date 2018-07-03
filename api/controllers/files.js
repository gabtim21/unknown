const path = require('path');
const fs = require('fs');

const Sede = require('../models/sedes.js');
const Carpeta = require('../models/carpetas.js');
const Archivo = require('../models/files.js');

const exposedFields = [
	'name',
	'tipo',
	'fecha',
	'file',
	'version',
	'ultima_modif',
	'carpetas'
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
		console.log('otro',req.file)
		const data = {
			...req.body, 
			file: req.files.file.path
		}
		console.log('mi data',data)
		var archivo = new Archivo(data);
		archivo
			.save()
			.then(result => {
				res.status(200).json({
					message: 'Archivo creado con exito',
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
		Archivo.find().sort('fecha')
			.select(exposedFields.join(' ')).populate({
				path: 'carpetas',
				populate:{
					path: 'sedes',
					model: 'sedes'
				}
			})
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
		Archivo.findById(id).populate({
			path: 'carpetas',
			populate:{
				path: 'sedes',
				model: 'sedes'
			}
		})
			.exec()
			.then(doc => {
				if(doc){
					res.status(200).json({
						data: doc['_doc'],
					});
				}else{
					res.status(404).json({message: 'El Archivo no se encontro'});
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
		Archivo.update({_id: id}, {$set: updateParams})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Archivo actualizado correctamente',
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
		Archivo.remove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					message: 'Archivo Eliminada'
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
		const fileId = req.params.id;

		console.log(req.files);
		if(req.files){

			const file_path = req.files.file.path;
			const file_split = file_path.split('\\');
			const file_name = file_split[2];

			const ext_split = file_name.split('\.');
			const file_ext = ext_split[1];

			if(file_ext == 'doc' || file_ext == 'docx' || file_ext == 'pdf' || file_ext == 'xls' || file_ext == 'png' || file_ext == 'jpg'){
				Archivo.findByIdAndUpdate(fileId, {file: file_name},(err, fileUpdate) => {
					if(!fileUpdate){
						res.status(404).json({
							message: 'No se actualizo el archivo'
						});
					}else{
						res.status(200).json({
							file: fileUpdate
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
				message: 'No se subio el archivo'
			});
		}

	},

	getImagen: (req,res,next) => {
		const imageFile = req.params.imageFile;
		const path_file = './uploads/files/'+imageFile;
		fs.exists(path_file, (exists) => {
			if(exists){
				res.sendFile(path.resolve(path_file));
			}else{
				res.status(200).json({
					message: 'No existe el archivo'
				});
			}
		});
	}
}

//subString(0,10)
