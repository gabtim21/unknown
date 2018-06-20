const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sedeSchema = new Schema({
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

	imagen: {
		type: String
	}
});

const sedeModel = mongoose.model('sedes', sedeSchema);

module.exports = sedeModel;