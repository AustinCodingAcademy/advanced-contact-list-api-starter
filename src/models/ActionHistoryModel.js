import mongoose from 'mongoose';

const actionHistorySchema = new mongoose.Schema({
  itemText: {
    required: true,
    type: String
  }
});

export default mongoose.model('ActionHistory', actionHistorySchema);
