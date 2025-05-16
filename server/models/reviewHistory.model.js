import mongoose from 'mongoose';

const reviewHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true, // Title is required
    },
    code: {
      type: String,
      required: true, // Code is required
    },
    review: {
      type: String,
      required: true, // Review content is required
    },
    language: {
      type: String,
      required: true, // Review content is required
    },
    mode:{
      type:String, 
      required :true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['success', 'failure'],
      default: 'success',
    },
  },
  { timestamps: true }
);

const ReviewHistory = mongoose.model('ReviewHistory', reviewHistorySchema);

export default ReviewHistory;


