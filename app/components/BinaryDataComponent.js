import {StyleSheet, Text, I18nManager, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import sizeHelper from '../helpers/sizeHelper';
import { black, gray1, white } from '../constants/colors';
import FontFamilies from '../constants/Fonts';
 
const BinaryDataComponent = ({
  aboveText,
  bottomText,
  color,
  progressWidth,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.aboveText}>{aboveText}</Text>
        <View
          style={{
            transform: [{rotate: I18nManager.isRTL ? '180deg' : '0deg'}],
            paddingLeft:sizeHelper.calWp(20),
          }}>
          <Feather
            name={I18nManager.isRTL ? 'trending-down' : 'trending-up'}
            color={color}
            size={sizeHelper.calHp(40)}
          />
        </View>
      </View>
      <View style={styles.progressBarCont}>
        <View
          style={[
            styles.progress,
            {backgroundColor: color, width: progressWidth},
          ]}
        />
      </View>
      <Text style={styles.bottomTextStyle}>{bottomText}</Text>
    </View>
  );
};
 
export default BinaryDataComponent;
 
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: white,
    padding: 10,
    margin: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calHp(20),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderLeftColor: white,
    borderBottomColor: white,
    borderRightColor: white,
    elevation: 2,
  },
  aboveText: {
    fontSize: sizeHelper.calHp(32),
    color: 'rgba(0, 0, 0, 1)',
    fontFamily: FontFamilies.InterSemiBold,
  },
  progressBarCont: {
    width: '100%',
    height: sizeHelper.calHp(10),
    backgroundColor: '#C9C9C9',
    borderRadius: sizeHelper.calHp(10),
    width:sizeHelper.calWp(290),
    marginVertical: sizeHelper.calHp(15),
  },
  progress: {
    borderRadius: sizeHelper.calHp(10),
    height: sizeHelper.calHp(10),
    
  },
  bottomTextStyle: {
    fontSize: sizeHelper.calHp(26),
    color: black,
    fontFamily: FontFamilies.InterBold,
  },
});