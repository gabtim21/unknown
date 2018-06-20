const mongoose	= require('mongoose');
const bcrypt	= require('bcrypt-nodejs');
const Schema	= mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const validateEmail = function(email) {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email)
};

const userSchema	= new Schema({
	name: {
		type		: String,
		required	: true
	},
	dni: {
		type		: Number,
		required	: true
	},
	cel: {
		type 		:Number,
		required	:true
	},
	tipo_user: {
		type		: String,
		enum		: ['Admin','Especial','Empleado']
	},
	tipo_contrato: {
		type		: String
	},
	email: {
		type		: String,
		trim		: true,
		lowercase	: true,
		required	: true,
		unique		: true,
		validate	: [validateEmail, 'Please fill a valid email address']
	},
	password: {
		type		: String,
		required	: true,
		min			: 6,
		max			: 24
	},
	imagen: {
		type 		:String
	},
	sede: {
		type: Schema.ObjectId,
		ref: 'sedes'
	}
}, {timestamps: true});

userSchema.pre('save', function(next) {
	var user = this;

	//password modificado?
	if(!user.isModified('password')) return next();
	// obtenemos clave de encriptado
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) return next(err);
		// cifrar password
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err);
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(candidatePassword){
	return new Promise((resolve,reject) => {
		bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
			if (err) reject({error: true,message: 'Password required'});
			resolve(isMatch);
		});
	})
};

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;