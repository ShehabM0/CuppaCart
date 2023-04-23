import React from "react";
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView } from "react-native";

import ReviewButtonLink from "../Components/ReviewButtonLink";
import ReviewCard from "../Components/ReviewCard";

export default function ReviewsScreen() {
  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 2 : 0,}}>
      <ScrollView>
        <ReviewButtonLink
          image={'addImg'}
          name={"Add Review"}
          nav={"AddReview"}
        />

        <View style={styles.reviewsCont}>
          <ReviewCard
            userName={'Shehab Mohamed'}
            reviewStars={4}
            reviewText={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has "}
          />

          <ReviewCard
            userName={'Shehab Mohamed'}
            reviewStars={2}
            reviewText={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has "}
          />

          <ReviewCard 
            userName={'Shehab Mohamed'}
            reviewStars={5}
            reviewText={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has "}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewsCont: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});
