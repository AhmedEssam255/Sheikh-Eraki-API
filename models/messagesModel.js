import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      validate: (x) => x.length > 0,
    },
    body: {
      type: String,
      required: true,
      validate: (x) => x.length > 0,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'date', // your existing field name
    },
  },
);

const Messages = mongoose.model('Messages', messagesSchema);
export default Messages;
