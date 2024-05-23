const Attendance=require('../models/attendaceModel')
const getAttendance = async (req, res) => {
    try {
        const { username } = req.body; // Destructure username from req.body
        
        if (!username) {
            return res.status(400).json({ message: 'Username is required' });
        }

        const userAttendance = await Attendance.findOne({ username });

        if (!userAttendance) {
            return res.status(404).json({ message: 'User attendance not present. Please ask them to login.' });
        }

        return res.status(200).json(userAttendance);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error: ' + error.message });
    }
};
module.exports=getAttendance