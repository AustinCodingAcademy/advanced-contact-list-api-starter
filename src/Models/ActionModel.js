import mongoose from 'mongoose';

const actionSchema = new mongoose.Schema({
  actionMessage: {
    required: true,
    type: String
  }
});

export default mongoose.model('Action', actionSchema);
