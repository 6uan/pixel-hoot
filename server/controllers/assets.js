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

// Function to get a specific asset by ID
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

// Export the functions
export default { getAssets, getAssetsByType, getAssetById };
