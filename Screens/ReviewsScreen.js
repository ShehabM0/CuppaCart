import React, { useState, useEffect } from "react";
import { StyleSheet, View, StatusBar, ScrollView, SafeAreaView } from "react-native";

import ReviewButtonLink from "../Components/ReviewButtonLink";
import ReviewCard from "../Components/ReviewCard";
import { getReviews } from "../firebase/reviews"

export default function ReviewsScreen({ route }) {

  const { product_id } = route.params;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews(product_id)
    .then(data => setReviews(data))
    .catch(err => alert(err.message))
  }, []);

  return (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 2 : 0,}}>
      <ScrollView>
        <ReviewButtonLink
          image={'addImg'}
          name={"Add Review"}
          nav={"AddReview"}
          product_id={product_id}
        />

        <View style={styles.reviewsCont}>
          {reviews.map((reviewData) => {
            return (
              <ReviewCard
                userName={reviewData.user_name}
                reviewStars={reviewData.stars}
                reviewText={reviewData.text}
              />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  reviewsCont: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200
  }
});
