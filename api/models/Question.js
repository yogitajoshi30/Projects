const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
    questionName: String,
    questionUrl: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    answers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Answers"
    },
    like:[{
        type:String,
    }],
    user: Object,
})

module.exports = mongoose.model("Questions", QuestionSchema);