import { Router } from 'express';
import requireJwtAuth from '../../middleware/requireJwtAuth';
import Expense, { validateExpense } from '../../models/Expense';
const router = Router();


router.get('/:category', async (req, res) => {
  try {

    let expenses;

    if(req.params.category === "all" || req.params.category.trim() === ""){
      expenses = await Expense.find().sort({ createdAt: 'desc' }).populate('user');

      res.json({
        expenses: expenses.map((c) => {
        return c.toJSON();
      }),
    });

    }else{
      expenses = await Expense.find({category: req.params.category}).sort({ createdAt: 'desc' }).populate('user');

      res.json({
        expenses: expenses.map((c) => {
        return c.toJSON();
      }),
    });
    }

  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.'+err });
  }
});


router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: 'desc' }).populate('user');

    res.json({
      expenses: expenses.map((c) => {
        return c.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({user: req.params.userId}).sort({ createdAt: 'desc' }).populate('user');

    if (!expenses) return res.status(404).json({ message: 'No expenses found.' });

    res.json({
      expenses: expenses.map((c) => {
        return c.toJSON();
      }),
    });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate('user');
    if (!expense) return res.status(404).json({ message: 'No expense found.' });
    res.json({ expense: expense.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.post('/', requireJwtAuth, async (req, res) => {
  const { error } = validateExpense(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    let expense = await Expense.create({
      expenseTitle: req.body.expenseTitle,
      user: req.user.id,
      amount: req.body.amount,
      description: req.body.description,
      category: req.body.category,
    });
    expense = await expense.populate('user').execPopulate();

    res.status(200).json({ expense: expense.toJSON() });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

router.delete('/:id', requireJwtAuth, async (req, res) => {
  try {
    const tempExpense = await Expense.findById(req.params.id).populate('user');
    if (tempExpense.user.id !== req.user.id)
      return res.status(400).json({ message: 'Not the correct user' });

    const expense = await Expense.findByIdAndRemove(req.params.id).populate('user');
    if (!expense) return res.status(404).json({ message: 'No expense found.' });
    res.status(200).json({ message });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
});

export default router;
