import React, { cloneElement, useState } from "react";
import { ScrollView, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

export default function ProductPage() {

  const [arrow, setArrow] = useState(true);

  return (
      <ScrollView>
        <View style={styles.imgbgLayout}/>
        <View style={styles.imgContCont}>
          <View style={styles.imgCont}>
            <Image 
              style={styles.img}
              source={require('../assets/nathan-dumlao-tA90pRfL2gM-unsplash.jpg')}>
            </Image>
          </View>
        </View>
        <View style={styles.titlepriceCont}>
          <View style={styles.title}>
            <Text style={styles.titlepriceTxt}>
              Product Title, could be Longer and longer
            </Text>
          </View>

          <View style={styles.priceCont}>
            <Text style={styles.titlepriceTxt}>
              <Image 
                style={styles.downArrow} 
                source={require('../assets/dollar_sign.png')}
              /> 14.99
            </Text>

            <Text style={styles.titlepriceTxt}>
              <Image 
                style={styles.downArrow} 
                source={require('../assets/coin.png')}
              /> 30
            </Text>
            
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
              <Text style={styles.desc}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Text>
            </View>
          }
        </View>

        <View style={styles.sizesCont}>
          <TouchableOpacity style={styles.size}>
            <Text style={styles.sizeTxt}>Small</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.size}>
            <Text style={styles.sizeTxt}>Medium</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.size}>
            <Text style={styles.sizeTxt}>Large</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cartContCont}>
          <TouchableOpacity style={styles.cart}>
            <View style={styles.cartCont}>
              <Text style={styles.cartTxt}>Add To Cart</Text>
              <Image 
                style={styles.cartImg}
                source={require('../assets/cart.png')}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  cont: {
    flexDirection: 'column',
    margin: 10,
  },
  descCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 5
  },
  descTitle: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#000',
    paddingLeft: 10
  },
  desc: {
    fontWeight: 'bold',
    padding: 10,
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20
  },
  downArrow: {
    width: 30,
    height: 30,
  },

  imgbg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imgbgLayout: {
    backgroundColor: '#ffe4c4',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imgContCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  imgCont: {
    shadowColor: '#52006A',  
    elevation: 20,  
  },
  img: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
  },
  titlepriceCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    fontSize: 22,
    fontWeight: 'bold',
  },
  title: {
    width: '70%',
    paddingLeft: 20
  },
  priceCont: {
    width: '40%',
  },
  titlepriceTxt: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },

  sizesCont: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  size: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 10
  },
  sizeTxt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },


  cartContCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20
  },

  cartCont: {
    flexDirection: 'row',
    backgroundColor: '#00FF00',
    borderRadius: 15,
    paddingHorizontal: 50,
    paddingVertical: 10
  },
  cartTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  cartImg: {
    width: 30,
    height: 30,
    marginLeft: 20
  }
});
