const router = require('express').Router();
const Students = require('./../models/students_model');
const Courses = require('./../models/courses_model');
const { check, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');


// Definiendo las apis

// Encontrando todos los estudiantes
router.get('/',(req, res)=>{
    Students.find().populate('curso').exec((err,studens)=>{
        if(err){
            res.json(`Hubo un error ${err}`)
            console.log(`Hubo un error ${err}`)
        }else if(studens){
            res.json(studens)
            console.log(`${studens}`)
        }
    })
})

// Añadiendo estudiantes
router.post('/',[
    check('identificacion').isString().not().isEmpty(),
    check('nombres').isString().not().isEmpty(),
    check('apellidos').isString().not().isEmpty(),
    check('genero').isString().not().isEmpty(),
    check('curso').isString().not().isEmpty()
],(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json("Todos los campos son requeridos");
    }else{Courses.findOne({nombre:req.body.curso},(err,curso)=>{
        if(err){
            res.json(`Hubo un error ${err}`)
            console.log(`Hubo un error ${err}`)
        }else{
            if(curso){
                // Procederemos a insertar el estudiante, luego de confirmar que si existe en la base de datos
                var newStudent = new Students({
                    _id : new mongoose.Types.ObjectId(),
                    identificacion: req.body.identificacion,
                    nombres: req.body.nombres,
                    apellidos: req.body.apellidos,
                    genero: req.body.genero,
                    curso: curso._id
                })
                newStudent.save((err,document)=>{
                    if(err){
                        res.json(`Hubo un error ${err}`)
                        console.log(`Hubo un error ${err}`)
                    }else{
                        res.json(`Se creo el nuevo estudiante ${document.nombres} para el curso ${req.body.curso}`)
                        console.log(`Se creo el nuevo estudiante ${document.nombres} para el curso ${req.body.curso}`)
                    }
                })
            }else{
                res.json(`NO se encontro el curso ${req.body.curso}`)
                console.log(`NO se encontro el curso ${req.body.curso}`)
            }
        }
    })

    }
})

// Eliminando estudiante
router.delete('/:id',(req,res)=>{
    Students.findByIdAndRemove(req.params.id,(err,doc)=>{
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