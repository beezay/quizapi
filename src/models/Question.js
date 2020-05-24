const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    description: String,
    alternatives:[
        {
            text:{
                type: String,
                required: true
            },
            iscorrect:{
                type: Boolean,
                required: true,
                default: false
            }
        }
    ]
})

// @Exporting Module
module.exports = mongoose.model('Question', QuestionSchema);