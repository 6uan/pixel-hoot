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

    // Fetch the gem prices for the selected assets
    const assetQueries = [
      pool.query("SELECT gems FROM assets WHERE imageUrl = $1", [background]),
      pool.query("SELECT gems FROM assets WHERE imageUrl = $1", [body]),
      pool.query("SELECT gems FROM assets WHERE imageUrl = $1", [beak]),
      pool.query("SELECT gems FROM assets WHERE imageUrl = $1", [eyes]),
    ];

    // If outfit is selected, fetch the gem price for the outfit too
    if (outfit) {
      assetQueries.push(
        pool.query("SELECT gems FROM assets WHERE imageUrl = $1", [outfit])
      );
    }

    // Execute all queries and get the results
    const results = await Promise.all(assetQueries);

    // Extract the gem values from the results
    const totalGems = results.reduce((sum, result) => {
      return sum + (result.rows[0] ? result.rows[0].gems : 0); // Add the gem value to the sum
    }, 0);

    // Now create the hoot with the selected assets and total gems
    const result = await pool.query(
      `
      INSERT INTO customitem (name, background, body, beak, eyes, outfit, gems, submittedby)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [
        name,
        background,
        body,
        beak,
        eyes,
        outfit || null,
        totalGems,
        submittedby,
      ]
    );

    // Return the created hoot and the total gem price
    res.status(201).json({
      hoot: result.rows[0],
      totalGems,
    });
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
    // Build the query by including all fields (even those set to null)
    const fieldsToUpdate = {
      name,
      background,
      body,
      beak,
      eyes,
      outfit, // Include the outfit field even if it's null
    };

    // Dynamically build the query, allowing null values
    const setClause = Object.keys(fieldsToUpdate)
      .map((field, idx) => `${field} = $${idx + 1}`)
      .join(", ");
    const values = Object.values(fieldsToUpdate);

    if (setClause.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Update the item in the database, even if some fields are set to null
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
