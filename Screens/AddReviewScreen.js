import React, { useState } from "react";
import { ScrollView, Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";

import Stars from "../Components/Stars";
import { COLORS } from "../Conts/Color";

export default function ProductScreen() {

  const [reviewBody, setReviewBody] = useState('');
  const [reviewStars, setReviewStars] = useState(0);

  const childToParent = (childData) => {
    setReviewStars(childData);
  }

  return (
    <>
      <ScrollView>
        <View style={styles.imgbgLayout} />
        <View style={styles.imgCont}>
          <View>
            <Image
              style={styles.img}
              source={require("../assets/nathan-dumlao-3.jpg")}
            />
          </View>
        </View>
        <View style={styles.titleCont}>
          <Text style={styles.titleTxt}>
            Cappuccino
          </Text>
        </View>

    
        <View style={styles.starsCont}>
          <Text style={styles.starsTxt}>
            Your overall rating of this drink
          </Text>
          <Stars childToParent={childToParent}/>
        </View>

        <Text style={styles.questionTxt}> What did you like or dislike?</Text>
        <View style={styles.inputCont}>
          <TextInput
            editable
            multiline
            numberOfLines={6}
            maxLength={500}
            value={reviewBody}
            onChangeText={(value) => setReviewBody(value)}
            style={styles.input}
            textAlignVertical='top'
            placeholder="What should shoppers know before?"
          />
        </View>

        <View style={styles.submitCont}>
          <TouchableOpacity activeOpacity={0.7} style={styles.submitBtn}>
              <Text style={styles.btnTxt}> Submit </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingLeft: 10,
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
    alignItems: 'center'
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
