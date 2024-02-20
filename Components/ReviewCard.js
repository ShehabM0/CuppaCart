import React, { useState } from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 

import ReviewCardStars from "../Components/ReviewCardStars"

export default function ReviewCard({ userName, reviewStars, reviewText, verified }) {

  const [readMore, setReadMore] = useState(false);

  handleTextLayout = (e) => {
    const numberOfLines = e.nativeEvent.lines.length;
    if(numberOfLines >= 3)
      setReadMore(true);
  }

  return (
    <View style={styles.cardCont}>
        <View style={styles.user_ImgNameRev_Cont}>
            <View style={{ flexDirection: 'row' }}>
                <Image
                    source={require('../assets/user_icon.png')}
                    style={styles.userImg}
                />
                <Text ellipsizeMode='tail' numberOfLines={1} style={styles.userName}> { userName } </Text>
                {
                  verified &&
                  <Ionicons name="checkmark-circle" size={20} color="black" />
                }
            </View>
            <View style={{ paddingLeft: 5 }}>
                <ReviewCardStars number={ reviewStars }/>
            </View>
        </View>
        <View style={{ paddingVertical: 10 }}>
            <Text onTextLayout={handleTextLayout} style={{ color: 'rgba(0, 0, 0, 0.7)' }}>
              { reviewText }
            </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCont: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
      marginVertical: 10,
      borderRadius: 5,
      width: '90%',
      padding: 20,
  },
  user_ImgNameRev_Cont: {
    justifyContent: 'space-between',
    flexDirection: 'row',
      marginBottom: 5,
  },
  userImg: {
      width: 25,
      height: 25,
  },
  userName: {
    width: 120,
    fontWeight: 'bold'
  },
});
