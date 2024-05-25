const Attendance = require('../models/attendaceModel');
const Session = require('../models/sessionModel');
// Clock-in function
const clockIn = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the user is authenticated
    const existingSession = await Session.findOne({ username });
    if (!existingSession) {
      return res.status(400).json({ message: 'User is not authenticated' });
    }

    // Create a new attendance record
    const check_in_time = new Date();
    const date = new Date();
    date.setHours(0, 0, 0, 0); // Reset to beginning of the day
    const attendance = new Attendance({
      username,
      date,
      check_in_time,
      status: 'Pending', // Status set to 'Pending' by default
    });

    await attendance.save();
    res.status(200).json({ message: 'Clock-in successful', attendance });
  } catch (error) {
    console.error('Error during clock-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Clock-out function
const clockOut = async (req, res) => {
  try {
    const { username } = req.body;

    // Check if the user is authenticated
    const existingSession = await Session.findOne({ username });
    if (!existingSession) {
      return res.status(400).json({ message: 'User is not authenticated' });
    }

    // Get the current date
    const date = new Date();
    date.setHours(0, 0, 0, 0); // Reset to beginning of the day

    // Find the latest attendance record for today
    const latestAttendance = await Attendance.findOne({ username, date }).sort({ check_in_time: -1 });

    if (!latestAttendance) {
      return res.status(404).json({ message: 'Clock-in record not found. Please clock in before clocking out.' });
    }

    // Update the attendance record with the check-out time
    const check_out_time = new Date();
    latestAttendance.check_out_time = check_out_time;
    latestAttendance.updated_at = new Date();

    await latestAttendance.save();
    res.status(200).json({ message: 'Clock-out successful', attendance: latestAttendance });
  } catch (error) {
    console.error('Error during clock-out:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = { clockIn, clockOut };
