import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'

const CartScreen = ({navigation}) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text>CartScreen</Text>
      <TouchableOpacity  onPress={() => {
          navigation.navigate("CheckoutCart");
        
       }}>
        <Text>Go</Text>
        </TouchableOpacity>
    </View>
  )
}

export default CartScreen