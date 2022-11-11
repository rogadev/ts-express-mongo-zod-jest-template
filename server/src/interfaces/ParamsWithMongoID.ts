import { ObjectId } from 'mongodb';
import * as z from 'zod';

export const ParamsWithMongoID = z.object({
  id: z.string().min(1).refine((val) => {
    try {
      return new ObjectId(val);
    } catch (error) {
      return false;
    }
  }, {
    message: 'Invalid ObjectId. Requires valid MongoDB ObjectId.',
  }),
});

export type ParamsWithId = z.infer<typeof ParamsWithMongoID>;