import { getCurrUserId, getUserById, updateUser } from "../firebase/user";
import { getCreditCardById, updateCreditCard } from "../firebase/creditcard";
import { getProductByID, updateProduct } from "../firebase/products";

async function checkUserCreditCard() {
    const user_id = getCurrUserId();
    await getUserById(user_id)
    .then(async (user) => {
        if(!user[0].creditcard) {
          return { status: false, data: "Your account doens't have any credit card!!" };
        }
        return { status: false, data: "Done" };
    });
}

async function getUserCreditCardBalance() {
    let user_cash = 0;
    checkUserCreditCard().then(async ({ status, data }) => {
      if(status) {
        const user_id = getCurrUserId();
        await getUserById(user_id)
        .then(async (user) => {
            await getCreditCardById(await user[0].creditcard)
            .then((card) => user_cash = card.balance);
        });
        return { status: true, data: user_cash };
      } else {
        return { status: false, data: data };
      }
    });
}

async function getTotalCash() {
    const user_id = getCurrUserId();
    let cashSum = 0;
    await getUserById(user_id)
    .then(async (user) => {
        for(const cartProduct of user[0].cart) {
            await getProductByID(cartProduct.product_id)
            .then(product => cashSum += (cartProduct.qnt * product.price[cartProduct.size]))
        }
    });
    return cashSum;
}

async function getTotalCoins() {
    const user_id = getCurrUserId();
    let coinsSum = 0;
    await getUserById(user_id)
    .then(async (user) => {
        for(const cartProduct of user[0].cart) {
            await getProductByID(cartProduct.product_id)
            .then(product => coinsSum += (cartProduct.qnt * (product.price[cartProduct.size] + 10)))
        }
    });
    return coinsSum;
}

async function getTotalSumInCash() {
    const user_id = getCurrUserId();
    let cashSum = 0;
    await getUserById(user_id)
    .then(async (user) => {
        for(const cartProduct of user[0].cart) {
            await getProductByID(cartProduct.product_id)
            .then(product => cashSum += (cartProduct.qnt * product.price[cartProduct.size]))
        }
    });

    try {
        let user_cash = 0;
        await getUserCreditCardBalance().then(({ status, data }) => {
          if(status) user_cash = data;
          else return { status: true, data: data }; 
        });
        if(cashSum > user_cash) {
            return { status: false, data: "Your credit card balance doens't have enough money" };
        } else {
            return { status: true, data: cashSum };
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function getTotalSumInCoins() {
    const user_id = getCurrUserId();
    let coinsSum = 0;
    let userCoins = 0;
    await getUserById(user_id)
    .then(async (user) => {
        userCoins = await user[0].balance;
        for(const cartProduct of user[0].cart) {
            await getProductByID(cartProduct.product_id)
            .then(product => coinsSum += (cartProduct.qnt * (product.price[cartProduct.size] + 10)))
        }
    });

    try {
        if(coinsSum > userCoins) {
            return { status: false, data: "Your coins balance isn't enough" };
        } else {
            return { status: true, data: coinsSum };
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
                    errors.push({ product_name: product.productName, product_qnt: product.quantity });
            });
        }
    });
    if(errors.length) {
        let errorStr = "";
        errors.forEach(e => errorStr += e.product_name + " It has only " + e.product_qnt + " quantity,\n\n");
        return { status: false, data: errorStr}
    } else {
        return { status: true, data: "Done"}
    }
}

async function orderCartInCash() {
    let f1_status, f1_data;
    let f2_status, f2_data;
    await getTotalSumInCash().then(({ status, data }) => {
        f1_status = status;
        f1_data = data;
    });
    await getTotalQnt().then(({ status, data }) => {
        f2_status = status;
        f2_data = data;
    });
    if(f1_status && f2_status) {
        await minusUserCash();
        await minusProductQnt();
        await addUserBonus();
        return { status: true, data: "Done" };
    } else {
        if(!f1_status) return { status: true, data: f1_data };
        if(!f2_status) return { status: true, data: f2_data };
    }
}

async function orderCartInCoins() {
    let f1_status, f1_data;
    let f2_status, f2_data;
    await getTotalSumInCoins().then(({ status, data }) => {
        f1_status = status;
        f1_data = data;
    });
    await getTotalQnt().then(({ status, data }) => {
        f2_status = status;
        f2_data = data;
    });
    if(f1_status && f2_status) {
        await minusUserCoins();
        await minusProductQnt();
        await addUserBonus();
        return { status: true, data: "Done" };
    } else {
        if(!f1_status) return { status: true, data: f1_data };
        if(!f2_status) return { status: true, data: f2_data };
    }
}

async function minusUserCash() {
    const user_id = getCurrUserId();
    let userr_cash = 0;
    let totallSum = 0;
    let creditCardId;

    await getUserCreditCardBalance()
    .then(({ status, data }) => {
      if(status) userr_cash = data;
      else return { status: false, data: data };
    })
      
    await getTotalSumInCash()
    .then(({ status, data }) => totallSum = data);
    
    await getUserById(user_id)
    .then(async (user) => creditCardId = await user[0].creditcard);

    updateCreditCard(creditCardId, { balance: userr_cash - totallSum });
}

async function minusUserCoins() {
    const user_id = getCurrUserId();
    let userr_coins = 0;
    let totallSum = 0;

    await getUserById(user_id)
    .then(async (user) => userr_coins = await user[0].balance)

    await getTotalSumInCoins()
    .then(({ status, data }) => totallSum = data);
    
    await getUserById(user_id)
    .then(async (user) => creditCardId = await user[0].creditcard);

    updateUser(creditCardId, { balance: userr_coins - totallSum });
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
    .then(async (user) => updateUser(user_id, { balance: await user[0].balance + 10, cart: [] }));
}


export {
    getTotalSumInCoins,
    getTotalSumInCash,
    orderCartInCoins,
    orderCartInCash,
    getTotalCoins,
    getTotalCash,
    getTotalQnt,
}