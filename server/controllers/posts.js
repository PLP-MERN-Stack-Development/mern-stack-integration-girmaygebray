const Post = require('../models/Post');

// GET /api/posts
exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, q, category } = req.query;
    const filter = {};
    if (q) filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { body: { $regex: q, $options: 'i' } }
    ];
    if (category) filter.categories = category;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .populate('categories')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({ data: posts, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) { next(err); }
};

// GET /api/posts/:id
exports.getOne = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('categories');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
};

// POST /api/posts
exports.create = async (req, res, next) => {
  try {
    const { title, body, author, categories } = req.body;
    const post = new Post({ title, body, author, categories });
    await post.save();
    const populated = await post.populate('categories');
    res.status(201).json(populated);
  } catch (err) { next(err); }
};

// PUT /api/posts/:id
exports.update = async (req, res, next) => {
  try {
    const updates = req.body;
    const post = await Post.findByIdAndUpdate(req.params.id, updates, { new: true }).populate('categories');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) { next(err); }
};

// DELETE /api/posts/:id
exports.remove = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};
