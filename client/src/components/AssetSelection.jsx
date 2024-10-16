import React from "react";
import gem from "../assets/gem.svg";

const AssetSelection = ({ assets, selectedAsset, setSelectedAsset }) => {
  const handleSelect = (asset) => {
    // If the clicked asset is already selected, unselect it
    if (selectedAsset?.id === asset.id) {
      setSelectedAsset(null); // Unselect the asset
    } else {
      setSelectedAsset(asset); // Select the asset
    }
  };

  return (
    <div className="grid min-h-[520px] flex-grow grid-cols-4 gap-4 overflow-scroll p-3">
      {assets.map((asset) => (
        <div key={asset.id} className="text-center">
          <img
            src={asset.imageurl}
            alt={asset.name}
            onClick={() => handleSelect(asset)}
            className={`h-36 w-36 cursor-pointer rounded-lg border-2 transition ${
              selectedAsset?.id === asset.id
                ? "border-green-500"
                : "border-transparent"
            }`}
          />
          {/* Flexbox to show name and gems */}
          <div className="mt-1 flex flex-col items-center justify-center gap-0.5 text-center">
            <p className="text-sm">{asset.name}</p>
            <span className="flex items-center justify-center gap-1 pr-1 text-sm text-gray-600">
              <img src={gem} alt="gem" className="size-3" />
              {asset.gems}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssetSelection;
