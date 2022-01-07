const jwt = require('jsonwebtoken');

const userController = {}

const User = require('../models/User.js');

userController.signup =  async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        return res.status(400).send('El usuario ya existe');
    }
    const newUser = new User({email, password});
    await newUser.save();
    const token = jwt.sign({_id: newUser._id }, 'secretkey' );
    res.status(200).json({token}); 

}

userController.signin = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(401).send('El usuario no existe');
    }
    //const isMatch = await user.matchPassword(password);
    if(password !== user.password){
        return res.status(401).send('Contraseña incorrecta');
    }
    const token = jwt.sign({_id: user._id }, 'secretkey' );
    res.status(200).json({token});
}





module.exports = userController;

