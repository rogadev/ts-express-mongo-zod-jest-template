import { Router, Request, Response } from 'express';
import type { Test } from './models';

const router = Router();

router.get('/', (req: Request, res: Response<Test>) => {
  res.json({
    message: 'Test route working correctly.',
  });
});

export default router;