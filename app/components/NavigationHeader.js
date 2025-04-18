import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {black2, blue2, white} from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontFamilies from '../constants/Fonts';
import sizeHelper from '../helpers/sizeHelper';
import {useRoute} from '@react-navigation/native';
const NavigationHeader = ({TabsNavigations}) => {
  const Tabs = [
    {id: 'Procurement', title: 'Procurement'},
    {id: 'Finance', title: 'Finance'},
    {id: 'Pos', title: 'POS'},
    {id: 'Hrstaffhub', title: 'Staff Hub'},
  ];


  
  const route = useRoute();
  const [activeModules, setactiveModules] = useState(route.name);
  const [selectedTab, setSelecetTab] = useState(route.name);

  const allModules = [
    { id: 1, navigation: 'Finance', title: 'Finance' },
    { id: 2, navigation: 'Procurement', title: 'Procurement' },
    { id: 3, navigation: 'Pos', title: 'POS' },
    { id: 4, navigation: 'Hrstaffhub', title: 'Staff Hub' },
    // { id: 5, navigation: 'EcomHub', title: 'E-Commerce' },                                                       // these tab use in Feathurs
    // { id: 13, navigation: 'RestaurantHub', title: 'Restaurant' },
    // { id: 14, navigation: 'CrmHub', title: 'CRM' },
    // { id: 29, navigation: 'ProductionHub', title: 'Production' }
  ];

  const GetModules =async()=>{
    const Modules = await AsyncStorage.getItem('MODULEIDS');
    const moduleIds = Modules ? Modules.split(',').map(Number) : [];
    console.log('moduleIds----',moduleIds);
    // const moduleIds= [1,2,3];                                                                                 // for testing Purples
    const activeModules = allModules.filter(module => moduleIds.includes(module.id));
    console.log('Modules----',activeModules);
    setactiveModules(activeModules);
  }
  useEffect(()=>{
    
    GetModules();
    
  },[]);


  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelecetTab(item.navigation);
          TabsNavigations(item.navigation);
        }}
        style={[
          styles.buttonStyle,
          {backgroundColor: item.navigation === selectedTab ? blue2 : black2},
        ]}>
        <Text style={styles.buttonText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={activeModules}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default NavigationHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: black2,
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calWp(40),
    borderBottomLeftRadius: sizeHelper.calHp(90),
  },
  buttonStyle: {
    marginHorizontal: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calHp(50),

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontFamily: FontFamilies.InterMedium,
    fontSize: sizeHelper.calHp(35),
    marginVertical: sizeHelper.calHp(20),
    marginHorizontal: sizeHelper.calWp(30),
  },
});
