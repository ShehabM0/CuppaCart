import { auth, db } from "./config";
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
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

async function getUserByName(firstname,lastname) {
  const usersColumn = collection(db, "users");
  const que = query(usersColumn, where("firstname", "==",firstname),where("lastname", "==",lastname));
  const userSnapShot = await getDocs(que);
  const userObject = userSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userObject[0];
}
async function getUserByEmail(email) {
  const usersColumn = collection(db, "users");
  const que = query(usersColumn, where("email", "==", email));
  const userSnapShot = await getDocs(que);
  const userObject = userSnapShot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
  return userObject[0];
}

async function getUsers() {
  const usersCol = collection(db, "users");
  const userSnapshot = await getDocs(usersCol);
  return userSnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

async function addUser(object) {
  try {
    await setDoc(doc(db, "users", object.id), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function editUser(object) {
  try {
    await setDoc(doc(db, "users", object.id), object);
  } catch (error) {
    console.log(error.massage);
  }
}

async function updateUser(userId, userData) {
  let result;
  await updateDoc(doc(db, "users", userId), userData)
  .then(() => {
    result = {
      status: true,
      message: "User updated"
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

async function deleteUser(object) {
  try {
    await deleteDoc(doc(db, "users", object.id));
  } catch (error) {
    console.log(error.massage);
  }
}

async function subscribeUser(callback) {
  const unsubscribe = onSnapshot(query(collection(db, "users")), (Snapshot) => {
    const source = Snapshot.metadata.hasPendingWrites ? "Local" : "Server";
    Snapshot.docChanges().forEach((change) => {
      if (callback) {
        callback({ change, Snapshot });
      }
    });
  });
  return unsubscribe;
}

async function getUserUId() {
  if (auth.currentUser != null) {
   // console.log("this here =", auth.currentUser.uid);
    return auth.currentUser.uid;
  } else {
    return null;
  }
}

function getCurrUserId() {
  if (auth.currentUser) 
    return auth.currentUser.uid;
  return null;
}

async function getUserById(id) {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("id", "==", id));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { id: doc.id, ...doc.data() };
  });
}

export {
  getUserByName,
  getUsers,
  addUser,
  editUser,
  updateUser,
  deleteUser,
  subscribeUser,
  getUserUId,
  getUserById,
  getCurrUserId,
  getUserByEmail,
};
