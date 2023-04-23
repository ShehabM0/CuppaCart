import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";

export default function ReviewCardStars({number}) {
  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  let starsSetter = [setStar1, setStar2, setStar3, setStar4, setStar5];

  useEffect(() => {
    for(let i = 0; i < 5; i++)
        starsSetter[i](false);
    if(number > 0 && number < 6) {
      for(let i = 0; i < number; i++)
        starsSetter[i](true);
    } else if (number > 5) {
      for(let i = 0; i < 5; i++)
        starsSetter[i](true);
    } else {
      starsSetter[0](true);
    }
  }, [number]);

  return (
    <View style={styles.starsCont}>
        {!star1 && (
          <Image
            source={require("../assets/empty_star.png")}
            style={styles.startImg}
          />
        )}
        {star1 && (
          <Image
            source={require("../assets/gold_star.png")}
            style={styles.startImg}
          />
        )}

        {!star2 && (
          <Image
            source={require("../assets/empty_star.png")}
            style={styles.startImg}
          />
        )}
        {star2 && (
          <Image
            source={require("../assets/gold_star.png")}
            style={styles.startImg}
          />
        )}

        {!star3 && (
          <Image
            source={require("../assets/empty_star.png")}
            style={styles.startImg}
          />
        )}
        {star3 && (
          <Image
            source={require("../assets/gold_star.png")}
            style={styles.startImg}
          />
        )}

        {!star4 && (
          <Image
            source={require("../assets/empty_star.png")}
            style={styles.startImg}
          />
        )}
        {star4 && (
          <Image
            source={require("../assets/gold_star.png")}
            style={styles.startImg}
          />
        )}

        {!star5 && (
          <Image
            source={require("../assets/empty_star.png")}
            style={styles.startImg}
          />
        )}
        {star5 && (
          <Image
            source={require("../assets/gold_star.png")}
            style={styles.startImg}
          />
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  starsCont: {
    flexDirection: "row",
  },
  startImg: {
    width: 20,
    height: 20,
  },
});
