const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    author: { type: String, default: 'Anonymous' },
    featuredImage: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
