const fs = require("node:fs");
const path = require("node:path");

// Import the database client from the test config
const { database } = require("./config");

// Test suite for environment installation
describe("Installation", () => {
  // Test: Check if the .env file exists
  test("You have created /server/.env", async () => {
    expect(fs.existsSync(path.join(__dirname, "..", ".env"))).toBe(true);
  });

  // Test: Check if the .env.sample file exists
  test("You have retained /server/.env.sample", async () => {
    expect(fs.existsSync(path.join(__dirname, "..", ".env.sample"))).toBe(true);
  });

  // Test: Check if the .env file is properly filled with valid database connection information
  test("You have filled /server/.env with valid information to connect to your database", async () => {
    // Query the database to check if the connection is successful
    const [rows] = await database.query(`select 1`);

    // Expecting at least one row to be returned, indicating a successful connection
    expect(rows.length).toBeGreaterThan(0);
  });

  // Test: Check if the database migration and seeding scripts have been executed
  test("You have executed the db:migrate and db:seed scripts", async () => {
    // Query the 'item' table to check if any data has been inserted
    const [rows] = await database.query(`select * from item`);

    // Expecting at least one row to be returned, indicating successful migration and seeding
    expect(rows.length).toBeGreaterThan(0);
  });
});
