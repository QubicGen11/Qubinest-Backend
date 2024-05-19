const Employee=require('../models/employeModel')
const bcrypt=require('bcrypt')
const salt=10
const jwt=require('jsonwebtoken')
const jwtSecret=process.env.jwtSecret
const employeeRegister=async(req,res)=>{
    try {
        const {name,email,password,isAdmin}=req.body
        const existingUser=await Employee.findOne({email})

        if(existingUser){
            return res.status(400).send('Employee is already present please login')
        }
        const hashedPassword=await bcrypt.hash(password, salt)
        const newUser=new Employee({name,email,password:hashedPassword,isAdmin})
        await newUser.save()

        return res.status(200).send(newUser)
    } catch (error) {
        return res.status(500).send('internal error'+error.message)
    }
}
const employeeLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const isUser = await Employee.findOne({ email });
      if (!isUser) {
        return res.status(400).send('Please register if you are new');
      }
  
      // Check if the password matches
      const isMatch = await bcrypt.compare(password, isUser.password);
      if (!isMatch) {
        return res.status(400).send('Password is not correct');
      }
  
      // Create a JWT token
      const token = jwt.sign({ id: isUser._id, email: isUser.email, isAdmin: isUser.isAdmin }, jwtSecret, { expiresIn: '1d' });
  
      // Set the cookie with the token
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
  
      // Send success response
      res.status(200).send('Login successful');
    } catch (error) {
      res.status(500).send('Internal error: ' + error.message);
    }
  };
module.exports={employeeLogin,employeeRegister}

