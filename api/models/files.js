const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filesSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		match: [/^[a-zA-Z0-9]+$/, 'File invalida'],
		index: true,
		unique: true
	},

	tipo: {
		type: String,
		enum: ['doc','pdf','png','jpg','xml'],
		required: true
	},

	fecha: {
		type: Date,
		required: true
	},

	file: {
		type: String
	},

	version: {
		type: Number
	},

	ultima_modif: {
		type: Date,
	},

	carpeta: {
		type: Schema.ObjectId,
		ref: 'carpetas'
	}
});

const filesModel = mongoose.model('files', filesSchema);

module.exports = filesModel;