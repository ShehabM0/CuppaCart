import { db } from "./config";
import {
    updateDoc,
    getDoc,
    setDoc,
    doc,
} from "firebase/firestore";


async function addPurchase(userId, prodIds) {
    const docRef = doc(db, "purchases", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const productsSet = new Set([...data.products, ...prodIds]);
      if(productsSet.size !== data.products.length) {
        updateDoc(docRef, {products: [...productsSet]});
      }
    } else {
      await setDoc(docRef, { products: [...prodIds] });
    }
}

async function getPurchase(userId, prodId) {
    const docRef = doc(db, "purchases", userId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().products.includes(prodId) : false;
}

export {
    addPurchase,
    getPurchase
};