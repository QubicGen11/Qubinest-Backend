const Attendance=require('../models/attendaceModel')
const User=require('../models/userModel')
const Session=require('../models/sessionModel')
const generateSessionId=require('../middlewares/sessionIdGenerator')
const clockIn = async (req, res) => {
    try {
        const sessionCreds = req.cookies.sessionId;
        const session = await Session.findOne({ sessionId: sessionCreds });
        if (!session) {
            return res.status(400).send('User is not authenticated');
        }
        const { username } = session;
        const date = new Date(); // Current date
        date.setHours(0, 0, 0, 0); // Set to the start of the day

        const check_in_time = new Date();

        // Create a new attendance record with clock-in details
        const attendance = new Attendance({
            username,
            date,
            check_in_time,
            status: 'Present'
        });
        await attendance.save();
        res.status(200).json({ message: 'Clock-in successful', attendance });
    } catch (error) {
        console.error('Error during clock-in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const clockOut = async (req, res) => {
    try {
        const sessionCreds = req.cookies.sessionId;

        // Check if the session ID exists in the session model
        const session = await Session.findOne({ sessionId: sessionCreds });
        if (!session) {
            return res.status(400).send('User is not authenticated');
        }

        const { username } = session;
        const date = new Date(); // Current date
        date.setHours(0, 0, 0, 0); // Set to the start of the day

        const check_out_time = new Date();

        // Find the attendance record for today without check-out time
        const attendance = await Attendance.findOne({ username, date, check_out_time: { $exists: false } });

        if (!attendance) {
            return res.status(404).json({ message: 'Clock-in record not found. Please clock in before clocking out.' });
        }

        // Update the attendance record with check-out time
        attendance.check_out_time = check_out_time;
        attendance.updated_at = new Date();

        await attendance.save();

        res.status(200).json({ message: 'Clock-out successful', attendance });
    } catch (error) {
        console.error('Error during clock-out:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports={clockIn,clockOut}