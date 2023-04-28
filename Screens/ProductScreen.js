import React, { useState } from "react";
import {
  Platform,
  StatusBar,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  SafeAreaView,
  Pressable,
} from "react-native";

import ReviewButtonLink from "../Components/ReviewButtonLink";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { COLORS } from "../Conts/Color";
import { AntDesign } from "@expo/vector-icons";
export default function ProductScreen({ navigation }) {
  const [arrow, setArrow] = useState(true);
  const [price, setPrice] = useState(21.99);
  const [coin, setCoin] = useState(40);
  const [qnt, setQnt] = useState(1);
  const { height, width } = Dimensions.get("window");

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
    if (qnt - 1) setQnt(qnt - 1);
  }
  const sizes = ["S", "M", "L"];
  const [activeSize, setActiveSize] = useState(null);

  return (
    <>
      <View style={styles.imgbgLayout} />
      <SafeAreaView
        style={{
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 2 : 0,
        }}
      >
        <ScrollView>
          <ImageBackground
            source={require("../assets/nathan-dumlao-1.jpg")}
            style={{
              height: height / 2 + 20,

              justifyContent: "space-between",
            }}
            imageStyle={{
              borderRadius: 30,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "#0C0F14",
                  padding: 10,
                  borderRadius: 15,
                }}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" color="white" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: "#0C0F14",
                  padding: 10,
                  borderRadius: 15,
                }}
                onPress={() => {
                  handleAddto();
                }}
              >
                <Ionicons name="heart" color="white" size={20} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                borderRadius: 30,
                overflow: "hidden",
              }}
            >
              <BlurView
                intensity={120}
                tint="dark"
                style={{
                  padding: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "white",
                      fontWeight: "600",
                      marginBottom: 10,
                    }}
                  >
                    productName
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#b5b5b5",
                      fontWeight: "500",
                      marginBottom: 10,
                    }}
                  >
                    Price:${price}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <Ionicons name="star" size={15} color="#D17842" />
                    <Text
                      style={{
                        color: "white",
                        marginLeft: 10,
                      }}
                    >
                      4
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "35%",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        padding: 5,
                        width: 50,
                        height: 50,
                        backgroundColor: "#0C0F14",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="cafe" size={20} color="white" />
                      <Text
                        style={{
                          color: "#b5b5b5",
                          fontSize: 10,
                        }}
                      >
                        Coffee
                      </Text>
                    </View>
                    <View
                      style={{
                        padding: 5,
                        width: 50,
                        height: 50,
                        backgroundColor: "#0C0F14",
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons name="water" size={20} color={"#D17842"} />
                      <Text
                        style={{
                          color: "#b5b5b5",
                          fontSize: 10,
                        }}
                      >
                        Milk
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "#0C0F14",
                      padding: 5,
                      borderRadius: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: "#b5b5b5",
                        fontSize: 13,
                      }}
                    >
                      Medium roasted
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>
          </ImageBackground>

          <View style={styles.cont}>
            <Text
              style={{
                color: "#b5b5b5",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Description
            </Text>

            <Text numberOfLines={8} style={{ color: "white", fontSize: 15 }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s{" "}
            </Text>
          </View>

          <View style={styles.sizesCont}>
            {/* <TouchableOpacity style={styles.size} onPress={setSmall}>
              <Text style={styles.sizeTxt}>Small</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size} onPress={setMedium}>
              <Text style={styles.sizeTxt}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.size} onPress={setLarge}>
              <Text style={styles.sizeTxt}>Large</Text>
            </TouchableOpacity> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {sizes.map((size, index) => (
                <TouchableOpacity
                  onPress={() => setActiveSize(size)}
                  key={index}
                  style={[
                    {
                      borderWidth: 2,
                      marginLeft: 12,
                      paddingVertical: 5,
                      borderRadius: 10,
                      backgroundColor: "#D17842",
                      width: width / 3 - 20,
                      alignItems: "center",
                    },
                    activeSize == size && {
                      borderColor: "#D17842",
                      backgroundColor: "#0C0F14",
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        color: "white",
                        fontSize: 19,
                      },
                      activeSize === size && {
                        color: "#D17842",
                      },
                    ]}
                  >
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.qntcartCont}>
            <View style={styles.qntCont}>
              <Pressable onPress={decreaseQnt}>
                <AntDesign
                  name="minuscircleo"
                  size={28}
                  color={"#D17842"}
                />
              </Pressable>
              <Text style={styles.qntTxt}> {qnt} </Text>
              <Pressable onPress={increaseQnt}>
                <AntDesign
                  name="pluscircleo"
                  size={28}
                  color={"#D17842"}
                />
              </Pressable>
            </View>

            <View>
              <TouchableOpacity>
                <View style={styles.cartCont}>
                  <Text style={styles.cartTxt}>Buy Now</Text>
                  <Image
                    style={styles.cartImg}
                    source={require("../assets/cart_black.png")}
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
            bgcolor={"#D17842"}
            nav={"Reviews"}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: "column",
    margin: 10,
  },

  imgbg: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imgbgLayout: {
    backgroundColor: COLORS.darkBlue1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  imgTitlePriceCont: {
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1,
  },

  titlePriceCont: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    padding: 10,
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: "rgba(0,0,0,0.45)",
    borderRadius: 20,
  },
  title: {
    width: "70%",
    paddingLeft: 20,
  },
  priceCont: {
    width: "40%",
  },
  titlepriceTxt: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
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
    fontWeight: "bold",
    fontSize: 15,
  },

  descCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.lightOrange,
    borderRadius: 20,
    padding: 5,
    marginVertical: 10,
    borderWidth: 1,
  },
  descTitle: {
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.black,
    paddingLeft: 10,
  },
  desc: {
    fontWeight: "bold",
    padding: 10,
    color: "rgba(255, 255, 255, 0.8)",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 20,
    lineHeight: 25,
  },
  downArrow: {
    width: 30,
    height: 30,
  },

  sizesCont: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
  },
  size: {
    backgroundColor: COLORS.lightOrange,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  sizeTxt: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },

  qntcartCont: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartCont: {
    flexDirection: "row",
    marginRight:10,
    backgroundColor: "#D17842",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
  },
  cartTxt: {
    fontSize: 20,
    color: COLORS.white,
    fontWeight: "700",
  },
  cartImg: {
    width: 30,
    height: 30,
    marginLeft: 20,
  },

  qntCont: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: COLORS.lightOrange,
  },
  reviewTxt: {
    paddingLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: COLORS.black,
  },
  rightArrow: {
    width: 25,
    height: 25,
  },

  horizontalLineCont: {
    justifyContent: "center",
    alignItems: "center",
  },
  horizontalLine: {
    borderBottomColor: "grey",
    width: "80%",
    borderBottomWidth: 0.5,
    marginBottom: 20,
  },
});
