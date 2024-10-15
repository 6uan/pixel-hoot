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

const createHoot = async (req, res) => {
  try {
    const { name, background, body, beak, eyes, outfit, submittedby } =
      req.body;

    // Validate required fields
    if (!name || !background || !body || !beak || !eyes) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await pool.query(
      `
      INSERT INTO customitem (name, background, body, beak, eyes, outfit, submittedby)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [name, background, body, beak, eyes, outfit || null, submittedby]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getAllHoots = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM customitem ORDER BY submittedon DESC"
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteHoot = async (req, res) => {
  const { id } = req.params;

  try {
    // Delete the custom item by ID
    const result = await pool.query("DELETE FROM customitem WHERE id = $1", [
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Hoot not found" });
    }

    res.status(200).json({ message: "Hoot deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const patchHoot = async (req, res) => {
  const { hootId } = req.params;
  const { name, background, body, beak, eyes, outfit } = req.body;

  try {
    // Only update the fields that are provided
    const fieldsToUpdate = {};
    if (name) fieldsToUpdate.name = name;
    if (background) fieldsToUpdate.background = background;
    if (body) fieldsToUpdate.body = body;
    if (beak) fieldsToUpdate.beak = beak;
    if (eyes) fieldsToUpdate.eyes = eyes;
    if (outfit) fieldsToUpdate.outfit = outfit;

    // Dynamically build the query
    const setClause = Object.keys(fieldsToUpdate)
      .map((field, idx) => `${field} = $${idx + 1}`)
      .join(", ");
    const values = Object.values(fieldsToUpdate);

    if (setClause.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Update the item in the database
    const result = await pool.query(
      `UPDATE customitem SET ${setClause} WHERE id = $${
        values.length + 1
      } RETURNING *`,
      [...values, hootId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Hoot not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getHootById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM customitem WHERE id = $1", [
      id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Hoot not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the functions
export default {
  getAssets,
  getAssetsByType,
  createHoot,
  getAllHoots,
  deleteHoot,
  patchHoot,
  getHootById,
};
