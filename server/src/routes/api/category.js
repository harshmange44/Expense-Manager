import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Category, { validateCategory } from '../../models/Category';
const router = Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: 'desc' });

    res.json({
      categories: categories.map((c) => {
        return c.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'No category found.' });
    res.json({ category: category.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let category = await Category.create({
      categoryTitle: req.body.categoryTitle,
    });
    category = await category.execPopulate();

    res.status(200).json({ category: category.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
