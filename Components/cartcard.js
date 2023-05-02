import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
    ToastAndroid,
  } from 'react-native';import React from 'react'
  import { useNavigation } from "@react-navigation/core";

  import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const cartcard = ({productName,
    price,
    image,
    details,
    type,
    id,
    Rate,
}) => {
    const navigation = useNavigation();

  return (
  
    <View
    style={{
      width: '100%',
      height: 100,
      marginVertical: 6,
      flexDirection: 'row',
      alignItems: 'center',
    
    }}>
    <View
      style={{
        width: '35%',
        height: 120,
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#F0F0F3",
        borderRadius: 10,
        marginRight: 22,

      }}
      >
      <Image
     source={{uri:image}}
        style={{
          width: '100%',
          height: '100%',
          resizeMode: 'contain',
        }}
      />
   
    </View>
    <View
      style={{
        flex: 1,
        height: '100%',
        justifyContent: 'space-around',
      }}>
      <View style={{}}>
       <TouchableOpacity  onPress={() => {
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
      }}>
        <Text
          style={{
            fontSize: 14,
            maxWidth: '100%',
            color: "black",
            fontWeight: '600',
            letterSpacing: 1,
          }}>
          {productName}
        </Text>
        <View
          style={{
            marginTop: 4,
            flexDirection: 'row',
            alignItems: 'center',
            opacity: 0.6,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '400',
              maxWidth: '85%',
              marginRight: 4,
            }}>
           ${price}
          </Text>
        </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              borderRadius: 100,
              marginRight: 20,
              padding: 4,
              borderWidth: 1,
              borderColor: "#B9B9B9",
              opacity: 0.5,
            }}>
           <TouchableOpacity>
            <MaterialCommunityIcons
              name="minus"
              style={{
                fontSize: 16,
                color: "#777777",
              }}
            />
            </TouchableOpacity>
          </View>
          <Text>1</Text>
          <View
            style={{
              borderRadius: 100,
              marginLeft: 20,
              padding: 4,
              borderWidth: 1,
              borderColor: "#B9B9B9",
              opacity: 0.5,
            }}>
           <TouchableOpacity>
            <MaterialCommunityIcons
              name="plus"
              style={{
                fontSize: 16,
                color: "#777777",
              }}
            />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="delete-outline"
            style={{
              fontSize: 16,
              color: "#777777",
              backgroundColor: "#F0F0F3",
              padding: 8,
              borderRadius: 100,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
};

export default cartcard