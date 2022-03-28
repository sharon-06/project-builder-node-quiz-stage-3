const express = require('express')
var router = express.Router();

const {Answer} = require('../model/answerModel')
const ObjectId = require('mongoose').Types.ObjectId

//getting all data from database

router.get('/', (req, res) =>{
    Answer.find((err, answers) =>{
        if(err)
            res.status(500).json({error: "The answer data could not be retrieved"})
        else
            res.send(answers)
    })
})

//adding answer into database

router.post('/', (req, res) => {

    if (req.body.answer) {

        // answer details
        const answer = new Answer({
            answer: req.body.answer
        })

        //saving answer into database
        answer.save((err, answer) => {
            if (err) {
                res.status(500).json({ errorMessage: "There was an error while saving the answer to the database" })
            }
            else res.status(201).json({ Created_Answer: answer })
        })
    } else {
        res.status(400).json({ error: 'Please provide valid ans for the ans' })
    }
})

//getting answer as per the matched answer id

router.get(':/id', (req, res) =>{
    const id = req.params.id

    if(ObjectId.isValid(id)){
        Answer.findById(id, (err, answers) =>{
            if(err) 
                res.status(500).json({errorMessage:"answer could not be find"})
            else
                if(ans)
                    res.send(answers)
                else
                    res.status(404).json({message: "answer with specified id does not exist"})

        })
    }
    else{
        res.status(400).json({error: 'Kindly Enter Valid answer id'})
    }
})


// updating answer
router.put('/:id',(req,res)=>{

    const id = req.params.id
    if(!ObjectId.isValid(id)){
        res.status(400).send({errorMessage:"Invalid Id"})
    }
    const updatedAnswer={
        answer:req.body.answer
    }
    Answer.findByIdAndUpdate(id,{$set:updatedAnswer},{new:true},(err, answers)=>{
        if(err){
            res.status(500).send({errorMessage: "Answer could not be updated." })
        }
        res.send(answers)
    })
})


// deleting ans if the specified ans id is found 
router.delete('/:id', (req, res) => {
    const id = req.params.id

    if (ObjectId.isValid(id)) {

        Answer.findByIdAndRemove(id, (err, answer) => {
            if (err) res.status(500).json({ errorMessage: "answer could not be retrieved." })
            else {
                if (answer) res.status(201).json({ message: "Answer was deleted Successfully" })

                else res.status(404).json({ message: "answer with the specified answer ID does not exist." })
            }
        })

    } else {
        res.status(400).json({ error: 'Please enter valid answer id' })
    }
})



module.exports = router