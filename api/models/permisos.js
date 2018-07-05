const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permisoSchema = new Schema({

	usuario: {
		type	: Schema.ObjectId,
		ref		: 'users',
		required: true
	},
	file: {
		type	: Schema.ObjectId,
		ref		: 'files',
		required: true
	},
	//descargar es basico, es decir vista|subir también permite descargar|eliminar permite todos los anteriores
	permisos: {
		type	: String,
		required: true,
		enum	: ['descargar','subir','eliminar']
	}
}, {timestamps: true});

const permisoModel = mongoose.model('permisos', permisoSchema);

module.exports = permisoModel;