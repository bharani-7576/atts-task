import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';

const router = express.Router();

const upload = multer({ dest: 'uploads/' });

// Middleware to verify JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Create product
router.post('/', authenticateToken, upload.single('image'), async (req, res) => {
  const { name, price, stock, description, category, manufacturingDate } = req.body;
  const product = new Product({
    name, price, stock, description, category, manufacturingDate,
    image: req.file.path
  });
  try {
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Read products
router.get('/', authenticateToken, async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Update product
router.put('/:id', authenticateToken, upload.single('image'), async (req, res) => {
  const { name, price, stock, description, category, manufacturingDate } = req.body;
  const updateData = {
    name, price, stock, description, category, manufacturingDate
  };
  if (req.file) updateData.image = req.file.path;
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// Delete product
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json("Product Deleted");
  } catch (err) {
    res.status(400).json(err.message);
  }
});

export default router;
