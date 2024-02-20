import {
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const ButtonLoader = ({ show, color }) => {
    return show ? (
        <View style={style.loader}>
            <ActivityIndicator size="small" color={color} />
        </View>
    ) : null;
};

const style = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ButtonLoader;