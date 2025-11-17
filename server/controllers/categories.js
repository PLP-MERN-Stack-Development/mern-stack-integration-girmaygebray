const Category = require('../models/Category');

exports.getAll = async (req, res, next) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) { next(err); }
};

exports.create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Category exists' });
    const cat = new Category({ name });
    await cat.save();
    res.status(201).json(cat);
  } catch (err) { next(err); }
};
