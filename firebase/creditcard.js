import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './config';

const creditCardCollection = collection(db, "creditcards");

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


export {
    getCreditCardByNumber,
    getCreditCard,
    addCreditCard,
}

