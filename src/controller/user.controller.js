const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/user.model");
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/auth");


router.get("/auth",authenticate,async(req,res)=>{
	try{
		const user = await User.find().lean().exec()
		res.status(200).send(user)
	}
	catch(err){
		res.status(500).send(err)
	}
})

router.post("/", async (req, res) => {
	try {
		console.log("hey")
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res.status(409).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


router.get("/",async(req,res)=>{
    try{
        const user = await User.find().lean().exec()
        res.status(200).send(user)
    }
    catch(err){
        res.status(500).send(err)
    }
})




module.exports = router;

