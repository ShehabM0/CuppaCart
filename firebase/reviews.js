import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from './config';

reviewCollection = collection(db, "reviews");

async function addReview(reviewData) {
    console.log("H")
    let result;
    await addDoc(reviewCollection, reviewData)
    .then(() => {
        result = {
            status: true,
            message: "Review Added"
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

async function getReviews(product_id) {
    const q = query(reviewCollection, where("product_id" , "==", product_id));
    const reviews = await getDocs(q);
    return reviews.docs.map(doc => { return { id: doc.id, ...doc.data() } });
}

async function getStarsAvg(product_id) {
    let starsCount = 0;
    let starsSum = 0;
    let starsAvg = 0;
    const q = query(reviewCollection, where("product_id" , "==", product_id));
    const reviews = await getDocs(q);
    starsCount = reviews.docs.length;
    reviews.docs.map(doc => starsSum += doc.data().stars);
    if(starsCount == 0)
        return { starsCount, starsAvg: 0 };
    starsAvg = (starsSum / starsCount).toFixed(1);
    if(starsAvg == parseInt(starsAvg))
        return { starsCount, starsAvg: parseInt(starsAvg) }
    else
        return { starsCount, starsAvg };
}

export {
    addReview,
    getReviews,
    getStarsAvg
}