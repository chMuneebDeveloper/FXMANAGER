import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { black, black1, blue1, white } from '../constants/colors';
import sizeHelper from '../helpers/sizeHelper';
 
const CounterActivity = ({data}) => {
    if (!data || !Array.isArray(data)) return null;

    const mappedData = data.map((item, index) => ({
      id: index + 1,
      icon: index === 0 ?  'file-remove-outline':index === 1 ? 'desktop-mac' : 'desktop-access-disabled' ,
      text: item.StringName,
      percentage: item.Count,
    }));
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.headingText}>{'Counter Activity'}</Text>
      <View style={styles.overAll}>
        {mappedData.map((item, index) => (
          <View key={item.id} style={styles.rowContainer}>
            {item.icon== 'file-remove-outline'?
            <MaterialCommunityIcons name={item.icon} size={sizeHelper.calHp(50)} color={blue1} style={styles.roundIconContainer} />
            :
            <MaterialIcons name={item.icon} size={sizeHelper.calHp(50)} color={blue1} style={styles.roundIconContainer} />
            }
              
            <Text style={styles.rowText}>{item.text}</Text>
            <View style={{flex: 1}}>
              <Text style={styles.percentageText}>{item.percentage}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={styles.spacer}></View>
    </View>
  );
};
 
export default CounterActivity;
 
const styles = StyleSheet.create({
  mainContainer: {
    marginVertical:sizeHelper.calHp(50),
    marginHorizontal : sizeHelper.calHp(50),
    width: '91%',
    backgroundColor: white,
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(15),
  },
  headingText: {
    paddingVertical: sizeHelper.calHp(25),
    paddingHorizontal: sizeHelper.calWp(18),
    fontFamily: 'InterSBold',
    textAlign: 'left',
    fontSize: sizeHelper.calHp(38),
    color: black1,
  },
  rowContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: sizeHelper.calWp(15),
    padding: sizeHelper.calHp(10),
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  roundIconContainer: {
    padding:sizeHelper.calHp(25),
    borderRadius: sizeHelper.calHp(100),
    backgroundColor: '#e6e7f5',
    overflow: 'hidden',
    justifyContent: 'center',
    alignSelf:'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  rowText: {
    color: black,
    fontFamily: 'InterSBold',
    textAlign: 'center',
    paddingHorizontal: sizeHelper.calWp(20),
    fontSize: sizeHelper.calHp(30),
    textTransform: 'capitalize', // or 'capitalize', 'uppercase', 'lowercase'
  },
  percentageText: {
    color: blue1,
    fontFamily: 'InterSBold',
    textAlign: 'right',
    paddingHorizontal: sizeHelper.calWp(10),
    fontSize: sizeHelper.calHp(30),
  },
  spacer: {
    height: 30,
    width: '100%',
  },
  overAll: {
    width: '95%',
    marginTop: sizeHelper.calHp(10),
    alignSelf: 'center',
    backgroundColor: white,
    borderRadius: sizeHelper.calHp(5),
    borderColor: '#D9D9D9',
    borderWidth: 1,
  },
});
 