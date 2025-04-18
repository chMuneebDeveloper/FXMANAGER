import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash/index';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
const Stack = createNativeStackNavigator();
const RootStack = props => {
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'splash'} component={SplashScreen} />
        <Stack.Screen name={'Main'} component={MainStack} />
        <Stack.Screen name={'Auth'} component={AuthStack} />
      </Stack.Navigator>
    );
  };

  export default RootStack;