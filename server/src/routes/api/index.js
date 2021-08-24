import { Router } from 'express';
import usersRoutes from './users';
import expensesRoutes from './expenses';
import categoryRoutes from './category';

const router = Router();

router.use('/users', usersRoutes);
router.use('/expenses', expensesRoutes);
router.use('/category', categoryRoutes);
router.use('/expenses/category', expensesRoutes);
router.use('/expenses/user', expensesRoutes);
export default router;
