const Employee=require('../models/Employee')

const employeeClockin = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).send('User is not authenticated');
        }
        // Assuming you want to log the clock-in time in some way
        return res.cookie('clocked_in', Date.now()).status(200).send('Clocked in successfully');
    } catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred while clocking in');
    }
};
module.exports=employeeClockin