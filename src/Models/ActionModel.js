import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  actionMessage: {
    required: true,
    type: String,
    minlength: 8,
    maxlength: 180
  }
});

export default mongoose.model('Action', actionSchema);
