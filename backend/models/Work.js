import mongoose from 'mongoose';

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ['Poem', 'Article', 'Story'], required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  ratings: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    marks: { type: Number, min: 1, max: 10 }
  }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  averageRating: { type: Number, default: 0 },
  totalMarks: { type: Number, default: 0 },
}, { timestamps: true });

// Middleware to update averageRating and totalMarks before saving
workSchema.pre('save', function() {
  if (this.ratings.length > 0) {
    this.totalMarks = this.ratings.reduce((acc, curr) => acc + curr.marks, 0);
    this.averageRating = this.totalMarks / this.ratings.length;
  }

});

export default mongoose.model('Work', workSchema);
