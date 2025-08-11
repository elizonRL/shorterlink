import supertest from 'supertest';
import  assert  from 'node:assert';
import { describe, test } from 'node:test';
import app from '../app.js';

const request = supertest(app);

describe('GET /api/', () => {
    test('should return status 200 and { status: "ok" }', async () => {
        const response = await request.get('/api');

        assert.strictEqual(response.status, 200);
    });
});