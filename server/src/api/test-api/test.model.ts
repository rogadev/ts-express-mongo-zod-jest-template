import * as z from 'zod';

const Test = z.object({
  id: z.string(),
  message: z.string(),
});

export type Test = z.infer<typeof Test>;
export default Test;
