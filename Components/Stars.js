import React, { useState, useEffect } from "react";
import { Image, StyleSheet, View, Pressable } from "react-native";

export default function Stars({childToParent}) {

  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  let stars = [star1, star2, star3, star4, star5];
  let starsSetter = [setStar1, setStar2, setStar3, setStar4, setStar5];

  useEffect(() => {
    for(let i = 4; i > -1; i--) {
      if(stars[i]) {
        childToParent(i + 1);
        break;
      }
      childToParent(0);
    }
  }, [star1, star2, star3, star4, star5]);

  function setGold1() {
    if (stars[0]) {
      for (let i = 0; i < 5; i++) starsSetter[i](false);
    } else {
      (from = 0), (end = 1);
      for (let i = 0; i < 1; i++) starsSetter[i](true);
    }
  }
  function setGold2() {
    if (stars[1]) {
      for (let i = 2; i < 5; i++) starsSetter[i](false);
    } else {
      for (let i = 0; i < 2; i++) starsSetter[i](true);
    }
  }
  function setGold3() {
    if (stars[2]) {
      for (let i = 3; i < 5; i++) starsSetter[i](false);
    } else {
      for (let i = 0; i < 3; i++) starsSetter[i](true);
    }
  }
  function setGold4() {
    if (stars[3]) {
      for (let i = 4; i < 5; i++) starsSetter[i](false);
    } else {
      for (let i = 0; i < 4; i++) starsSetter[i](true);
    }
  }
  function setGold5() {
    if (stars[4]) {
      for (let i = 5; i < 5; i++) starsSetter[i](false);
    } else {
      for (let i = 0; i < 5; i++) starsSetter[i](true);
    }
  }

  return (
    <View style={{ flexDirection: "row" }}>
      <Pressable onPress={setGold1}>
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
      </Pressable>

      <Pressable onPress={setGold2}>
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
      </Pressable>

      <Pressable onPress={setGold3}>
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
      </Pressable>

      <Pressable onPress={setGold4}>
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
      </Pressable>

      <Pressable onPress={setGold5}>
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
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  startImg: {
    width: 40,
    height: 40,
  },
});
