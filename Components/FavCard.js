import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconiki from 'react-native-vector-icons/MaterialIcons'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/core";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
const FavCard = ({
  productName,
  price,
  image,
  details,
  type,
  id,
  Rate,
}) => {
  const navigation = useNavigation();
  const { width } = Dimensions.get("window");
  return (
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
    >
    <View style={styles.innercontainer}>
                <Image
                    source={{ uri: image }}
                    style={styles.image}
                />
                <View style={styles.starcontainer}>
                    <Icon name="star" size={15} color={"#D17742"} />
                    <Text style={styles.ort}>{Rate}</Text>
                </View>
                <View>
                    <View style={styles.titlecontainer}>
                        <Text style={styles.title}>{productName}</Text>
                        <Text style={styles.titletext}>{type}</Text>
                    </View>
                    <View style={styles.downcontainer}>

                        <View style={styles.moneycontainer}>
                            <Iconiki name="attach-money" size={22} color={"#D17742"} />
                            <Text style={styles.money}>{price}</Text>
                            
                        </View>
                        <TouchableOpacity style={styles.backcontainer}>
                            <MaterialIcons name="delete-outline"  size={35} color={"#fff"}  />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    </TouchableOpacity>
  );
};

export default FavCard;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1E221E',
        flex: 1
    },
    innercontainer: {
        flexDirection: "row",
        backgroundColor: '#0D181A',
        marginHorizontal: 15,
        marginVertical: 6,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 15
    },
    image: {
        width: 150,
        height: 100,
        resizeMode: "contain",
        borderRadius: 15
    },
    starcontainer: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        flexDirection: "row",
        zIndex: 1,
        position: "absolute",
        left: 120,
        top: 14,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 10
    },
    ort: {
        color: '#fff'
    },
    titlecontainer: {
        marginLeft:10
    },
    title: {
        color: '#fff',
        fontWeight:"bold",
        fontSize:20
    },
    titletext: {
        color: 'white',
        fontWeight:"bold"
    },
    downcontainer:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    moneycontainer:{
        flexDirection:"row",
        alignItems:"center",
        marginTop:15,
        marginLeft:10
    },
    money:{
        color: '#fff',
        fontSize:17
    },
    backcontainer:{
        alignItems:"center",
        marginTop:15,
         marginLeft:90,
        borderRadius:10
    },
})