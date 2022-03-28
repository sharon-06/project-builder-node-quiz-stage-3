const express = require('express')
var router = express.Router();

const {Option} = require('../model/optionModel')
const ObjectId = require('mongoose').Types.ObjectId

//Getting all option data from database

router.get('/', (req, res) =>{
    Option.find((err, options) =>{
        if (err){
            res.status(500).json({errorMessage: "The option could not be retrieved"})
        }
        else{
            res.send(options)
        }
    })
})



//adding options into database
router.post('/', (req, res) => {

    if (req.body.optionA && req.body.optionB && req.body.optionC && req.body.optionD) {

        // opt details
        const option = new Option({
            optionA:req.body.optionA,
            optionB:req.body.optionB,
            optionC:req.body.optionC,
            optionD:req.body.optionD
        })

        //saving option into database
        option.save((err, option) => {
            if (err) {
                res.status(500).json({ errorMessage: "There was an error while saving option to the database" })
            }
            else res.status(201).json({ Created_Option: option })
        })
    } else {
        res.status(400).json({ error: 'Please provide valid option' })
    }
})



//Getting option data as per matched option id

router.get('/:id', (req, res) =>{
    const id=req.params.id

    if(ObjectId.isValid(id)){
        Option.findById(id, (err, option) =>{
            if(option){
                res.status(500).json({errorMessage: "options could not be find"})
            }
            else{
                if(option){
                    res.send(options)
                }
                else{
                    res.status(404).json({ message:"option with the specified id does not exist."})
                }

            }
        })
    }
    else{
        res.status(400).json({error: 'Kindly enter valid id'})
    }
})


// updating options
router.put('/:id',(req,res)=>{

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    const updatedOption={
        optionA:req.body.optionA,
        optionB:req.body.optionB,
        optionC:req.body.optionC,
        optionD:req.body.optionD
    }
    Option.findByIdAndUpdate(req.params.id,{$set:updatedOption},{new:true},(err, options)=>{
        if(err){
            res.status(500).send({errorMessage: "Option could not be updated." })
        }
        res.send(options)
    })
})



// deleting option as per specified option id  
router.delete('/:id', (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id)) {

        Option.findByIdAndRemove(id, (err, option) => {
            if (err) res.status(500).json({ errorMessage: "options could not be retrieved." })
            else {
                if (option) res.status(201).json({ message: "Option was deleted Successfully" })

                else res.status(404).json({ message: "option with specified ID does not exist." })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid opt id' })
    }
})



module.exports = router