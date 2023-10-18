const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const config = require("../config/config");
const JWT_SECRET = 'sauravKumar';

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  console.log('email', email, password);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    console.log('user', user)
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ email: user.email },config.secretKey, { expiresIn: '1h' });
    res.json({ token: accessToken, userId: user._id });

    // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
