import { pool } from "./database.js";
import "./dotenv.js";
import assetData from "../data/assets.js";

// Create the hoots table
const createCustomItemTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS customitem (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      background TEXT NOT NULL,
      body TEXT NOT NULL,
      beak TEXT NOT NULL,
      eyes TEXT NOT NULL,
      outfit TEXT, -- Optional
      submittedby VARCHAR(255) NOT NULL,
      submittedon TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 customitem table created successfully (or already exists)");
  } catch (err) {
    console.error("⚠️ error creating hoots table", err);
  }
};

// Create the assets table and seed it
const createAssetsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS assets;

    CREATE TABLE IF NOT EXISTS assets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        assetType VARCHAR(255) NOT NULL,
        imageUrl TEXT NOT NULL
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎉 assets table created successfully");
  } catch (err) {
    console.error("⚠️ error creating assets table", err);
  }
};

const seedAssetsTable = async () => {
  await createAssetsTable();

  // Loop over the asset types (keys) and their items (values)
  for (const [assetType, assets] of Object.entries(assetData)) {
    assets.forEach((asset) => {
      const insertQuery = {
        text: "INSERT INTO assets (name, assetType, imageUrl) VALUES ($1, $2, $3)",
      };

      const values = [
        asset.name,
        assetType, // The key of assetData (e.g., 'background', 'beak', etc.) will be the asset type
        asset.imageUrl,
      ];

      pool.query(insertQuery, values, (err, res) => {
        if (err) {
          console.error("⚠️ error inserting asset", err);
          return;
        }

        console.log(`✅ ${asset.name} added successfully as ${assetType}`);
      });
    });
  }
};

// Run the table creation for hoots and assets
const run = async () => {
  await createCustomItemTable(); // Create the hoots table
  await seedAssetsTable(); // Create and seed the assets table
};

run();
