import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import testAPI from './test/routes';

const router = express.Router();

router.get<Record<string, never>, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API Responding...',
  });
});

router.use('/test', testAPI);

export default router;