import { db } from "./config";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
  where,
  getDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

async function getProductByName(name) {
  const productsColumn = collection(db, "products");
  const que = query(productsColumn, where("productName", "==", name));
  const productSnapShot = await getDocs(que);
  const productObject = productSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return productObject[0];
}
async function getProductByID(id) {
  console.log("get id", id);
  const collec = collection(db, "products");
  const mdoc = doc(db, "products", id);
  const doc_ref = await getDoc(mdoc);
  return doc_ref.data();
  // const productsColumn = collection(db, "products").doc(id);
  // return .doc(id).get();
  const productSnapShot = await getDocs(que);
  const productObject = productSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return productObject[0];
}

async function getProducts() {
  const productsColumn = collection(db, "products");
  const productSnapShot = await getDocs(productsColumn);
  const productObject = productSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return productObject;
}

async function addProduct(object) {
  try {
    await addDoc(collection(db, "products"), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function editProduct(object) {
  try {
    await setDoc(doc(db, "products", object.id), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function deleteProduct(object) {
  try {
    await deleteDoc(doc(db, "products", object.id));
  } catch (error) {
    console.log(error.massage);
  }
}

async function subscribeProduct(callback) {
  const unsubscribe = onSnapshot(
    query(collection(db, "products")),
    (Snapshot) => {
      const source = Snapshot.metadata.hasPendingWrites ? "Local" : "Server";
      Snapshot.docChanges().forEach((change) => {
        if (callback) {
          callback({ change, Snapshot });
        }
      });
    }
  );
  return unsubscribe;
}

export {
  getProductByName,
  getProducts,
  addProduct,
  editProduct,
  deleteProduct,
  subscribeProduct,
  getProductByID,
};
