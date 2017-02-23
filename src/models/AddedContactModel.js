import mongoose from 'mongoose';

const AddedContactSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },

  occupation: {
    required: true,
    type: String
  },

  avatar: {
    required: true,
    type: String
  }

});

export default mongoose.model('Added', AddedContactSchema, 'addedcontacts');
