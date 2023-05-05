import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { ProductStack, CartStack } from "./ProductCartStack";
import ProfileScreen from "../Screens/ProfileScreen";
import ProfileScreen2 from "../Screens/ProfileScreen2";
import { FontAwesome } from "@expo/vector-icons";
import SettingsScreen from "../Screens/SettingsScreen";
import Fav from "../Screens/FavScreen";


const Tab = createBottomTabNavigator();
const TabsNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          // height: 60,
          // position: "absolute",
          // bottom: 20,
          // right: 16,
          // left: 16,
          // borderRadius: 16,
          // shadowRadius: 10,
          // flex: 1,
          // justifyContent: 'center',
          // alignItems: 'center',
          paddingBottom: 5,
          borderTopWidth: 0, // use borderTopWidth instead of borderWidth for iOS Handling
          borderTopColor: "transparent", // use borderTopColor instead of borderColor for removing the white line in iOS
          overflow: "hidden",
          shadowColor: "transparent",
          elevation: 0,
        },
        tabBarInactiveTintColor: "#8D8D8D",
        tabBarActiveTintColor: "#C67C4E",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={ProductStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Fav"
        component={Fav}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen2}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user-o" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="opencart" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabsNav;
