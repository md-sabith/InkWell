import express from 'express';
import Work from '../models/Work.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Top Works based on TOTAL marks (more votes = higher rank)
    const topWorks = await Work.find({ status: 'approved' })
      .populate('author', 'username profilePicture status')
      .sort({ totalMarks: -1 })
      .limit(100);

    // Top Authors based on sum of marks across all their works
    const topAuthors = await Work.aggregate([
      { $match: { status: 'approved' } },
      {
        $group: {
          _id: '$author',
          totalMarks: { $sum: '$totalMarks' },
          workCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'authorDetails'
        }
      },
      { $unwind: '$authorDetails' },
      {
        $project: {
          username: '$authorDetails.username',
          profilePicture: '$authorDetails.profilePicture',
          totalMarks: 1,
          workCount: 1
        }
      },
      { $sort: { totalMarks: -1 } },
      { $limit: 100 }
    ]);

    // Reset all statuses to Novice first
    await User.updateMany({ role: 'user' }, { status: 'Novice' });

    // Add status according to rank and update DB
    const authorsWithStatus = await Promise.all(topAuthors.map(async (author, index) => {
      const rank = index + 1;
      let status = 'Novice';
      if (rank === 1) status = 'Emperor';
      else if (rank <= 10) status = 'Legend';
      else if (rank <= 50) status = 'Master';
      else if (rank <= 100) status = 'Pro';
      
      // Update user status in database
      await User.findByIdAndUpdate(author._id, { status });
      
      return { ...author, status, rank };
    }));

    // Add status to top works too
    const worksWithStatus = topWorks.map((work, index) => {
      const rank = index + 1;
      let status = 'Novice';
      if (rank <= 10) status = 'Legend';
      else if (rank <= 50) status = 'Master';
      else if (rank <= 100) status = 'Pro';
      
      return { ...work.toObject(), status, rank };
    });

    res.json({ topWorks: worksWithStatus, topAuthors: authorsWithStatus });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
