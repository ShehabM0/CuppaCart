import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartupScreen from '../Screens/StartupScreen';
import Signin from '../Screens/Sign-in ';
import Signup from '../Screens/Sign-up';
import CreditCard from '../Screens/CreditCard';
import CreateCreditCard from '../Screens/CreateCreditCard';
import ForgetPasswordScreen from '../Screens/ForgetPasswordScreen';
import AdminScreen from '../Screens/AdminScreen';
import AddProductScrenn from '../Screens/AddProductScreen';
import TabsNav from './TabsNav';
import HomeScreen from '../Screens/HomeScreen';
import ProductScreen from '../Screens/ProductScreen';
import AddReviewScreen from '../Screens/AddReviewScreen';
import ReviewsScreen from '../Screens/ReviewsScreen';
import CheckoutScreen from '../Screens/CheckoutScreen';
import CartScreen from '../Screens/CartScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import CheckoutCart from '../Screens/CheckoutCart';
import PaymentCart from '../Screens/PaymentCart';
import DeleteProductScreen from '../Screens/DeleteProductScreen';
import EditProductScreen from '../Screens/EditProductScreen';
import EditUserScreen from '../Screens/EditUserScreen';
import AddAdminScreen from '../Screens/AddAdminScreen';
import DeleteUserScreen from '../Screens/DeleteUserScreen';
import AllUsersScreen from '../Screens/AllUsersScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} > 
     <Stack.Screen name='Startup' component={StartupScreen}/>
     <Stack.Screen name='SignIn' component={Signin}/>
     <Stack.Screen name='SignUp' component={Signup}/>
     <Stack.Screen name='CreditCard' component={CreditCard}/>
     <Stack.Screen name='CreateCreditCard' component={CreateCreditCard}/>
     <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen}/>
     <Stack.Screen name='Admin' component={AdminScreen}/>
     <Stack.Screen name='AddProduct' component={AddProductScrenn}/>
     <Stack.Screen name='DeleteProduct' component={DeleteProductScreen}/>
     <Stack.Screen name='EditProduct' component={EditProductScreen}/>
     <Stack.Screen name='EditUserScreen' component={EditUserScreen}/>
     <Stack.Screen name='AddAdmin' component={AddAdminScreen}/>
     <Stack.Screen name='DeleteUser' component={DeleteUserScreen}/>
     <Stack.Screen name='AllUsers' component={AllUsersScreen}/>
     <Stack.Screen name='TabsNav' component={TabsNav}/>
   </Stack.Navigator>
  )
}

const ProductStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Product' component={ProductScreen}/>
      <Stack.Screen name='Reviews' component={ReviewsScreen}/>
      <Stack.Screen name='AddReview' component={AddReviewScreen}/>
      <Stack.Screen name='Home' component={HomeScreen}/>
      <Stack.Screen name='Checkout' component={CheckoutScreen}/>
      <Stack.Screen name='Payment' component={PaymentScreen}/>
    </Stack.Navigator>
  )
}

const CartStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name='Cart' component={CartScreen}/>
      <Stack.Screen name='CheckoutCart' component={CheckoutCart}/>
      <Stack.Screen name='PaymentCart' component={PaymentCart}/>
    </Stack.Navigator>
  )
}

  
export  {MainStack,ProductStack,CartStack}