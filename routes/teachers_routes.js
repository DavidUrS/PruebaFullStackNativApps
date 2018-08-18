const router = require('express').Router();
const Teachers = require('./../models/teachers_model');
const Courses = require('./../models/courses_model');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');


// Definiendo las apis

// Encontrando todos los profesores
router.get('/',(req, res)=>{
    Teachers.find().populate('curso').exec((err,teacher)=>{
        if(err){
            res.json(`Hubo un error ${err}`)
            console.log(`Hubo un error ${err}`)
        }else if(teacher){
            res.json(teacher)
            console.log(`${teacher}`)
        }
    })
})

// Añadiendo profesores
router.post('/',[
    check('identidad').isString().not().isEmpty(),
    check('nombres').isString().not().isEmpty(),
    check('apellidos').isString().not().isEmpty(),
    check('genero').isString().not().isEmpty(),
    check('curso').isString().not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json("Todos los campos son requeridos")
    }else{
        Courses.findOne({nombre:req.body.curso},(err,curso)=>{
            if(err){
                res.json(`Hubo un error ${err}`)
                console.log(`Hubo un error ${err}`)
            }else{
                if(curso){
                    // Procederemos a insertar el profesor, luego de confirmar que si existe en la base de datos
                    var newTeacher = new Teachers({
                        _id : new mongoose.Types.ObjectId(),
                        identidad: req.body.identidad,
                        nombres: req.body.nombres,
                        apellidos: req.body.apellidos,
                        genero: req.body.genero,
                        curso: curso._id
                    })
                        newTeacher.save((err,document)=>{
                        if(err){
                            res.json(`Hubo un error ${err}`)
                            console.log(`Hubo un error ${err}`)
                        }else{
                            res.json(`Se creo el nuevo profesor ${document.nombres} par ael curso ${req.body.curso}`)
                            console.log(`Se creo el nuevo profesor ${document.nombres} par ael curso ${req.body.curso}`)
                        }
                    })
                }else{
                    res.json(`NO se encontro ningun curso`)
                    console.log(`NO se encontro ningun curso`)
                }
            }
        })
    }
})

//Editando cursos
router.put('/:id',[
    check('identidad').isString().not().isEmpty(),
    check('nombres').isString().not().isEmpty(),
    check('apellidos').isString().not().isEmpty(),
    check('genero').isString().not().isEmpty(),
    check('curso').isString().not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json("Todos los campos son requeridos")
    }else{
        Courses.findOne({nombre:req.body.curso},(err,curso)=>{
            if(err){
                res.json(`Hubo un error ${err}`)
                console.log(`Hubo un error ${err}`)
            }else{
                if(curso){
                    const {id} = req.params;
                    var teacherEdit = new Teachers({
                        identidad: req.body.identidad,
                        nombres: req.body.nombres,
                        apellidos: req.body.apellidos,
                        genero: req.body.genero,
                        curso: curso._id
                    })
                    Teachers.findByIdAndUpdate(id,{$set: teacherEdit},{new:true},(err,teacher)=>{
                        if(err){
                            res.json(`Hubo un error ${err}`)
                            console.log(`Hubo un error ${err}`)
                        }else{
                            res.json(`Se actualizó ${teacher}`)
                            console.log(`Se actualizó ${teacher}`)
                        }
                    })    
                }
            } 
        })
    }
})


// Eliminando profesor
router.delete('/:id',(req,res)=>{
    Teachers.findByIdAndRemove(req.params.id,(err,doc)=>{
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

module.exports = router;