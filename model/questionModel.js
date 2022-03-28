const mongoose = require('mongoose'), Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: String
})

const Question = mongoose.model("question", QuestionSchema)

module.exports = {Question};