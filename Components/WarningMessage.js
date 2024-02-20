import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

export default function WarningMessage({ message, childToParent }) {

  const [show, setShow] = useState(true);

  useEffect(() => childToParent(show));

  if(show) {
    return (
      <>
        <View style={styles.layout} />
        <View style={styles.centered}>
          <View style={styles.messageCont}>
            <View style={{ position: "absolute", top: 10, right: 10 }}>
              <TouchableOpacity onPress={() => setShow(false)}>
                <Ionicons name="close" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <FontAwesome name="warning" size={50} color="orange" />
            <Text style={{ fontWeight: 'bold', color: "#9F6000", fontSize: 18 }}>Warning!</Text>
            { message && <Text style={styles.message}>{message}</Text> }
            {!message && (
              <Text style={styles.message}>
                Your request hasn't been done
              </Text>
            )}
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  layout: {
    position: "absolute",
    zIndex: 1,
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  centered: {
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
  },
  messageCont: {
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 15,
  },
  message: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  img: {
    width: 50,
    height: 50,
  },
});
