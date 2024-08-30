const asyncHandler=require('express-async-handler')
const Goal=require('../model/goalModel')
const User=require('../model/userModel')
// const { text } = require('express')

const getGoals=asyncHandler(async(req,res)=>{
    const goals= await Goal.find({user:req.user.id})
    res.status(200).json(goals)
})

// const postGoals=asyncHandler(async(req,res)=>{
//     if(!req.body.text){
//         res.status(400).json({errmsg:'empty error message'})
//     }
//     const goal=await Goal.create({
//         text: req.body.text,
//     })
//     res.status(200).json(goal)
// })

const postGoals = asyncHandler(async (req, res) => {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
        res.status(400);
        throw new Error('Text is required and should be a string');
    }

    const goal = await Goal.create({ text , user:req.user.id});
    res.status(201).json(goal);
});

// const putGoals=asyncHandler(async(req,res)=>{
//     const goal=Goal.findById(req.params.id)
//     if(!goal){
//         res.status(400)
//         throw new Error('Goal not found')
//     }

//     const updateGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{
//         new:true,
//         runValidators: true,
//     })
//     res.status(200).json(updateGoal)
// })

const putGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    const { text } = req.body;
    if (text && typeof text !== 'string') {
        res.status(400);
        throw new Error('Text should be a string');
    }
    
    if (!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, { text }, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(updatedGoal);
});

const deleteGoals=asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(404);
        throw new Error('Goal not found');
    }

    
    if (!req.user){
        res.status(400)
        throw new Error('User not found')
    }

    if(goal.user.toString()!==req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({id:req.params.id})
})

module.exports={getGoals,postGoals,putGoals,deleteGoals}
