const Attendance = require('../models/attendaceModel');
const Session = require('../models/sessionModel');

const clockIn = async (req, res) => {
    try {
        const { username } = req.body;
        const existingSession = await Session.findOne({ username });

        if (!existingSession) {
            return res.status(400).send('User is not authenticated');
        }

        const date = new Date();
        date.setHours(0, 0, 0, 0);

        const check_in_time = new Date();

        // Check if user already clocked in today
        const existingAttendance = await Attendance.findOne({ username, date });
        if (existingAttendance) {
            return res.status(400).send('User already clocked in for today');
        }

        // Create a new attendance record
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
        const { username } = req.body;
        const existingSession = await Session.findOne({ username });

        if (!existingSession) {
            return res.status(400).send('User is not authenticated');
        }

        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const check_out_time = new Date();

        // Find the attendance record for today without a check-out time
        const attendance = await Attendance.findOne({ username, date });

        if (!attendance) {
            return res.status(404).json({ message: 'Clock-in record not found. Please clock in before clocking out.' });
        }

        // Update the attendance record with the check-out time
        attendance.check_out_time = check_out_time;
        attendance.updated_at = new Date();

        await attendance.save();

        res.status(200).json({ message: 'Clock-out successful', attendance });
    } catch (error) {
        console.error('Error during clock-out:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { clockIn, clockOut };
