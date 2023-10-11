const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/loginsystem');// Use the correct User model
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Sign-up API or controller function
const signupUser = async (req, res) => {
  try {
    const { username, email, password,role } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
  
    const newUser = new User({ username, email, password: hashPassword, role });
    await newUser.save();
    
    res.status(201).json({ message: 'User Created Successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Login API or controller function
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ userId: user.id, email: user.email, role:user.role }, process.env.PRIVATE_KEY, { expiresIn: "1hr" });
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid Credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const getAllData = async (req, res) => {
  try {
    const userRole = req.user.role;
    if (userRole === 'HR') {
      const users = await User.find({});
      res.status(200).json(users);
    } else {
      res.status(403).json({ error: 'Forbidden' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };



// Reset Password API or controller function
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = generateResetToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 2000000;

    await user.save();

    const resetLink = `http://localhost:8080/loginuser/resetpwd?token=${resetToken}`;
    const mailOptions = {
      from: 'eng.umarakram@outlook.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false, // TLS
      auth: {
        user: 'eng.umarakram@outlook.com',
        pass: '123UmaR@49473',
      }
    });

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send reset email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Password reset email sent successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

const generateResetToken = () => {
  const buffer = crypto.randomBytes(32);
  const token = buffer.toString('hex');
  return token;
}

const resetPassword = async (req, res) => {
    try {
      const token = req.query.token;
      const { password } = req.body;
  
      // check token if it's not expired
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
      }
  
      if (!password) {
        return res.status(400).json({ error: 'New password is required' });
      }
  
      // Hash the new password
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { signupUser, loginUser,getAllData, forgotPassword, resetPassword };
