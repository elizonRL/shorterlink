import supertest from 'supertest';
import assert from 'node:assert';
import { describe, test, beforeEach, after } from 'node:test';
import mongoose from 'mongoose';
import LinksModels from '../models/linsk.models.js';
import { inicialLinks, linksInDb } from '../utils/helper.js';

import app from '../app.js';



const request = supertest(app);

beforeEach(async () => {
    // Clear the database before each test
    await LinksModels.deleteMany({});
    // Insert test data
   let newLink = new LinksModels(inicialLinks[0]!);
    await newLink.save();
    newLink = new LinksModels(inicialLinks[1]!);
    await newLink.save();
    
});
const newLink = {
    originalUrl: 'https://new-example.com'
}
describe('GET /api/', () => {
    
    test('should return status 200 ', async () => {
        const response = await request.get('/api');

        assert.strictEqual(response.status, 200);
    });

    test('should return an array of links', async () => {
        const response = await request.get('/api');

        assert.strictEqual(Array.isArray(response.body), true);
    });
    test('should return one more links', async () => {
        const response = await request.post('/api')
        .send(newLink)
        .expect(201);

     assert.strictEqual(response.body.originalUrl, newLink.originalUrl)
    });
    test('should be get all links', async ()=>{
        const response = await request.get('/api')
        .expect(200)

        const linkDb = await linksInDb()

       assert.strictEqual(response.body.length, linkDb.length)
    });
    
});
after(async () => {
    // Clear the database after each test
    await mongoose.connection.close();
});
