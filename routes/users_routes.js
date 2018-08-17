const router = require('express').Router();
const Users = require('./../models/user_model');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');


router.post('/',[
    check('user').isString().not().isEmpty(),
    check('password').isString().not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json("Todos los campos son requeridos")
    }else{
        var newUser = new Users({
            _id : new mongoose.Types.ObjectId(),
            user: req.body.user,
            password: req.body.password
        })
        newUser.save((err,document)=>{
            if(err){
                res.json(`Hubo un error ${err}`)
                console.log(`Hubo un error ${err}`)
            }else{
                res.json(`Se creo el nuevo profesor ${document.user}`)
                console.log(`Se creo el nuevo profesor ${document.user}`)
            }
        })
    }

})

router.post('/login',[
    check('user').isString().not().isEmpty(),
    check('password').isString().not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json("Todos los campos son requeridos")
    }else{
        Users.findOne({user: req.body.user},(err,user)=>{
            if(err){
                res.json(`Hubo un error ${err}`)
                console.log(`Hubo un error ${err}`)
            }if(user){
                if(user.password==req.body.password){
                    res.json(`Acceso concedido`)
                }else{
                    res.json(`Contraseña incorrecta para ${user.user}`)
                }
            }else{
                res.json(`No se encontro el usuario ${req.body.user}`)
                console.log(`No se encontro el usuario ${req.body.user}`)
            }
        })
    }
})

module.exports = router;