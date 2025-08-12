import supertest from 'supertest';
import assert from 'node:assert';
import { describe, test, beforeEach, after } from 'node:test';
import mongoose from 'mongoose';
import LinksModels from '../models/linsk.models.js';
/* import { inicialLinks } from '../utils/helper.js'; */

import app from '../app.js';



const request = supertest(app);

beforeEach(async () => {
    // Clear the database before each test
    await LinksModels.deleteMany({});
    // Insert test data
   /* let newLink = new LinksModels({
        originalUrl: inicialLinks[0]!.originalUrl,
    });
    await newLink.save();
    newLink = new LinksModels({
        originalUrl: inicialLinks[1]!.originalUrl,
    });
    await newLink.save(); */
    
});
describe('GET /api/', () => {
    
    test('should return status 200 ', async () => {
        const response = await request.get('/api');

        assert.strictEqual(response.status, 200);
    });

    test('should return an array of links', async () => {
        const response = await request.get('/api');

        assert.strictEqual(Array.isArray(response.body), true);
    });
    
});
after(async () => {
    // Clear the database after each test
    await mongoose.connection.close();
});
