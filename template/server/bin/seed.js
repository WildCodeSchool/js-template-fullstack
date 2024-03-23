// Load environment variables from .env file
require("dotenv").config();

const fs = require("node:fs");
const path = require("node:path");

// Import database client
const database = require("../database/client");

const fixtures = path.join(__dirname, "..", "database", "fixtures");

const seed = async () => {
  try {
    const dependencyMap = {};

    // Construct each seeder
    fs.readdirSync(fixtures)
      .filter((filePath) => !filePath.startsWith("Abstract"))
      .forEach((filePath) => {
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const SeederClass = require(path.join(fixtures, filePath));

        const seeder = new SeederClass();

        dependencyMap[SeederClass] = seeder;
      });

    // Sort seeders according to their dependencies
    const sortedSeeders = [];

    // The recursive solver
    const solveDependencies = (n) => {
      n.dependencies.forEach((DependencyClass) => {
        const dependency = dependencyMap[DependencyClass];

        if (!sortedSeeders.includes(dependency)) {
          solveDependencies(dependency);
        }
      });

      if (!sortedSeeders.includes(n)) {
        sortedSeeders.push(n);
      }
    };

    // Solve dependencies for each seeder
    Object.values(dependencyMap).forEach((seeder) => {
      solveDependencies(seeder);
    });

    // Truncate tables (starting from the depending ones)

    // The truncate solver
    const doTruncate = async (stack) => {
      if (stack.length === 0) {
        return;
      }

      const firstOut = stack.pop();

      // Use delete instead of truncate to bypass foreign key constraint
      // Wait for the delete promise to complete
      await database.query(`delete from ${firstOut.table}`);

      await doTruncate(stack);
    };

    await doTruncate([...sortedSeeders]);

    // Run each seeder

    // The run solver
    const doRun = async (queue) => {
      if (queue.length === 0) {
        return;
      }

      const firstOut = queue.shift();

      // Use delete instead of truncate to bypass foreign key constraint
      // Wait for the delete promise to complete
      firstOut.run();

      // Wait for all the insertion promises to complete
      // We do want to wait in a loop to satisfy dependencies
      await Promise.all(firstOut.promises);

      await doRun(queue);
    };

    await doRun(sortedSeeders);

    // Close the database connection
    database.end();

    console.info(
      `${database.databaseName} filled from '${path.normalize(fixtures)}' 🌱`
    );
  } catch (err) {
    console.error("Error filling the database:", err.message, err.stack);
  }
};

// Run the seed function
seed();
