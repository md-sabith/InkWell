import express from 'express';
import Work from '../models/Work.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Top Works based on TOTAL marks (more votes = higher rank)
    const topWorks = await Work.find({ status: 'approved' })
      .populate('author', 'username profilePicture')
      .sort({ totalMarks: -1 })
      .limit(10);

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
      { $limit: 10 }
    ]);

    res.json({ topWorks, topAuthors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
