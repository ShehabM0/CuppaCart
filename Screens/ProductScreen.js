import { View, Text } from 'react-native'
import React from 'react'

const ProductScreen = ({navigation}) => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Text>ProductScreen</Text>
    </View>
  )
}

export default ProductScreen