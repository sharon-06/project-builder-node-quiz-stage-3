const express = require('express')
var router = express.Router();

const {Question} = require('../model/questionModel')
const ObjectId = require('mongoose').Types.ObjectId

router.get('/', (req, res) =>{
    Question.find((err, questions) =>{
        if(err){
            res.status(500).json({errorMessage: "The question could not be retrieved"})
        }
        else{
            res.send(questions)
        }
    })
})


//adding options into database
router.post('/', (req, res) => {

    if (req.body.question) {

        // question details
        const question = new Question({
            question:req.body.question
        })

        //saving question into database
        question.save((err, question) => {
            if (err) {
                res.status(500).json({ errorMessage: "There was an error while saving the ques to the database" })
            }
            else res.status(201).json({ Created_Question: question })
        })
    } 
    else {
        res.status(400).json({ error: 'Please provide question for questions' })
    }
})


// updating question document
router.put('/:id',(req,res)=>{

    if(!ObjectId.isValid(req.params.id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    const updatedQuestion={
        question:req.body.question
    }
    Question.findByIdAndUpdate(req.params.id,{$set:updatedQuestion},{new:true},(err, questions)=>{
        if(err){
            res.status(500).send({errorMessage: "Question could not be updated." })
        }
        res.send(questions)
    })
})



// deleting the question document if the specified question id is found 
router.delete('/:id', (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id)) {

        Question.findByIdAndRemove(id, (err, question) => {
            if (err) res.status(500).json({ errorMessage: "questions could not be deleted." })
            else {
                if (question) res.status(201).json({ message: "Question was deleted Successfully" })

                else res.status(404).json({ message: "question with the specified ID does not exist." })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid id' })
    }
})


module.exports = router