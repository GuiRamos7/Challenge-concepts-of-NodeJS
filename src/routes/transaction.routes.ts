import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (req, res) => {
  try {
    const balance = transactionsRepository.getBalance();
    const transactions = transactionsRepository.all();
    return res.json({ transactions, balance });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (req, res) => {
  try {
    const {
      body: { title, type, value },
    } = req;
    const transaction = new CreateTransactionService(
      transactionsRepository,
    ).execute({
      title,
      type,
      value,
    });

    return res.json(transaction);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
