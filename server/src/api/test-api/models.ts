import * as z from 'zod';

const Test = z.object({
  message: z.string(),
});

export type Test = z.infer<typeof Test>;
export default Test;
