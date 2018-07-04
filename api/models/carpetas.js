const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carpetaSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true,
		match: [/^[a-zA-Z0-9]+$/, 'Sede invalida'],
		index: true,
		unique: true
	},

	description: {
		type: String,
		required: true
	},

	fecha: {
		type: Date,
		required: true
	},

	sedes: {
		type: Schema.ObjectId,
		ref: 'sedes'
	}
}, {timestamps: true});

const carpetaModel = mongoose.model('carpetas', carpetaSchema);

module.exports = carpetaModel;
