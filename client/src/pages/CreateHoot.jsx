import React, { useState, useEffect } from "react";
import LivePreview from "../components/LivePreview";
import AssetSelection from "../components/AssetSelection";

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
        const bgResponse = await fetch(
          "http://localhost:3001/assets/type/background"
        );
        const bodyResponse = await fetch(
          "http://localhost:3001/assets/type/body"
        );
        const beakResponse = await fetch(
          "http://localhost:3001/assets/type/beak"
        );
        const eyesResponse = await fetch(
          "http://localhost:3001/assets/type/eyes"
        );
        const outfitResponse = await fetch(
          "http://localhost:3001/assets/type/outfit"
        );

        setBackgrounds(await bgResponse.json());
        setBodies(await bodyResponse.json());
        setBeaks(await beakResponse.json());
        setEyes(await eyesResponse.json());
        setOutfits(await outfitResponse.json());
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Print the currently selected assets to the console
    console.log("Selected Background:", selectedBackground);
    console.log("Selected Body:", selectedBody);
    console.log("Selected Beak:", selectedBeak);
    console.log("Selected Eyes:", selectedEyes);
    console.log("Selected Outfit:", selectedOutfit);

    // Prepare the selected options for submission
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
      const response = await fetch("http://localhost:3001/assets/createHoot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hootData),
      });

      if (response.ok) {
        alert("Hoot created successfully!");
        handleReset();
      } else {
        console.error("Error creating hoot");
      }
    } catch (error) {
      console.error("Error:", error);
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
        <div className="size-[612px] rounded-l-md bg-gray-100">
          <LivePreview
            selectedBackground={selectedBackground}
            selectedBody={selectedBody}
            selectedBeak={selectedBeak}
            selectedEyes={selectedEyes}
            selectedOutfit={selectedOutfit}
          />
        </div>
        {/* Form Section */}
        <div className="flex h-[612px] w-[650px] flex-col rounded-md border-l-2">
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

          <div className="flex h-24 w-full items-center border-t-2">
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
              Submit Hoot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateHoot;
