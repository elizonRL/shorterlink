import supertest from 'supertest';
import assert from 'node:assert';
import { describe, test, before, after } from 'node:test';
import mongoose from 'mongoose';
import LinksModels from '../models/linsk.models.js';
import { inicialLinks, linksInDb } from '../utils/helper.js';

import app from '../app.js';
import User from '../models/user.models.js';

const request = supertest(app);

before(async () => {
    // Clear the database before each test
    await User.deleteMany({});
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
let token = '';
describe('Suite de test de la apishorter link ', () => {
    test('get token', async () => {
        const response = await request.post('/api/users')
            .send({ userName: 'testuser2', password: 'testpassword', email: 'test@test2.com'});

        assert.strictEqual(response.status, 201);

        const loginResponse = await request.post('/api/users/login')
            .send({ userName: 'testuser2', password: 'testpassword' });
            token = loginResponse.body.token;
        assert.strictEqual(loginResponse.status, 200);
        assert.ok(loginResponse.body.token); // Check that token is present
    });

    test('should return status 200 ', async () => {
        const response = await request.get('/api')
        .set('Authorization', `Bearer ${token}`);

        assert.strictEqual(response.status, 200);
    });

    test('should return an array of links', async () => {
        const response = await request.get('/api')
        .set('Authorization', `Bearer ${token}`);

        assert.strictEqual(Array.isArray(response.body), true);
    });
    test('should return one more links', async () => {
        const response = await request.post('/api')
            .send(newLink)
            .set('Authorization', `Bearer ${token}`)
            .expect(201);

        assert.strictEqual(response.body.originalUrl, newLink.originalUrl)
    });
    test('should be get all links', async () => {
        const response = await request.get('/api')
        .set('Authorization', `Bearer ${token}`)
            .expect(200)

        const linkDb = await linksInDb()

        assert.strictEqual(response.body.length, linkDb.length)
    });
    test('should redirect when accessing a short URL', async () => {
        // First create a new link to get a shortUrl
        const createResponse = await request.post('/api')
            .set('Authorization', `Bearer ${token}`)
            .send(newLink)
            .expect(201);

        const shortUrl = createResponse.body.shortUrl;
        
        // Test the redirect
        const response = await request.get(`/api/short/${shortUrl}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(302); // 302 is redirect status code

        assert.strictEqual(response.header.location, newLink.originalUrl);
    });

});
after(async () => {
    // Clear the database after each test
    mongoose.connection.close();
});
