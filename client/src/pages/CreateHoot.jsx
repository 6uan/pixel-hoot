import React, { useState, useEffect } from "react";
import LivePreview from "../components/LivePreview";
import AssetSelection from "../components/AssetSelection";
import { getAssetsByType, createHoot } from "../services/api.js";
import gem from "../assets/gem.svg";

const CreateHoot = () => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [bodies, setBodies] = useState([]);
  const [beaks, setBeaks] = useState([]);
  const [eyes, setEyes] = useState([]);
  const [outfits, setOutfits] = useState([]);

  const [selectedBackground, setSelectedBackground] = useState(null);
  const [selectedBody, setSelectedBody] = useState(null);
  const [selectedBeak, setSelectedBeak] = useState(null);
  const [selectedEyes, setSelectedEyes] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);

  const [activeCategory, setActiveCategory] = useState("background");

  // Fetch asset options from API
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        setBackgrounds(await getAssetsByType("background"));
        setBodies(await getAssetsByType("body"));
        setBeaks(await getAssetsByType("beak"));
        setEyes(await getAssetsByType("eyes"));
        setOutfits(await getAssetsByType("outfit"));
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hootData = {
      name: "Custom Hoot", // Add a name for the hoot
      background: selectedBackground?.imageurl || null,
      body: selectedBody?.imageurl || null,
      beak: selectedBeak?.imageurl || null,
      eyes: selectedEyes?.imageurl || null,
      outfit: selectedOutfit?.imageurl || null,
      submittedby: "user123", // Example, replace with actual user or form input
    };

    // Validate if required fields are selected
    if (
      !selectedBackground ||
      !selectedBody ||
      !selectedBeak ||
      !selectedEyes
    ) {
      console.error("Please select background, body, beak, and eyes.");
      return;
    }

    try {
      const response = await createHoot(hootData);
      if (response) {
        alert("Hoot created successfully!");
        handleReset();
      }
    } catch (error) {
      console.error("Error creating hoot:", error);
    }
  };

  // Handle reset functionality
  const handleReset = () => {
    setSelectedBackground(null);
    setSelectedBody(null);
    setSelectedBeak(null);
    setSelectedEyes(null);
    setSelectedOutfit(null);
  };

  // Calculates total gems based on selected assets
  const calculateTotalGems = () => {
    let total = 0;

    if (selectedBackground) {
      total += selectedBackground.gems || 0; // Add gems for background
    }
    if (selectedBody) {
      total += selectedBody.gems || 0; // Add gems for body
    }
    if (selectedBeak) {
      total += selectedBeak.gems || 0; // Add gems for beak
    }
    if (selectedEyes) {
      total += selectedEyes.gems || 0; // Add gems for eyes
    }
    if (selectedOutfit) {
      total += selectedOutfit?.gems || 0; // Add gems for outfit (optional)
    }

    return total;
  };

  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center px-72">
      <div className="flex rounded-md border-2">
        {/* Live Preview */}
        <div className="size-[612px] rounded-l-[4px] bg-gray-100">
          <LivePreview
            selectedBackground={selectedBackground}
            selectedBody={selectedBody}
            selectedBeak={selectedBeak}
            selectedEyes={selectedEyes}
            selectedOutfit={selectedOutfit}
            className="rounded-l-[4px]"
          />
        </div>
        {/* Form Section */}
        <div className="flex h-[612px] w-[650px] flex-col rounded-r-md border-l-2">
          {/* Navigation Buttons */}
          <div className="flex">
            {["background", "body", "beak", "eyes", "outfit"].map(
              (category, index) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex-grow border-b-2 px-4 py-2 text-2xl font-semibold ${
                    activeCategory === category ? "font-extrabold" : ""
                  } ${index !== 0 ? "border-l-2" : ""}`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              )
            )}
          </div>
          {/* Conditional Rendering for Assets */}
          {activeCategory === "background" && (
            <AssetSelection
              assets={backgrounds}
              selectedAsset={selectedBackground}
              setSelectedAsset={setSelectedBackground}
            />
          )}
          {activeCategory === "body" && (
            <AssetSelection
              assets={bodies}
              selectedAsset={selectedBody}
              setSelectedAsset={setSelectedBody}
            />
          )}
          {activeCategory === "beak" && (
            <AssetSelection
              assets={beaks}
              selectedAsset={selectedBeak}
              setSelectedAsset={setSelectedBeak}
            />
          )}
          {activeCategory === "eyes" && (
            <AssetSelection
              assets={eyes}
              selectedAsset={selectedEyes}
              setSelectedAsset={setSelectedEyes}
            />
          )}
          {activeCategory === "outfit" && (
            <AssetSelection
              assets={outfits}
              selectedAsset={selectedOutfit}
              setSelectedAsset={setSelectedOutfit}
            />
          )}
          {/* Total, Reset, and Submit Buttons */}
          <div className="flex h-36 w-full items-center border-t-2">
            <div className="flex h-full w-1/4 items-center justify-center gap-2 border-r-2">
              <img src={gem} alt="gem" className="size-4" />
              <p>{calculateTotalGems()}</p>{" "}
              {/* This will calculate the total gems */}
            </div>
            <button
              onClick={handleReset}
              className="flex h-full w-1/2 items-center justify-center text-2xl font-bold"
            >
              Reset Hoot
            </button>
            <button
              onClick={handleSubmit}
              className="flex h-full w-1/2 items-center justify-center border-l-2 text-2xl font-bold"
            >
              Submit Hoot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHoot;
