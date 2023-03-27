const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
  {
    ad: {
      type: mongoose.Types.ObjectId,
      ref: 'ad',
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('room', roomSchema);
