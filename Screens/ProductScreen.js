import React, { useEffect, useState } from "react";
import { Platform, StatusBar, ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Pressable } from 'react-native';
import { Ionicons, Feather, FontAwesome5, FontAwesome, AntDesign } from '@expo/vector-icons'; 
import { getCurrUserId, getUserById, updateUser } from "../firebase/user";
import { getProductByID } from "../firebase/products";
import { getStarsAvg } from "../firebase/reviews";
import { COLORS } from '../Conts/Color';

import ReadMore from 'react-native-read-more-text';
import ReviewButtonLink from '../Components/ReviewButtonLink';
import WarningMessage from "../Components/WarningMessage";
import SuccessMessage from "../Components/SuccessMessage";
import Loader from "../Components/Loader";

import * as Haptics from "expo-haptics"
import * as Font from "expo-font";

export default function ProductScreen({ navigation, route }) {

  const { id } = route.params;
  const user_id = getCurrUserId();

  const [productName, setProductName] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState("");

  const [userFavorite, setUserFavorite] = useState([]);
  const [fontLoaded, setFontLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(1);
  const [favorite, setFavorite] = useState('white');
  const [starsCount, setStarsCount] = useState(0);
  const [prices, setPrices] = useState([]);
  const [pricee, setPrice] = useState(prices[1]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [starsAvg, setStarsAvg] = useState(0);
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

  useEffect(() => {
    if(productName &&  image && details && prices)
      setLoading(false);
    else 
      setLoading(true);
  }, [productName, image, details, prices])

  useEffect(() => {
    getProductByID(id)
    .then(product => {
      setProductName(product.productName);
      setImage(product.image);
      setDetails(product.details);
      setPrices(product.price);
      setPrice(product.price[1]);
      setCoin(product.price[1] + 10)
    });

    getUserById(user_id)
    .then(user => {
      setUserFavorite(user[0].favorite);
    })
    .catch(err => alert(err.message));

    getStarsAvg(id)
    .then(({ starsCount, starsAvg }) => {
      setStarsCount(starsCount);
      setStarsAvg(starsAvg);
    })
    .catch(err => alert(err.message));
  }, []);

 useEffect(() => {
    (userFavorite.includes(id)) ? setFavorite('orange') : setFavorite('white');
  }, [userFavorite]);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "Sora-SemiBold": require("../assets/Fonts/static/Sora-SemiBold.ttf"),
        "sora-regular": require("../assets/Fonts/static/Sora-Regular.ttf"),
        "sora-light": require("../assets/Fonts/static/Sora-Light.ttf"),
      });
      setFontLoaded(true);
    };
    loadFonts();
  }, []);

  function addToFavorite() {
    if(favorite == 'white') {
      setFavorite('orange');
      getUserById(user_id)
      .then(user => setUserFavorite(user[0].favorite))
      .catch(err => alert(err.message));
      updateUser(user_id, { favorite: [...userFavorite, id] })
    } else {
      setFavorite('white');
      const id_idx = userFavorite.indexOf(id);
      userFavorite.splice(id_idx, 1);
      setUserFavorite(favorite);
      updateUser(user_id, { favorite: [...userFavorite] });
    }
  }
  
  function addToCart() {
    getUserById(user_id)
    .then(user => {
      updateUser(user_id, { cart: [ ...user[0].cart, { product_id: id, qnt: qnt, size: selectedSize} ] })
      .then(() => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
      });
    })
    .catch(err => alert(err.message));
    Haptics.notificationAsync(
      Haptics.NotificationFeedbackType.Success
    )
  }

  function setSmall() {
    setSelectedSize(0);
    setPrice(qnt * prices[0]);
    setCoin(qnt * (prices[0] + 10));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
  }

  function setMedium() {
    setSelectedSize(1);
    setPrice(qnt * prices[1]);
    setCoin(qnt * (prices[1] + 10));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
  }

  function setLarge() {
    setSelectedSize(2);
    setPrice(qnt * prices[2]);
    setCoin(qnt * (prices[2] + 10));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
  }

  function increaseQnt() {
    setQnt(qnt + 1);
  }
  
  function decreaseQnt() {
    if(qnt - 1)
      setQnt(qnt - 1);
  }

  function ShowMore(handlePress) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: "#C67C4E", fontFamily:"Sora-SemiBold", }}>Show More</Text>
      </TouchableOpacity>
    );
  }

  function ShowLess(handlePress) {
    return (
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ color: "#C67C4E", fontFamily:"Sora-SemiBold", }}>Show Less</Text>
      </TouchableOpacity>
    );
  }

  if (!fontLoaded) {
    return null; // Render nothing until the font is loaded
  }

  return (
    <>
      { success && <SuccessMessage message={"Product added to your cart"}/> }
      <View style={styles.imgbgLayout}/>
      <SafeAreaView style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,backgroundColor:"#E4EDFA"}}>
        <ScrollView>
          <Loader visible={loading} />
          <View style={styles.imgTitlePriceCont}>
            {
              image && 
              <Image 
                style={styles.img}
                source={{uri: image}}>
              </Image>
            }
            {
              !image && 
              <Image 
                style={styles.img}
                source={{uri: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"}}>
              </Image>
            }

            <View style={styles.arrowHeartCont}>
              <View style={styles.arrowHeart}>
                <TouchableOpacity style={styles.arrowHeartStyle} onPress={() => navigation.goBack()}>
                  <Ionicons name="arrow-back" color="white" size={20} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowHeartStyle} onPress={addToFavorite}>
                  <Ionicons name="heart" color={favorite} size={20} />
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.titlePriceCont}>
              <View style={styles.title}>
                <Text style={styles.titlepriceTxt}>
                  {productName}
                </Text>
                <Text>
                  <FontAwesome name="star" size={15} color="#FBBE21" />
                  <Text style={styles.revRate}> {starsAvg}</Text> 
                  <Text style={{ color: '#A9A9A9', }}> ({starsCount})</Text>
                </Text>
              </View>

              <View style={{ paddingRight: 10 }}>
                <Text style={styles.titlepriceTxt}>
                  <Feather name="dollar-sign" size={15} color="#C67C4E"/> {pricee}
                </Text>

                <Text style={styles.titlepriceTxt}>
                  <FontAwesome5 name="coins" size={15} color="#C67C4E" /> {coin}
                </Text>
              </View>
            </View>
          </View>


          <View style={styles.descCont}>
            <Text style={styles.descTitle}>Description</Text>
              <View style={styles.descBody}>
                <ReadMore
                  textProps={{ allowFontScaling: false }}
                  numberOfLines={3}
                  renderTruncatedFooter={ShowMore}
                  renderRevealedFooter={ShowLess}
                >
                <Text style={styles.descBody}>{details}</Text>
              </ReadMore>
            </View>
          </View>
    

          <View style={styles.descCont}>
            <Text style={styles.descTitle}>Size</Text>
            <View style={styles.sizesCont}>
              <TouchableOpacity style={[styles.size, selectedSize == 0 && styles.enableSize]} onPress={setSmall}>
                <Text style={[styles.sizeTxt, selectedSize == 0 && styles.enableSizeTxt]}>S</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.size, selectedSize == 1 && styles.enableSize]} onPress={setMedium}>
                <Text style={[styles.sizeTxt, selectedSize == 1 && styles.enableSizeTxt]}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.size, selectedSize == 2 && styles.enableSize]} onPress={setLarge}>
                <Text style={[styles.sizeTxt, selectedSize == 2 && styles.enableSizeTxt]}>L</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.qntcartCont}>
            <View style={styles.qntCont}>
                <Pressable onPress={decreaseQnt}>
                  <AntDesign name="minuscircle" size={28} color="#C67C4E" />
                </Pressable>
                <Text style={styles.qntTxt}> {qnt} </Text>
                <Pressable onPress={increaseQnt}>
                  <AntDesign name="pluscircle" size={28} color="#C67C4E" />
                </Pressable>
            </View>

            <View style={{ width: '60%' }}>
              <TouchableOpacity onPress={addToCart}>
                <View style={styles.cartCont}>
                  <Text style={styles.cartTxt}>Add To Cart</Text>
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
            nav={"Reviews"}
            product_id={id}
          />

          <View style={{marginBottom: 25}}/>

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
    top: 0,
    left: 0,
    right: 0,
    height: StatusBar.currentHeight,
    zIndex: 1,
  },
  
  imgTitlePriceCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '100%',
    height: undefined,
    aspectRatio: 1.25,
    // height: 300, // Set the desired height for the image
    // resizeMode: 'cover', // Make the image cover the container
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
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    paddingHorizontal: 30,
    fontSize: 22,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderRadius: 20,
  },
  titlepriceTxt: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  revRate: {
    color: COLORS.white,
    fontFamily:"Sora-SemiBold",
    fontSize: 15,
  },

  descCont: {
    padding: 10
  },
  descTitle: {
    fontSize: 16,
    fontFamily:"Sora-SemiBold",
  },
  descBody: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.65)',
    fontFamily:"sora-regular",
    padding: 5
  },

  sizesCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  size: {
    backgroundColor: "#FFFFFF",
    width: '30%',
    padding: 10,
    borderRadius: 10,
    borderWidth:  0.7,
    borderColor:"#DEDEDE",
  },
  enableSize: {
    backgroundColor: "#FFF5EE",
    borderColor: "#C67C4E",
  },
  sizeTxt: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "#2F2D2C",
    textAlign: 'center',
  },
  enableSizeTxt: {
    color: "#C67C4E",
    borderColor: "#DEDEDE",
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
    justifyContent: 'center',
    backgroundColor: "#C67C4E",
    borderRadius: 15,
    padding: 10,
  },
  cartTxt: {
    fontSize: 17,
    fontFamily:"sora-regular",
    color: "#FFFFFF",
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
    width: 320,
    borderBottomWidth: 0.5,
    marginBottom: 10
  }
});