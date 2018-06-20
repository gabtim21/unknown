const path = require('path');
const fs = require('fd');

const Sede = require('../models/user');
const Carpeta = require('../models/carpetas');
const File = require('../models/files');

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
		
	}
}