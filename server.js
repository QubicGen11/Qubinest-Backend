const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const dbConnection=require('./config/dbConfig')
const cookieParser=require('cookie-parser')
const app=express()
const cors=require('cors')
const authRouter=require('./routes/authRouter')
const port=process.env.PORT
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use('/qubinest',authRouter)

app.get('/test', (req, res) => {
    res.send('Hello World! This is a test')
  })

  
 
dbConnection().then(()=>console.log('hello from mongoose')).catch((error)=>console.log('error in db'+error.message))
app.listen(port,()=>console.log(`listening from port ${port}`))