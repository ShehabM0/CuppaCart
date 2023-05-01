import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput, Searchbar } from "react-native-paper";
import { getCities, subscribe } from "../db/cities/Cities";
import { async } from "@firebase/util";
import Product from "../pages/Product";
import { Button } from "react-native-elements";

const Search = () => {
  const getCitiesList = async () => {
    const c = await getCities();
    setCities(c);
  };

  useEffect(() => {
    getCitiesList();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
      if (change.name === "added") {
        getCitiesList();
      }
      if (<change className="type" /> === "modified") {
        getCitiesList();
      }
      if (change.name === "removed") {
        getCitiesList();
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [data, setData] = useState([]);
  const [cities, setCities] = useState([]);

  const [searched, setsearched] = useState("");
  const Searchp = (n) => {
    let x = [];
    let j = 0;
    for (let i = 0; i < cities.length; i++) {
      if (cities[i].name.match(n)) {
        x[j] = cities[i];
        j++;
      }
    }
    setData(x);
  };

  //const matchString=data.match(searched);

  return (
    <ScrollView Vertical={true}>
      <View style={{ backgroundColor: "" }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "##fff",
            height: 40,
            margin: 5,
            padding: 5,
          }}
        >
          <Searchbar
            placeholder="Search"
            value={searched}
            onChangeText={(e) => {
              Searchp(e), setsearched(e);
            }}
          />
          <View
            style={{
              paddingHorizontal: 2,
              paddingVertical: 15,
              paddingBottom: 55,
            }}
          >
            {data.map((e, index) => (
              <Product item={e} key={index} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;

const styles = StyleSheet.create({
  TextInput: {
    flex: 1,
    backgroundColor: "##fff",
    height: 40,
    margin: 5,
    padding: 5,
  },
});
