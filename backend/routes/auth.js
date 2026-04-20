import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, profilePicture } = req.body;
    const userCount = await User.countDocuments();
    const role = userCount === 0 ? 'admin' : 'user';
    
    const userData = { username, email, password, role };
    if (profilePicture) userData.profilePicture = profilePicture;

    const user = new User(userData);
    await user.save();
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.status(201).json({ 
      token, 
      user: { 
        id: user._id, 
        username, 
        email, 
        profilePicture: user.profilePicture,
        role: user.role,
        status: user.status
      } 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email, 
        profilePicture: user.profilePicture,
        role: user.role,
        status: user.status
      } 
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.role,
      status: user.status
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const { username, email, profilePicture } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (email) user.email = email;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save();
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      role: user.role,
      status: user.status
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
