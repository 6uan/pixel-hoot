import { pool } from "../config/database.js";

// Function to get all assets
const getAssets = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM assets ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Function to get assets by assetType
const getAssetsByType = async (req, res) => {
  const assetType = req.params.assetType;

  try {
    const results = await pool.query(
      "SELECT * FROM assets WHERE assettype = $1",
      [assetType]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// Function to get a specific asset by ID not really used in the project
const getAssetById = async (req, res) => {
  const assetId = req.params.assetId;

  try {
    const results = await pool.query("SELECT * FROM assets WHERE id = $1", [
      assetId,
    ]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};


const createHoot = async (req, res) => {
  try {
    const { name, background, body, beak, eyes, outfit, submittedby } = req.body;

    // Validate required fields
    if (!name || !background || !body || !beak || !eyes) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert into hoots table
    const result = await pool.query(`
      INSERT INTO customitem (name, background, body, beak, eyes, outfit, submittedby)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, background, body, beak, eyes, outfit || null, submittedby]
    );

    // Send back the created hoot
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};




// Export the functions
export default { getAssets, getAssetsByType, getAssetById, createHoot };
