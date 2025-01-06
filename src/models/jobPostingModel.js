import mongoose from 'mongoose';

const jobPostingSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String]
  },
  approved: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const JobPosting = mongoose.models.JobPosting || mongoose.model('JobPosting', jobPostingSchema);

export default JobPosting;
