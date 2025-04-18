import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/splash/index';
import LoginScreen from '../screens/login/index';
import DomainURLScreen from '../screens/domainURL/index';
import ProcurementScreen from '../screens/procurement/index';
import ProfileScreen from '../screens/profile/index';
import StaffHubScreen from '../screens/staffHub';
import POSScreen from '../screens/pos';
import FinanceScreen from '../screens/finance';
import PartnerStatementofAccounts from '../screens/PartnerStatementofAccounts/index';
import MainAccountsSummary from '../screens/MainAccountsSummary/index';
import BillHistory from '../screens/billHistory/index';
import CreditHistory from '../screens/CreditHistory/index';
const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={'Procurement'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen
        options={{headerShown: false}}
        name={'splash'}
        component={SplashScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'login'}
        component={LoginScreen}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name={'domainURL'}
        component={DomainURLScreen}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'none'}}
        name={'Procurement'}
        component={ProcurementScreen}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'none'}}
        name={'Finance'}
        component={FinanceScreen}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'none'}}
        name={'Pos'}
        component={POSScreen}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'none'}}
        name={'Hrstaffhub'}
        component={StaffHubScreen}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'fade', gestureEnabled: false}}
        name={'profile'}
        component={ProfileScreen}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'fade', gestureEnabled: false}}
        name={'PartnerStatementofAccounts'}
        component={PartnerStatementofAccounts}
      />
      <Stack.Screen
        options={{headerShown: false, animation: 'fade', gestureEnabled: false}}
        name={'MainAccountsSummary'}
        component={MainAccountsSummary}
      />

      <Stack.Screen
        options={{headerShown: false, animation: 'fade', gestureEnabled: false}}
        name={'BillHistory'}
        component={BillHistory}
      /> 
      <Stack.Screen
        options={{headerShown: false, animation: 'fade', gestureEnabled: false}}
        name={'CreditHistory'}
        component={CreditHistory}
      /> 
    </Stack.Navigator>
    
  );
};

export default MainStack;
