// Import mongoose
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'company_hr'],
    required: true
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

