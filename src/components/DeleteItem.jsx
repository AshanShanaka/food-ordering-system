// DeleteItemPage.js

import React, { useState, useEffect } from "react";
import { deleteItem, getAllFoodItems } from "../utils/firebaseFunctions";

const DeleteItemPage = () => {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getAllFoodItems();
    setFoodItems(data);
  };

  const handleDelete = async (itemId) => {
    // Call Firebase function to delete item
    await deleteItem(itemId);
    // Refresh the list of items after deletion
    fetchData();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Delete Items</h1>
      <ul>
        {foodItems.map((item) => (
          <li key={item.id} className="flex items-center justify-between border-b border-gray-200 py-2">
            <span className="text-lg">{item.title}</span>
            <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteItemPage;
