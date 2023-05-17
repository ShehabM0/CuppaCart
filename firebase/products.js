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
  updateDoc,
} from "firebase/firestore";

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
  const productDoc = doc(db, "products", id);
  const doc_ref = await getDoc(productDoc);
  return doc_ref.data();
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

async function updateProduct(id, data) {
  let result;
  await updateDoc(doc(db, "products", id), data)
  .then(() => {
    result = {
      status: true,
      message: "updated"
    }
  })
  .catch((error) => {
    result = {
      status: false,
      message: error.message
    }
  })
  return result;
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
  updateProduct,
  deleteProduct,
  subscribeProduct,
  getProductByID,
};
