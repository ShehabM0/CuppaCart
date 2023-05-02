import React, { useState } from "react";
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";

import SuccessMessage from "../Components/SuccessMessage"
import Stars from "../Components/Stars";
import { getCurrUserId, getUserById } from "../firebase/user";
import { addReview } from "../firebase/reviews";
import { COLORS } from "../Conts/Color";

import { getProductByID } from "../firebase/products"

export default function AddReviewScreen({ navigation, route }) {

  const user_id = getCurrUserId();
  const { product_id } = route.params;

  const [productImg, setProductImage] = useState(null);
  const [productTitle, setProductTitle] = useState(null);
  const [userName, setUserName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewStars, setReviewStars] = useState(0);
  const [starsError, setStarsError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [success, setSuccess] = useState(false);

  getProductByID(product_id)
  .then(data => { setProductImage(data.image); setProductTitle(data.productName); route = { id: product_id, ...data }; })
  .catch(err => alert(err.message));

  getUserById(user_id)
  .then(user => setUserName(user[0].firstname + " " + user[0].lastname))
  .catch(err => alert(err.message));


  const childToParent = (childData) => {
    setReviewStars(childData);
  }

  async function handleSubmit() {
    validStar = validateStars();
    validTxt = validateText();
    if(validStar && validTxt) {
      const reviewData = {
        text: reviewText.trim(),
        stars: reviewStars,
        user_name: userName,
        user_id: user_id,
        product_id: product_id,
      };
      addReview(reviewData)
      .then(({ status, message }) => {
        if(status) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
          setTimeout(() => {
            navigation.navigate('Product', route);
          }, 3100);
        } else {
          alert(message);
        }
      })
      .catch(error => alert(error.message))
    }
  }

  function validateStars() {
    if(!reviewStars) {
      setStarsError(true);
      return false;
    }
    setStarsError(false);
    return true;
  }

  function validateText() {
    if(!reviewText) {
      setTextError(true);
      return false;
    }
    setTextError(false);
    return true;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.imgbgLayout} />
        <View style={styles.imgCont}>
          <View>
            <Image
              style={styles.img}
              source={{uri: productImg}}
            />
          </View>
        </View>
        <View style={styles.titleCont}>
          <Text style={styles.titleTxt}>
            {productTitle}
          </Text>
        </View>

    
        <View style={styles.starsCont}>
          <Text style={styles.starsTxt}>
            Your overall rating of this drink
          </Text>
          <Stars childToParent={childToParent}/>
        </View>

        {
          starsError &&
          <Text style={{color: 'red', textAlign: 'center'}}>
            Number of stars can't be empty
          </Text>
        }

        <Text style={styles.questionTxt}>What did you like or dislike?</Text>
        <View style={styles.inputCont}>
          <TextInput
            editable
            multiline
            numberOfLines={6}
            maxLength={500}
            value={reviewText}
            onChangeText={(value) => setReviewText(value)}
            style={styles.input}
            textAlignVertical='top'
            placeholder="What should shoppers know before?"
          />
          {
            textError &&
            <Text style={{color: 'red', textAlign: 'center'}}>
              Text input can't be empty
            </Text>
          }
        </View>


        <View style={styles.submitCont}>
          <TouchableOpacity activeOpacity={0.7} style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.btnTxt}> Submit </Text>
          </TouchableOpacity>
        </View>


      </ScrollView>
      {
          success &&
          <SuccessMessage message={"Your review has been added"}/>
      }
    </>
  );
}

const styles = StyleSheet.create({
  imgbg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imgbgLayout: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  imgCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  img: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 15,
  },
  titleCont: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  titleTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkBlue1
  },

  starsTxt: {
    color: 'grey',
    fontSize: 16,
    marginBottom: 10
  },
  starsCont: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },

  questionTxt: {
    marginTop: 20,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold'
  },

  inputCont: {
    padding: 20,
  },
  input: {
    backgroundColor: COLORS.light,
    borderRadius: 5,
    padding: 10,
  },

  submitCont: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 100
  },
  submitBtn: {
    height: 55,
    width: '60%',
    backgroundColor: COLORS.black,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:15,
  },
  btnTxt: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
