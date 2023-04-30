import { View, Text,FlatList } from 'react-native'
import React, { useState, useEffect } from "react";

import { getProducts } from "../firebase/products";
import Cartcard from '../Components/cartcard';

const CartScreen = () => {
  const [products, setProducts] = useState([]);

  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };

  useEffect(() => {
    getProductHandle();
  }, []);
  return (
    <View>
      <View style={{ marginVertical: 20 }}>
          <View>
            <FlatList
              data={products}
              renderItem={(itemData) => {
                return (
                  <Cartcard
                  productName={itemData.item.productName}
                  price={itemData.item.price}
                  details={itemData.item.details}
                  image={itemData.item.image}
                  Rate={itemData.item.Rate}
                  id={itemData.item.id}
                  />
                );
              }}
            />
          </View>
        </View>
    </View>
  )
}

export default CartScreen