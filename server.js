const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const dbConnection=require('./config/dbConfig')
const cookieParser=require('cookie-parser')
const app=express()
const cors=require('cors')
const userRouter=require('./routes/userRouter')
 
const port=process.env.PORT
app.use(cors())
 
app.use(express.json())
app.use('/qubinest',userRouter)
dbConnection().then(()=>console.log('hello from mongoose')).catch((error)=>console.log('error in db'+error.message))
app.listen(port,()=>console.log('hello from backend'))