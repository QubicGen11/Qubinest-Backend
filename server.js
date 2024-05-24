const express=require('express')
const dotenv=require('dotenv')
dotenv.config()
const dbConnection=require('./config/dbConfig')
const cookieParser=require('cookie-parser')
const app=express()
const cors=require('cors')
const authRouter=require('./routes/authRouter')
const attendanceRouter=require('./routes/clockRouter')
const timeSheetRouter=require('./routes/attendanceRouter')
const bodyparser=require('body-parser')
const port=process.env.PORT
const corsOptions = {
  // origin:' http://localhost:5173',
  origin:' https://qubinest-frontend.vercel.app',
  credentials: true, // This is required to allow credentials (cookies, headers)
};
app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())
app.use('/qubinest',authRouter)
app.use('/qubinest',attendanceRouter)
app.use('/qubinest',timeSheetRouter)
 
app.get('/test', (req, res) => {
    res.send('Hello World! This is a test')
})
  
dbConnection().then(()=>console.log('hello from mongoose')).catch((error)=>console.log('error in db'+error.message))
app.listen(port,()=>console.log(`listening from port ${port}`))