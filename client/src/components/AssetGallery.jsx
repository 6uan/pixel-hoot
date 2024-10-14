import React, { useState, useEffect } from "react";

const AssetGallery = ({ assetType }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    // Fetch assets from the API based on the assetType
    const fetchAssets = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/assets/type/${assetType}`
        );
        const data = await response.json();
        setAssets(data);
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, [assetType]);

  return (
    <>
      <h1 className="my-10 text-center text-7xl font-semibold">
        {assetType.charAt(0).toUpperCase() + assetType.slice(1)} Assets
      </h1>
      <div className="grid grid-cols-4 px-44">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="flex h-full w-full flex-col items-center justify-center gap-3 border-2 p-5"
          >
            <img src={asset.imageurl} alt={asset.name} className="size-64" />
            <p className="text-center text-2xl font-semibold">{asset.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default AssetGallery;
