const mongoose=require('mongoose')
const Url=process.env.URL

const dbConnection=async()=>{
    await mongoose.connect(Url)
}

module.exports=dbConnection