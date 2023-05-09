import { collection, doc, addDoc, getDocs, getDoc, query, where, updateDoc } from 'firebase/firestore';
import { db } from './config';

const creditCardCollection = collection(db, "creditcards");

async function getCreditCardById(id) {
  const mdoc = doc(db, "creditcards", id);
  const doc_ref = await getDoc(mdoc);
  return doc_ref.data();
}


async function getCreditCard(creditCardData) {
    const q = query(
        creditCardCollection,
        where("name", "==", creditCardData.name.trim().toLowerCase()),
        where("number" , "==", creditCardData.number),
        where("expiry_date" , "==", creditCardData.date),
        where("cvv" , "==", creditCardData.cvv),);
    const existCreditCard = await getDocs(q);
    return (existCreditCard.docs.length) ? existCreditCard : false;
}

async function getCreditCardByNumber(creditCardNumber) {
    const q = query(creditCardCollection, where("number" , "==", creditCardNumber));
    const existCreditCard = await getDocs(q);
    return (existCreditCard.docs.length) ? existCreditCard : false;
}

async function addCreditCard(creditCardData) {
    let result;
    await addDoc(creditCardCollection, creditCardData)
    .then(() => {
        result = {
            status: true,
            message: "Credit Card Created"
          }
    })
    .catch(error => {
        result = {
            status: false,
            message: error.message
          }
    })
    return result;
}

async function updateCreditCard(id, data) {
    let result;
    await updateDoc(doc(db, "creditcards", id), data)
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


export {
    updateCreditCard,
    getCreditCardByNumber,
    getCreditCardById,
    getCreditCard,
    addCreditCard,
}

