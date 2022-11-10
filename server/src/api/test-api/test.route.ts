import { Router, Request, Response } from 'express';
import type { Test } from './test.model';

const router = Router();

router.get('/', (req: Request, res: Response<Test>) => {
  res.json({
    id: uuid.v4(),
    message: 'Hello World',
  });
});

export default router;