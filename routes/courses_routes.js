const router = require('express').Router();
const Courses = require('./../models/courses_model');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');



// Definiendo las apis

// Encontrando todos los cursos
router.get('/',(req, res)=>{
    Courses.find().populate().exec((err,courses)=>{
        res.json(courses)
    })
})

// Añadiendo los cursos
router.post('/',[
    check('codigo').isString(['messaje','Debe ser un numero']).not().isEmpty(),
    check('nombre').isString(['messaje','Debe ser un numero']).not().isEmpty(),
    check('observaciones').isString(['messaje','Debe ser un numero']).not().isEmpty()
    ],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json("Todos los campos son requeridos")
    }else{
        var newCourse = new Courses({
            _id : new mongoose.Types.ObjectId(),
            codigo : req.body.codigo,
            nombre : req.body.nombre,
            observaciones : req.body.observaciones
        })
        
        newCourse.save((err,response)=>{
            if(err){
                res.json(`Hubo un error ${err}`)
                console.log(`Hubo un error ${err}`)
            }else{
                res.json(`Registro exitoso ${response}`)
                console.log(`Registro exitoso ${response}`)
            }
        })
    }
})

// Eliminando cursos
router.delete('/:id',(req,res)=>{
    Courses.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(err){
            res.json(`NO se encontraron coincidencias ${err}`)
            console.log(`NO se encontraron coincidencias ${err}`)
        }else{
            if(doc){
                res.json(`Se elimino ${doc}`)
                console.log(`Se elimino ${doc}`)
            }
        }
    })
})

//Editando cursos
router.put('/:id',[
    check('codigo').isString(['messaje','Debe ser un numero']).not().isEmpty(),
    check('nombre').isString(['messaje','Debe ser un numero']).not().isEmpty(),
    check('observaciones').isString(['messaje','Debe ser un numero']).not().isEmpty()
],(re,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json("Todos los campos son requeridos")
    }else{
        let id = req.params;
        var courseEdit = new Courses({
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            observaciones: req.body.observaciones
        })
        Courses.findByIdAndUpdate(id,{$set: courseEdit},{new:true},(err,course)=>{
            if(err){
                res.json(`Hubo un error ${err}`)
                console.log(`Hubo un error ${err}`)
            }else{
                res.json(`Se actualizó ${course}`)
                console.log(`Se actualizó ${course}`)
            }
        })        
    }
})

module.exports = router;