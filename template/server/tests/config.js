/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import the supertest library for making HTTP requests
const request = require("supertest");

// Import the Express application from app/config.js
const app = require("../app/config");

// Import the database client and tables from database
const database = require("../database/client");
const tables = require("../database/tables");

// Restore all mocked functions after each test
afterEach(() => {
  jest.restoreAllMocks();
});

// Close the database connection after all tests have run
afterAll((done) => {
  database.end().then(done);
});

// Export the Express application, database client, request and tables objects for use in tests
module.exports = { app, database, request, tables };
