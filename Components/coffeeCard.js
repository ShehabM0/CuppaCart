import { View, Text, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { StarIcon } from 'react-native-heroicons/solid';
import { PlusIcon } from 'react-native-heroicons/outline';

export default function CoffeeCard({
    productName,
    price,
    image,
    details,
    type,
    id,
    Rate,
  }) {
  const navigation = useNavigation();
  return (

      <View 
        style={{
          borderRadius: 40, 
          backgroundColor:'#8c5319', 
          height: 350, 
          width: 250,
        }} 
        >
        <View 
        style={{
          shadowColor: 'black',
          shadowRadius: 30,
          shadowOffset: {width: 0, height: 40},
          shadowOpacity: 0.8,
        }}
        className="flex-row justify-center -mt-14">
          <Image source={{ uri: image }} className="h-40 w-40" />
        </View>
          <View className="px-5 mt-5 space-y-3">
            <Text className="text-3xl text-white font-semibold z-10">
              {productName}
            </Text>
            <View style={{backgroundColor: 'rgba(255,255,255,0.2)'}} 
              className="flex-row items-center rounded-3xl p-1 px-2 space-x-1 w-16">
              <StarIcon size="15" color="white" />
              <Text className="text-base font-semibold text-white">{Rate}</Text>
            </View>
            <View className="flex-row space-x-1 z-10 mb-6">
              <Text className="text-base text-white font-semibold opacity-60">
                Volume 
              </Text>
              <Text className="text-base text-white font-semibold"> 500 </Text>
            </View>

            <View style={{
              backgroundColor:'#8c5319',
              shadowColor:'#8c5319',
              shadowRadius: 25,
              shadowOffset: {width: 0, height: 40},
              shadowOpacity: 0.8,
            }} className="flex-row justify-between items-center">
              <Text className="text-white font-bold text-lg">$ {price}</Text>
              <TouchableOpacity 
             onPress={() => {
                navigation.navigate("Product", {
                  productName,
                  price,
                  image,
                  details,
                  type,
                  id,
                  Rate,
                });
                {
                  /**Login */
                }
              }}
              style={{
                shadowColor: 'black',
                shadowRadius: 40,
                shadowOffset: {width: -20, height: -10},
                shadowOpacity: 1,
              }} className="p-4 bg-white rounded-full">
                <PlusIcon size="25" strokeWidth={2} color='#8c5319' />
              </TouchableOpacity>
            </View>
            
            
          </View>

      </View>
    
  )
}