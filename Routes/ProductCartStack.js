import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import ProductScreen from "../Screens/ProductScreen";
import CheckoutScreen from "../Screens/CheckoutScreen";
import CartScreen from "../Screens/CartScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import AddReviewScreen from "../Screens/AddReviewScreen";
import ReviewsScreen from "../Screens/ReviewsScreen";
const Stack = createNativeStackNavigator();

const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="Reviews" component={ReviewsScreen} />
      <Stack.Screen name="AddReview" component={AddReviewScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="Payment" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="PaymentCart" component={PaymentScreen} />
    </Stack.Navigator>
  );
};

export { ProductStack, CartStack };
