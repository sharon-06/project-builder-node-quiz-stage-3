const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const {mongoose} = require('./connection/connection.js')
const question = require('./controller/questionController')
const option = require('./controller/optionController')
const answer = require('./controller/answerController')

var app = express()
app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

app.get("/", (req,res)=>{
  res.send("Server Started")
});

app.listen(3000, () => console.log('Server Started at port 3000'))

app.use("/questions", question);
app.use("/options", option);
app.use("/answers", answer);