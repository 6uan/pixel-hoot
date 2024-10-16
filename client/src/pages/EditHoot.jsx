import React, { useState, useEffect } from "react";
import LivePreview from "../components/LivePreview";
import AssetSelection from "../components/AssetSelection";
import { useParams } from "react-router-dom";
import { getAssetsByType, getHootById, updateHoot } from "../services/api";

const EditHoot = () => {
  const { hootId } = useParams(); // Get hootId from the URL
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

  // Fetch the existing hoot data to pre-fill for editing
  useEffect(() => {
    const fetchHoot = async () => {
      try {
        const data = await getHootById(hootId); // Call the API function
        // Set the selected assets to the existing hoot data
        setSelectedBackground({ imageurl: data.background });
        setSelectedBody({ imageurl: data.body });
        setSelectedBeak({ imageurl: data.beak });
        setSelectedEyes({ imageurl: data.eyes });
        setSelectedOutfit({ imageurl: data.outfit });
      } catch (error) {
        console.error("Error fetching hoot:", error);
      }
    };

    fetchHoot();
  }, [hootId]);

  // Handle form submission (PATCH request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const hootData = {
      name: "Updated Hoot", // This could come from a user input as well
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
      alert("Select Background, Body, Beak, and Eyes.");
      return;
    }

    try {
      // Call the updateHoot function from the service
      const response = await updateHoot(hootId, hootData);

      if (response) {
        alert("Hoot updated successfully!");
        handleReset();
      }
    } catch (error) {
      console.error("Error updating hoot:", error);
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

  return (
    <div className="flex w-full flex-grow flex-col items-center justify-center px-72">
      <div className="flex rounded-md border-2">
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
                    activeCategory === category
                      ? "font-extrabold underline"
                      : ""
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
          {/* Reset and Edit */}
          <div className="flex h-36 w-full items-center border-t-2">
            <button
              onClick={handleReset}
              className="flex h-full w-1/2 items-center justify-center text-2xl font-bold"
            >
              Reset Current
            </button>
            <button
              onClick={handleSubmit}
              className="flex h-full w-1/2 items-center justify-center border-l-2 text-2xl font-bold"
            >
              Update Hoot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHoot;
