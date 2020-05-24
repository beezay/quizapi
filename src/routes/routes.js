// @Import required Modules
const express = require('express');
// @Declaring Router
const router = express.Router();

const Question = require('../models/Question');



// @ Creating Different Routes

//Test Routes
router.get('/test', (req,res)=>{
    res.send('Hello World')
})

router.post('/testpost', (req,res)=>{
    res.send('Tested!!!')
    console.log(req.body);
})

//Creating New Question

router.post('/questions', async(req, res)=>{

    try{
        const {description} = req.body
        const {alternatives} = req.body

        const question = await Question.create({
            description,
            alternatives
        })
        return res.status(201).json(question)
    }catch(error){
        return res.status(500).json({"error": error});
    }
});

//get all questions
router.get('/questions', async(req,res) =>{
    try {
        const questions = await Question.find();
        return res.status(200).json(questions)
    } catch (error) {
        return res.status(500).json({"error": error})
    }
})

//get one question
 router.get('/questions/:id', async(req,res) => {
        try{
            const _id = req.params.id
    
            const question = await Question.findOne({_id})
    
            if(!question){
                return res.status(404).json({})
            }else{
                return res.status(200).json(question)
            }
    
        }
        catch(error){
            return res.status(500).json({"error": error});
        }
})

//update one question
router.put('/questions/:id', async(req,res)=>{
    // console.log('test',req.body, req.params.id)
    // console.log(Question.findOne(req.params.id))
    try {
        const _id = req.params.id
        const {description,alternatives}= req.body

        let question = await Question.findOne({_id});

        if(!question){
            question = await Question.create({
                description,
                alternatives
            })
            return res.status(201).json(question)
        }else{
            question.description = description
            question.alternatives = alternatives
            await question.save();
            return res.status(200).json(question)
        }

    } catch (error) {
        return res.status(500).json({"error":error})
    }
})

//Deleting the Question
router.delete('/questions/:id', async(req,res)=>{
    try {
        const _id = req.params.id

        const question = await Question.deleteOne({_id})

        if (question.deletedCount===0) {
            return res.status(404).json()
        } else {
            return res.status(204).json()
        }

    } catch (error) {
        return res.status(500).json({"error":error})
    }
})



// @Exporting Module for usable in other files
module.exports = router;