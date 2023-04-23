import React, { useState } from "react";
import { Platform, StatusBar, ScrollView, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, SafeAreaView, Pressable } from 'react-native';

import ReviewButtonLink from '../Components/ReviewButtonLink';

import { COLORS } from '../Conts/Color';

export default function ProductScreen() {

  const [arrow, setArrow] = useState(true);
  const [price, setPrice] = useState(21.99);
  const [coin, setCoin] = useState(40);
  const [qnt, setQnt] = useState(1);

  function setSmall() {
    setPrice(19.99);
    setCoin(30);
  }

  function setMedium() {
    setPrice(21.99);
    setCoin(40);
  }

  function setLarge() {
    setPrice(23.99);
    setCoin(50);
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
              source={require('../assets/nathan-dumlao-3.jpg')}>
            </Image>
            <View style={styles.titlePriceCont}>
              <View style={styles.title}>
                <Text style={styles.titlepriceTxt}>
                  Cappuccino
                </Text>
                <Text>
                  <Image
                    style={styles.imgStar}
                    source={require('../assets/star.png')}>
                  </Image>
                  <Text style={styles.revRate}> 4.8</Text> 
                  <Text style={{ color: '#A9A9A9', }}> (1,254)</Text>
                </Text>
              </View>

              <View style={styles.priceCont}>
                <Text style={styles.titlepriceTxt}>
                  <Image 
                    style={styles.dollarImg} 
                    source={require('../assets/blue_dollar_sign.png')}
                  /> {price}
                </Text>

                <Text style={styles.titlepriceTxt}>
                  <Image 
                    style={styles.coinImg} 
                    source={require('../assets/coin.png')}
                  />  {coin}
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.cont}>
            <TouchableWithoutFeedback onPress={() => setArrow(!arrow)}>
                <View style={styles.descCont}>
                  <Text style={styles.descTitle}>Description</Text>
                  { 
                    arrow &&
                    <Image 
                      style={styles.downArrow} 
                      source={require('../assets/arrow_down_icon.png')}
                    />
                  } 
                  { 
                    !arrow && 
                    <Image 
                      style={styles.downArrow} 
                      source={require('../assets/arrow_up_icon.png')}
                    />
                  }
                </View>
            </TouchableWithoutFeedback>
            { 
              !arrow && 
              <View>
                <Text style={styles.desc}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
              </View>
            }
          </View>


          <View style={styles.sizesCont}>
            <TouchableOpacity style={styles.size} onPress={setSmall}>
              <Text style={styles.sizeTxt}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size} onPress={setMedium}>
              <Text style={styles.sizeTxt}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size} onPress={setLarge}>
              <Text style={styles.sizeTxt}>Large</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.qntcartCont}>
            <View style={styles.qntCont}>
                <Pressable onPress={decreaseQnt}>
                  <Image 
                    style={styles.qntSignImg}
                    source={require('../assets/minus_sign.png')}
                  />
                </Pressable>
                <Text style={styles.qntTxt}> {qnt} </Text>
                <Pressable onPress={increaseQnt}>
                  <Image 
                    style={styles.qntSignImg}
                    source={require('../assets/plus_sign.png')}
                  />
                </Pressable>
            </View>

            <View>
              <TouchableOpacity style={styles.cart}>
                <View style={styles.cartCont}>
                  <Text style={styles.cartTxt}>Add To Cart</Text>
                  <Image 
                    style={styles.cartImg}
                    source={require('../assets/cart_black.png')}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.horizontalLineCont}>
            <View style={styles.horizontalLine} />
          </View>

          <ReviewButtonLink
            image={"reviewsImg"}
            name={"Add Review"}
            bgcolor={COLORS.lightOrange}
            nav={"Reviews"}
          />

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
    backgroundColor: COLORS.darkBlue1,
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
    aspectRatio: 1,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  dollarImg: {
    width: 30,
    height: 30,
  },
  coinImg: {
    width: 22,
    height: 22,
  },
  imgStar: {
    width: 20,
    height: 20,
  },
  revRate: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 15,
  },

  descCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightOrange,
    borderRadius: 20,
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
  },
  descTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.black,
    paddingLeft: 10,
  },
  desc: {
    fontWeight: 'bold',
    padding: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    lineHeight: 25
  },
  downArrow: {
    width: 30,
    height: 30,
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
  sizeTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.black,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  cartImg: {
    width: 30,
    height: 30,
    marginLeft: 20,
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
    color: COLORS.white,
  },

  reviewsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    padding: 5,
    backgroundColor: COLORS.lightOrange,
  },
  reviewImg: {
    width: 30,
    height: 30,
    backgroundColor: COLORS.lightOrange
  },
  reviewTxt: {
    paddingLeft: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.black,
  },
  rightArrow: {
    width: 25,
    height: 25,
  },

  horizontalLineCont: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalLine: {
    borderBottomColor: 'grey',
    width: '80%',
    borderBottomWidth: 0.5,
    marginBottom: 20
  }
});

