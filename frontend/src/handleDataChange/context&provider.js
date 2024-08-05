import React, { createContext, useState, useEffect } from "react";

// Create a context
const DataContext = createContext();

// Provider component
export const DataProvider = ({ children, endpoints = {} }) => {
  // Default empty object for endpoints
  const [data, setData] = useState({});

  // Function to fetch data for a given endpoint
  const fetchData = async (key, endpoint) => {
    if (!endpoint) return; // Check if endpoint is defined
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData((prevData) => ({ ...prevData, [key]: result }));
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
    }
  };

  // Function to post new data for a given endpoint
  const postData = async (key, endpoint, newData) => {
    if (!endpoint) return; // Check if endpoint is defined
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });
      const result = await response.json();
      setData((prevData) => ({
        ...prevData,
        [key]: [...(prevData[key] || []), result],
      }));
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
    }
  };

  // Function to delete data for a given endpoint
  const deleteData = async (key, endpoint, id) => {
    if (!endpoint) return; // Check if endpoint is defined
    try {
      await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });
      setData((prevData) => ({
        ...prevData,
        [key]: (prevData[key] || []).filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error(`Error deleting data from ${endpoint}:`, error);
    }
  };

  // Function to update data for a given endpoint
  const updateData = async (key, endpoint, id, updatedData) => {
    if (!endpoint) return; // Check if endpoint is defined
    try {
      const response = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      const result = await response.json();
      setData((prevData) => ({
        ...prevData,
        [key]: (prevData[key] || []).map((item) =>
          item.id === id ? result : item
        ),
      }));
    } catch (error) {
      console.error(`Error updating data at ${endpoint}:`, error);
    }
  };

  // Fetch data for all endpoints on component mount
  useEffect(() => {
    if (endpoints) {
      Object.keys(endpoints).forEach((key) => fetchData(key, endpoints[key]));
    }
  }, [endpoints]);

  return (
    <DataContext.Provider value={{ data, postData, deleteData, updateData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };
