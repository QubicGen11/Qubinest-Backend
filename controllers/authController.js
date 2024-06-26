const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Session = require("../models/sessionModel");
const jwtSecret = process.env.jwtSecret;

// Register user
const userRegister = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    let session = await Session.findOne({ username });

    if (!session) {
      // Insert new session
      session = new Session({ username, userId: user._id }); // Set userId here
      await session.save();
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: "1d",
    });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.cookie("username", username, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .json({ message: "Login successful", user: { username: user.username } });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Logout user
const logout = async (req, res) => {
  try {
    const { username } = req.cookies;

    res.clearCookie("jwt");
    res.clearCookie("username");
    await Session.findOneAndDelete({ username });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { userRegister, userLogin, logout };
