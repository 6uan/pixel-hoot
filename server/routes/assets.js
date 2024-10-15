import express from "express";
import AssetController from "../controllers/assets.js";

const router = express.Router();

// Asset routes
router.get("/", AssetController.getAssets); // Get all assets
router.post("/createHoot", AssetController.createHoot); // Create a new hoot
router.get("/allHoots", AssetController.getAllHoots); // Get all hoots
router.get("/type/:assetType", AssetController.getAssetsByType); // Get assets by type (e.g., background, beak)
router.get("/:assetId", AssetController.getAssetById); // Get a specific asset by ID

export default router;
