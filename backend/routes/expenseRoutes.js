import express from 'express';
import { addExpense, 
    getExpenses, 
    getExpenseById, 
    updateExpense, 
    deleteExpense,
    getBalance
} from '../controllers/expenseController.js';

const router = express.Router();

router.post('/', addExpense);
router.get('/:groupId', getExpenses);
router.get('/single/:id', getExpenseById);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);
router.get('/balance/:groupId', getBalance);

export default router;