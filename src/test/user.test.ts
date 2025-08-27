import supertest from "supertest";
import {describe, beforeEach, test, after} from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import { newUser } from "../utils/helper.js";
import User from "../models/user.models.js";
import app from "../app.js";

const request = supertest(app);

beforeEach(async () => {
    // Clear the users collection before each test
    await User.deleteMany({});
});
describe('User API tests', () => {

    test('should create a new user', async () => {
        const response = await request.post('/api/users')
            .send(newUser)
            .expect(201);

        assert.strictEqual(response.body.username, newUser.username);
    });

    test('should not create a user with an existing username', async () => {
        await request.post('/api/users')
            .send(newUser)
            .expect(201);

        const response = await request.post('/api/users')
            .send(newUser)
            .expect(400);

        assert.strictEqual(response.body.error, 'Username already exists');
    });
});
after(async () => {
    // Clear the database after each test
    mongoose.connection.close();
});
