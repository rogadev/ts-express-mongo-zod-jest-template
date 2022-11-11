import request from 'supertest';

import app from '../../app';
import { Test } from './models';

describe('GET /api/v1/test', () => {
  it('Responds with a test message response.', async () =>
    request(app)
      .get('/api/v1/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual<Test>({
          message: 'Test route working correctly.',
        });
      }),
  );
});
