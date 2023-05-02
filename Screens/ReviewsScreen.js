import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, StatusBar, ScrollView, SafeAreaView } from "react-native";

import ReviewButtonLink from "../Components/ReviewButtonLink";
import ReviewCard from "../Components/ReviewCard";
import Loader from '../Components/Loader';
import { getReviews } from "../firebase/reviews";

export default function ReviewsScreen({ route }) {

  const { product_id } = route.params;
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
    getReviews(product_id)
    .then(data => setReviews(data))
    .catch(err => alert(err.message));
  }, []);

  return (reviews.length > 0) ? 
  (
    <SafeAreaView style={{ paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 2 : 0,}}>
      <ScrollView>
        <ReviewButtonLink
          image={1}
          name={"Add Review"}
          nav={"AddReview"}
          product_id={product_id}
        />

        <View style={{ justifyContent: 'center', alignItems: 'center', paddingBottom: 200 }}>
          {
            reviews.map((reviewData, index) => {
              return (
                <ReviewCard
                  key={index}
                  userName={reviewData.user_name}
                  reviewStars={reviewData.stars}
                  reviewText={reviewData.text}
                />
              );
            })
          }
        </View>
      </ScrollView>
    </SafeAreaView>
    ) :
    (
      <>
      <Loader visible={loading} />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Looks like this product doesn't have any reviews yet.
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
            Be the first to leave a review
          </Text>
          <ReviewButtonLink
            image={1}
            name={"Add Review"}
            nav={"AddReview"}
            product_id={product_id}
          />
        </View>
      </View>
      </>
    )
}

