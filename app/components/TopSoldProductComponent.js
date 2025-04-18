import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import sizeHelper from '../helpers/sizeHelper';
import { black, gray, white } from '../constants/colors';
 
const TopSoldProductComponent = ({text, numberText, backgroundColor, width,borderBottomWidth}) => {

  return (
    <View style={[styles.container,{borderBottomWidth}]}>
      <View style={styles.rowItems}>
        <Text style={styles.textStyle}>{text}</Text>
        <Text style={styles.numberText}>{numberText}</Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.fullWidthProgess]}>
          <View style={[styles.progress, {backgroundColor, width}]} />
        </View>
      </View>
    </View>
  );
};
 
export default TopSoldProductComponent;
 
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: sizeHelper.calWp(20),
    alignSelf: 'center',
    paddingVertical: sizeHelper.calHp(20),borderRadius:sizeHelper.calHp(10),
    
    borderColor: gray,
    backgroundColor: white,
  },
  rowItems: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterMedium',
    color: black,
    paddingVertical: sizeHelper.calHp(10),
  },
  numberText: {
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterMedium',
    color: black,
    paddingVertical: sizeHelper.calHp(10),
  },
  progressBarContainer: {
    paddingVertical: sizeHelper.calHp(10),
    width: '100%',
    alignSelf: 'center',
  },
  fullWidthProgess: {
    width: '100%',
    height: sizeHelper.calHp(10),
    backgroundColor: '#C9C9C9',
    borderRadius: sizeHelper.calHp(10),
  },
  progress: {
    borderRadius: sizeHelper.calHp(10),
    // backgroundColor: 'red',
    // width: '20%',
    height: sizeHelper.calHp(10),
  },
});
 