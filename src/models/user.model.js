const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
    firstName :{type:String,required:true},
    lastName :{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone :{type:Number,required:true}
},{
    timestamps:true,
    versionKey:false
})

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user",userSchema)

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("firstName"),
		lastName: Joi.string().required().label("lastName"),
		email: Joi.string().email().required().label("email"),
		password: passwordComplexity().required().label("password"),
        phone:Joi.number().required().label("phone")
	});
	return schema.validate(data);
};

module.exports = { User, validate };