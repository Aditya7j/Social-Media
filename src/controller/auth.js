const express = require("express");
const router = express.Router();

const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const newToken = (user)=>{
	return  jwt.sign({user}, process.env.PRIVATE_KEY);
}

router.post("/", async (req, res) => {

	try {	
		const user = await User.findOne({ email: req.body.email }).lean().exec();
		console.log(user)

		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });
		const validPassword = await bcrypt.compare(req.body.password,user.password);

		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });
			
		const token = newToken(user);
		// console.log("token")
		return res.status(200).send({ data: token, message: "logged in successfully" ,name:user.firstName});
	} 
	catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;

