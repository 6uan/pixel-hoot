const API_URL = "http://localhost:3001/assets";

// Fetch all assets by type
export const getAssetsByType = async (type) => {
  try {
    const response = await fetch(`${API_URL}/type/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} assets`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Fetch all custom hoots
export const getAllHoots = async () => {
  try {
    const response = await fetch(`${API_URL}/allHoots`);
    if (!response.ok) {
      throw new Error("Failed to fetch custom hoots");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching custom hoots:", error);
    throw error; // Re-throw to handle in the component
  }
};

// Create a new hoot
export const createHoot = async (hootData) => {
  try {
    const response = await fetch(`${API_URL}/createHoot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hootData),
    });
    if (!response.ok) {
      throw new Error("Failed to create hoot");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete a hoot by ID
export const deleteHootById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/deleteHoot/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete hoot");
    }
    return await response.json(); // Return the response to verify deletion
  } catch (error) {
    console.error("Error deleting hoot:", error);
    throw error; // Re-throw to handle in the component
  }
};

// Fetch a hoot by ID
export const getHootById = async (hootId) => {
  try {
    const response = await fetch(`${API_URL}/getHoot/${hootId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch hoot");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching hoot:", error);
    throw error; // Re-throw the error so it can be handled in the component
  }
};

// Update a hoot
export const updateHoot = async (hootId, hootData) => {
  try {
    const response = await fetch(`${API_URL}/updateHoot/${hootId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hootData),
    });

    if (!response.ok) {
      throw new Error("Failed to update hoot");
    }

    return await response.json(); // Return the response JSON
  } catch (error) {
    console.error("Error updating hoot:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};
