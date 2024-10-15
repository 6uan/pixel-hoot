import React from "react";

const AssetSelection = ({ assets, selectedAsset, setSelectedAsset }) => {
  return (
    <div className="grid min-h-[526px] flex-grow grid-cols-4 gap-4 overflow-scroll p-3">
      {assets.map((asset) => (
        <div key={asset.id} className="text-center">
          <img
            src={asset.imageurl}
            alt={asset.name}
            onClick={() => setSelectedAsset(asset)}
            className={`h-36 w-36 cursor-pointer rounded-lg border-2 transition ${
              selectedAsset?.id === asset.id
                ? "border-green-500"
                : "border-transparent"
            }`}
          />
          <p className="mt-2 text-center text-sm">{asset.name}</p>
        </div>
      ))}
    </div>
  );
};

export default AssetSelection;
