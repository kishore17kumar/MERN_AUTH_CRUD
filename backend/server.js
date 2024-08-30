const express=require('express')
const path=require('path')
const dotenv=require('dotenv').config()
const colors=require('colors')
const port=5000
const {errorHandler}=require('../backend/middleware/errorMiddleware')
const connectDb=require('./config/db')
connectDb()
const app=express()



app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/users',require('./routes/userRoutes'))

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')))
    app.get('*',(req,res)=>res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')))
}
app.use(errorHandler)
app.listen(port,()=>{
    console.log(`server running on ${port}`)
})