import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartupScreen from '../Screens/StartupScreen';
import Signin from '../Screens/Sign-in ';
import Signup from '../Screens/Sign-up';
import CreditCard from '../Screens/CreditCard';
import CreateCreditCard from '../Screens/CreateCreditCard';
import ChangeCreditCard from '../Screens/ChangeCreditCard';
import ForgetPasswordScreen from '../Screens/ForgetPasswordScreen';
import ChangePassword from "../Screens/ChangePassword"
import AdminScreen from '../Screens/AdminScreen';
import AddProductScrenn from '../Screens/AddProductScreen';
import TabsNav from './TabsNav';
import DeleteProductScreen from '../Screens/DeleteProductScreen';
import EditProductScreen from '../Screens/EditProductScreen';
import EditUserScreen from '../Screens/EditUserScreen';
import AddAdminScreen from '../Screens/AddAdminScreen';
import DeleteUserScreen from '../Screens/DeleteUserScreen';
import AllUsersScreen from '../Screens/AllUsersScreen';
import AllProductScreen from '../Screens/AllProductScreen';
import LocationScreen from '../Screens/LocationScreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}} > 
     <Stack.Screen name='Startup' component={StartupScreen}/>
     <Stack.Screen name='SignIn' component={Signin}/>
     <Stack.Screen name='SignUp' component={Signup}/>
     <Stack.Screen name='CreditCard' component={CreditCard}/>
     <Stack.Screen name='CreateCreditCard' component={CreateCreditCard}/>
     <Stack.Screen name='ChangeCreditCard' component={ChangeCreditCard}/>
     <Stack.Screen name='ForgetPassword' component={ForgetPasswordScreen}/>
     <Stack.Screen name="ChangePassword" component={ChangePassword}/>
     <Stack.Screen name='Admin' component={AdminScreen}/>
     <Stack.Screen name='AddProduct' component={AddProductScrenn}/>
     <Stack.Screen name='DeleteProduct' component={DeleteProductScreen}/>
     <Stack.Screen name='EditProduct' component={EditProductScreen}/>
     <Stack.Screen name='EditUserScreen' component={EditUserScreen}/>
     <Stack.Screen name='AddAdmin' component={AddAdminScreen}/>
     <Stack.Screen name='DeleteUser' component={DeleteUserScreen}/>
     <Stack.Screen name='AllUsers' component={AllUsersScreen}/>
     <Stack.Screen name='AllProduct' component={AllProductScreen}/>
     <Stack.Screen name='TabsNav' component={TabsNav}/>
     <Stack.Screen name='LocationScreen' component={LocationScreen}/>
   </Stack.Navigator>
  )
}

  
export {MainStack}