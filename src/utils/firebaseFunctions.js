import { collection, doc, getDocs, orderBy, query, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

// Saving new Item
export const saveItem = async (data) => {
  await setDoc(doc(firestore, "foodItems", `${Date.now()}`), data, {
    merge: true,
  });
};

// Deleting an item
export const deleteItem = async (itemId) => {
  try {
    const itemRef = doc(firestore, "foodItems", itemId);
    await deleteDoc(itemRef);
    console.log("Item deleted successfully");
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

// Getting all food items
export const getAllFoodItems = async () => {
  try {
    const items = await getDocs(
      query(collection(firestore, "foodItems"), orderBy("id", "desc"))
    );
    return items.docs.map((doc) => doc.data());
  } catch (error) {
    console.error("Error fetching food items:", error);
    throw error;
  }
};
