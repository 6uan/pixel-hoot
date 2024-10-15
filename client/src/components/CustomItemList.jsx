import React, { useState, useEffect } from "react";
import LivePreview from "./LivePreview"; // Assuming you have this component

const CustomItemsList = () => {
  const [customItems, setCustomItems] = useState([]);

  // Fetch custom items from the backend
  useEffect(() => {
    const fetchCustomItems = async () => {
      try {
        const response = await fetch("http://localhost:3001/assets/allHoots");
        const data = await response.json();
        setCustomItems(data);
      } catch (error) {
        console.error("Error fetching custom items:", error);
      }
    };

    fetchCustomItems();
  }, []);

  return (
    <div className="w-full flex-grow">
      <div className="grid grid-cols-3 gap-5 px-40 py-20">
        {" "}
        {/* 3-column grid for medium screens */}
        {customItems.length > 0 ? (
          customItems.map((item) => (
            <div key={item.id} className="flex h-[612px] flex-col items-center">
              {" "}
              {/* Align items and text properly */}
              <LivePreview
                selectedBackground={{ imageurl: item.background }}
                selectedBody={{ imageurl: item.body }}
                selectedBeak={{ imageurl: item.beak }}
                selectedEyes={{ imageurl: item.eyes }}
                selectedOutfit={{ imageurl: item.outfit }}
              />
              <div className="mt-4 text-center">
                {" "}
                {/* Ensure text is centered and spaced */}
                <p className="text-lg font-bold">{item.name}</p>
                <p className="text-sm text-gray-600">
                  Submitted by: {item.submittedby}
                </p>
                <p className="text-sm text-gray-600">
                  Date: {new Date(item.submittedon).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>No custom items found.</p>
        )}
      </div>
    </div>
  );
};

export default CustomItemsList;
