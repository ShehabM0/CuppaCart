import { db } from "./config";
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
} from "firebase/firestore";

async function addOrder(object) {
  try {
    await addDoc(collection(db, "orders"), object);
  } catch (error) {
    console.log(error)
  }
}

async function getOrderByUID(id) {
  const ordersRef = collection(db, "orders");
  const q = query(ordersRef, where("user_id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

export {
  getOrderByUID,
  addOrder
};
