import React from "react";
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import DomainURLScreen from "../screens/domainURL/index";
import LoginScreen from "../screens/login/index";
 const Stack = createNativeStackNavigator();

 const AuthStack=()=>{
return(
    <Stack.Navigator
    initialRouteName={'domainURL'}
    screenOptions={{ gestureEnabled: false }}>
    <Stack.Screen
      options={{ headerShown: false }}
      name={'domainURL'}
      component={DomainURLScreen}
    />
<Stack.Screen
      options={{ headerShown: false }}
      name={'login'}
      component={LoginScreen}
    />
  </Stack.Navigator> 
);
 };

 export default AuthStack;