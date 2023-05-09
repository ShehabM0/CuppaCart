import { getCurrUserId, getUserById, updateUser } from "../firebase/user";
import { getCreditCardById, updateCreditCard } from "../firebase/creditcard";
import { getProductByID, updateProduct } from "../firebase/products";

async function checkUserCreditCard() {
    const user_id = getCurrUserId();
    await getUserById(user_id)
    .then(async (user) => {
        if(!user[0].creditcard) {
          alert("Your account doens't have any credit card!!");
          return false;
        }
        return true;
    });
}

async function getUserCreditCardBalance() {
    let user_cash = 0;
    if(checkUserCreditCard()) {
        const user_id = getCurrUserId();
        await getUserById(user_id)
        .then(async (user) => {
            await getCreditCardById(await user[0].creditcard)
            .then((card) => user_cash = card.balance);
        });
    }
    return user_cash;
}

async function getTotalSum() {
    const user_id = getCurrUserId();
    let cashSum = 0;
    let coinsSum = 0;
    await getUserById(user_id)
    .then(async (user) => {
        for(const cartProduct of user[0].cart) {
            await getProductByID(cartProduct.product_id)
            .then(product => cashSum += (cartProduct.qnt * product.price[cartProduct.size]))
        }
    });

    try {
        let user_cash = await getUserCreditCardBalance();
        if(cashSum > user_cash ) {
            alert("Your credit card balance doens't have enough money");
            return false;
        } else {
            return cashSum;
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getTotalQnt() {
    const user_id = getCurrUserId();
    let errors = [];
    await getUserById(user_id)
    .then(async (user) => {

        const result = user[0].cart.reduce((acc, product) => {
        if (!acc[product.product_id])
            acc[product.product_id] = { product_id: product.product_id, qnt: 0 };
        acc[product.product_id].qnt += product.qnt;
        return acc;
        }, {});

        const arrResult = Object.values(result);
        for(const cartProduct of arrResult) {
            await getProductByID(cartProduct.product_id)
            .then(async product => {
                const cpqnt = await cartProduct.qnt;
                const pqnt = await product.quantity;
                if(cpqnt > pqnt)
                    errors.push({product_name: product.productName, product_qnt: product.quantity});
            });
        }
    });
    if(errors.length) {
        let errorStr = "";
        errors.forEach(e => errorStr += e.product_name + " It has only " + e.product_qnt + " quantity,\n\n");
        alert(errorStr);
        return false;
    } else {
        return true;
    }
}

async function orderCart() {

    let f1, f2;
    await getTotalQnt()
    .then(res => f1 = res);
    await getTotalSum()
    .then(res => f2 = res);

    if(f1 && f2) {
        console.log("DONE");
        return true;
    } else {
        console.log("ERRROR");
        return false;
    }
}

async function minusUserCash() {
    const user_id = getCurrUserId();
    let userr_cash = 0;
    let totallSum = 0;
    let creditCardId;

    await getUserCreditCardBalance()
    .then(user_cash => userr_cash = user_cash);
    await getTotalSum()
    .then(totalSum => totallSum = totalSum);
    
    await getUserById(user_id)
    .then(async (user) => creditCardId = await user[0].creditcard);

    updateCreditCard(creditCardId, { balance: userr_cash - totallSum });
}

async function minusProductQnt() {
    const user_id = getCurrUserId();
    
    await getUserById(user_id)
    .then(async (user) => {
        for(const cartProduct of user[0].cart) {
            await getProductByID(cartProduct.product_id)
            .then(product => {
                updateProduct(cartProduct.product_id, { quantity: product.quantity - cartProduct.qnt })
            })
        }
    });
}

async function addUserBonus() {
    const user_id = getCurrUserId();
    
    await getUserById(user_id)
    .then(async (user) => updateUser(user_id, { balance: await user[0].balance + 10 }));
}



export {
    minusProductQnt,
    minusUserCash,
    addUserBonus,
    getTotalSum,
    getTotalQnt,
    orderCart,
}