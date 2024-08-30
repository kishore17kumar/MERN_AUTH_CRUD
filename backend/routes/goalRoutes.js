const express=require('express')
const router=express.Router()
const {protect}=require('../middleware/authMiddleware')

const {getGoals,putGoals,postGoals,deleteGoals}=require('../controllers/goalController')

router.get('/',protect,getGoals)

router.post('/',protect,postGoals)

router.put('/:id',protect,putGoals)

router.delete('/:id',protect,deleteGoals)

module.exports=router