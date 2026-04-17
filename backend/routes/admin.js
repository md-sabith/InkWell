import express from 'express';
import Work from '../models/Work.js';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import { auth } from '../middleware/auth.js';

const router = express.Router();

//get pending works
router.get('/pending', auth, async (req, res) => {
  try {
    const works = await Work.find({ status: 'pending' }).populate('author', 'username profilePicture').sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//approve work
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: 'Work not found' });
    work.status = 'approved';
    await work.save();
    res.json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//reject work
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: 'Work not found' });
    work.status = 'rejected';
    await work.save();
    res.json(work);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//admin login
router.post('/admin-login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { email: admin.email, role: 'admin' } 
});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//admin signup
// router.post('/admin-signup', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const admin = await Admin.findOne({ email });
//     if (admin) return res.status(400).json({ message: 'Admin already exists' });
//     const newAdmin = new Admin({ email, password });
//     await newAdmin.save();
//     res.status(201).json({ message: 'Admin created successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });



export default router;

