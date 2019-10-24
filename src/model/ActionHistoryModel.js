import mongoose from 'mongoose';

const actionHistorySchema = new mongoose.Schema({
  actionMessage: {
    required: true,
    type: String
  }
});

module.exports = mongoose.model('ActionHistory', actionHistorySchema);
