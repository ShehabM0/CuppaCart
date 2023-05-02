import React, { useEffect, useState } from "react";
import { Platform, StatusBar, ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Pressable } from 'react-native';

import { Ionicons, Feather, FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons'; 
import ReviewButtonLink from '../Components/ReviewButtonLink';
import { getStarsAvg } from "../firebase/reviews";
import { COLORS } from '../Conts/Color';

export default function ProductScreen({ navigation, route }) {

  const { productName, image, details, id } = route.params;

  const prices = [20, 25, 30];
  const coins = [30, 40, 50];

  const [selectedSize, setSelectedSize] = useState(1);
  const [favourite, setFavourite] = useState('white');
  const [starsCount, setStarsCount] = useState(0);
  const [starsAvg, setStarsAvg] = useState(0);
  const [price, setPrice] = useState(25);
  const [coin, setCoin] = useState(40);
  const [qnt, setQnt] = useState(1);

  useEffect(() => {
    switch(selectedSize) {
      case 0: 
        setSmall();
        break;
      case 2: 
        setLarge();
        break;
      default: 
        setMedium();
    }
  }, [qnt]);

  getStarsAvg(id)
  .then(({ starsCount, starsAvg }) => {
    setStarsCount(starsCount);
    setStarsAvg(starsAvg);
  })
  .catch(err => alert(err.message));

  function handleFav() {
    setFavourite((favourite == 'white') ? 'orange' : 'white');
  }


  function setSmall() {
    setSelectedSize(0);
    setPrice(qnt * prices[0]);
    setCoin(qnt * coins[0]);
  }

  function setMedium() {
    setSelectedSize(1);
    setPrice(qnt * prices[1]);
    setCoin(qnt * coins[1]);
  }

  function setLarge() {
    setSelectedSize(2);
    setPrice(qnt * prices[2]);
    setCoin(qnt * coins[2]);
  }

  function increaseQnt() {
    setQnt(qnt + 1);
  }
  
  function decreaseQnt() {
    if(qnt - 1)
      setQnt(qnt - 1);
  }

  return (
    <>
      <View style={styles.imgbgLayout}/>
      <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 2 : 0,}}>
        <ScrollView>
          <View style={styles.imgTitlePriceCont}>
            <Image 
              style={styles.img}
              source={{uri: image}}>
            </Image>

            <View style={styles.arrowHeartCont}>
              <View style={styles.arrowHeart}>
                <TouchableOpacity style={styles.arrowHeartStyle} onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" color="white" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowHeartStyle} onPress={handleFav}>
                  <Ionicons name="heart" color={favourite} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.titlePriceCont}>
              <View style={styles.title}>
                <Text style={styles.titlepriceTxt}>
                  {productName}
                </Text>
                <Text>
                  <FontAwesome name="star" size={15} color="orange" />
                  <Text style={styles.revRate}> {starsAvg}</Text> 
                  <Text style={{ color: '#A9A9A9', }}> ({starsCount})</Text>
                </Text>
              </View>

              <View style={styles.priceCont}>
                <Text style={styles.titlepriceTxt}>
                  <Feather name="dollar-sign" size={15} color="orange"/> {price}
                </Text>

                <Text style={styles.titlepriceTxt}>
                  <FontAwesome5 name="coins" size={15} color="orange" /> {coin}
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.descCont}>
            <Text style={styles.descTitle}>Description</Text>
            <Text style={styles.descBody}>
              {details}
            </Text>
          </View>


          <View style={styles.sizesCont}>
            <TouchableOpacity style={[styles.size, selectedSize == 0 && styles.enableSize]} onPress={setSmall}>
              <Text style={[styles.sizeTxt, selectedSize == 0 && styles.enableSizeTxt]}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.size, selectedSize == 1 && styles.enableSize]} onPress={setMedium}>
              <Text style={[styles.sizeTxt, selectedSize == 1 && styles.enableSizeTxt]}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.size, selectedSize == 2 && styles.enableSize]} onPress={setLarge}>
              <Text style={[styles.sizeTxt, selectedSize == 2 && styles.enableSizeTxt]}>Large</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.qntcartCont}>
            <View style={styles.qntCont}>
                <Pressable onPress={decreaseQnt}>
                  <AntDesign name="minuscircle" size={28} color="black" />
                </Pressable>
                <Text style={styles.qntTxt}> {qnt} </Text>
                <Pressable onPress={increaseQnt}>
                  <AntDesign name="pluscircle" size={28} color="black" />
                </Pressable>
            </View>

            <View>
              <TouchableOpacity style={styles.cart}>
                <View style={styles.cartCont}>
                  <Text style={styles.cartTxt}>Add To Cart</Text>
                  <AntDesign name="shoppingcart" size={30} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.horizontalLineCont}>
            <View style={styles.horizontalLine} />
          </View>

          <ReviewButtonLink
            image={0}
            name={"Reviews"}
            bgcolor={COLORS.lightOrange}
            nav={"Reviews"}
            product_id={id}
          />

          <View style={{marginBottom: 100}}/>

        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'column',
    margin: 10,
  },

  imgbg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imgbgLayout: {
    backgroundColor: "#F1F1F1",
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imgTitlePriceCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.25,
  },

  arrowHeartCont: {
    top: 0, 
    position: 'absolute', 
    width: '100%',
  },
  arrowHeart: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  arrowHeartStyle: {
    backgroundColor: "#0C0F14",
    padding: 10,
    borderRadius: 15,
  },

  titlePriceCont: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
  },
  title: {
    width: '70%',
    paddingLeft: 20,
  },
  priceCont: {
    width: '40%',
  },
  titlepriceTxt: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  revRate: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },

  descCont: {
    padding: 10
  },
  descTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  descBody: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.65)',
    padding: 5
  },

  sizesCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: COLORS.lightOrange,
    padding: 10,
    borderRadius: 10,
    borderWidth:  1,
  },
  enableSize: {
    backgroundColor: COLORS.black,
    borderColor: COLORS.lightOrange,
  },
  sizeTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  enableSizeTxt: {
    color: COLORS.lightOrange,
    borderColor: COLORS.black,
  },


  qntcartCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cartCont: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightOrange,
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth:  1,
  },
  cartTxt: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.black,
  },

  qntCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%'
  },
  qntSignImg: {
    backgroundColor: COLORS.lightOrange, 
    borderRadius: 100,
  },
  qntTxt: {
    fontSize: 24,
    color: COLORS.black,
  },

  horizontalLineCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    width: '80%',
    borderBottomWidth: 0.5,
    marginBottom: 10
  }
});