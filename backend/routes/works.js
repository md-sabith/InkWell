import express from 'express';
import Work from '../models/Work.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Upload work
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const work = new Work({
      title,
      content,
      category,
      author: req.user.id,
      status: 'pending' // explicitly set to pending
    });
    await work.save();
    await work.populate('author', 'username profilePicture status');
    res.status(201).json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all approved works
router.get('/', async (req, res) => {
  try {
    const works = await Work.find({ status: 'approved' }).populate('author', 'username profilePicture status').sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get current user's works
router.get('/my-works', auth, async (req, res) => {
  try {
    const works = await Work.find({ author: req.user.id }).populate('author', 'username profilePicture status').sort({ createdAt: -1 });
    res.json(works);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Rate work
router.post('/:id/rate', auth, async (req, res) => {
  try {
    const { marks } = req.body;
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: 'Work not found' });
    if (work.status !== 'approved') return res.status(400).json({ message: 'Work is not yet approved' });
    
    const ratingIndex = work.ratings.findIndex(r => r.userId.toString() === req.user.id);
    if (ratingIndex > -1) {
      work.ratings[ratingIndex].marks = marks;
    } else {
      work.ratings.push({ userId: req.user.id, marks });
    }
    
    await work.save();
    await work.populate('author', 'username profilePicture status');
    res.json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like work
router.post('/:id/like', auth, async (req, res) => {
  try {
    const work = await Work.findById(req.params.id);
    if (!work) return res.status(404).json({ message: 'Work not found' });
    if (work.status !== 'approved') return res.status(400).json({ message: 'Work is not yet approved' });
    
    const likeIndex = work.likes.indexOf(req.user.id);
    if (likeIndex > -1) {
      work.likes.splice(likeIndex, 1);
    } else {
      work.likes.push(req.user.id);
    }
    
    await work.save();
    await work.populate('author', 'username profilePicture status');
    res.json(work);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete work
router.delete('/:id', auth, async (req, res) => {
  try {
    const work = await Work.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    if (!work) return res.status(404).json({ message: 'Work not found or unauthorized' });
    res.json({ message: 'Work deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
