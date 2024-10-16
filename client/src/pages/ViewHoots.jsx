import React, { useState, useEffect } from "react";
import { getAllHoots, deleteHootById } from "../services/api";
import HootCard from "../components/HootCard";

const ViewHoots = () => {
  const [customItems, setCustomItems] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  // Fetch custom items from the backend
  useEffect(() => {
    const fetchCustomItems = async () => {
      try {
        const data = await getAllHoots();
        setCustomItems(data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching custom items:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchCustomItems();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const response = await deleteHootById(id); // Use the deleteHootById function from api.js
      if (response) {
        // Remove the deleted item from the state
        setCustomItems(customItems.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("Error deleting hoot:", error);
    }
  };

  if (loading) {
    // Display loading state if still loading
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p className="text-xl text-gray-600">Loading custom items...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow">
      <div className="grid grid-cols-3 gap-5 px-40 py-20">
        {customItems.length > 0 ? (
          customItems.map((item) => (
            <HootCard
              key={item.id}
              item={item}
              handleDelete={handleDelete} // Pass the delete function as a prop
            />
          ))
        ) : (
          <p>No custom items found.</p>
        )}
      </div>
    </div>
  );
};

export default ViewHoots;
