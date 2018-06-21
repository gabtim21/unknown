const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sedeSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},

	description: {
		type: String,
		required: true
	},

	imagen: {
		type: String
	}
}, {timestamps: true});

const sedeModel = mongoose.model('sedes', sedeSchema);

module.exports = sedeModel;