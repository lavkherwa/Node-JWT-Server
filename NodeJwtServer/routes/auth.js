const router = require('express').Router();
const User = require('../model/User');
const validation = require('./validation');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER A USER
router.post('/register', async (req, res) => {

    // Validate data
   const { error } = validation.registerValidation(req.body);
   if(error){
     return res.status(400).send(error.details[0].message);
   }

   // Check if user exists
   const emailExists = await User.findOne({email: req.body.email});
   if(emailExists){
    return res.status(400).send(`Email ${req.body.email} already exists`);
   }

   // Hash the password
   const salt = await bycrypt.genSalt();
   const hashedPassword = await bycrypt.hash(req.body.password, salt);
   
   // Create new user
   const user = new User({
       name: req.body.name,
       email: req.body.email,
       password: hashedPassword
   });

   // Save to DB
   try {
    const savedUser = await user.save();
    res.json({user: savedUser._id});
   } catch (err) {
    res.json({
        message: err
    });
   }
});

router.post('/login', async (req, res) => {
    
    // Validate data 
    const { error } = validation.loginValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    // Validate email
    const user = await User.findOne({email: req.body.email});
    if(!user){
     return res.status(401).send(`Email or Password is wrong`);
    }

    // Authenticate user
    const validPass = await bycrypt.compare(req.body.password, user.password);
    if(!validPass){
        return res.status(401).send(`Email or Password is wrong`);
    }

    // Generate a token
    const token = jwt.sign(
            { // actual payload info
                _id: user._id, 
                email: user.email,
                dummy: 'anything'
            }, 
            process.env.TOKEN_SECRET,
            {
                // additional config
                expiresIn : '15m',
                header: {
                // additional header info
                origin: "LavApp"
                }
            }
        );
    res.header('auth-token', token)
       .status(200)
       .send(`Logged in Succesfully!`);
});

module.exports = router;