import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import sizeHelper from '../helpers/sizeHelper';
import FontFamilies from '../constants/Fonts';
import {green, green1, white, yellow} from '../constants/colors';
const PartnerAccountCard = ({item, index}) => {
  return (
    <View key={index} style={styles.colorbodyContainer}>
      <View style={styles.rowText}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            position: 'relative',
          }}>
          <Text style={styles.nameTxtStyle}>{item.Description}</Text>
        </View>

        <Text style={styles.rightTextStyles}>
          {item.Balance < 0
            ? `${Math.abs(item.Balance.toFixed(2))} Cr`
            : `${item.Balance.toFixed(2)} Dr`}
        </Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.borderWidthCtn}>
          <View style={styles.widthConatiner}>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>{'Transaction Number'}</Text>
              <Text style={styles.valuesTextStyle}>
                {item.TransactionNumber}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>{'Date'}</Text>
              <Text style={styles.valuesTextStyle}>{item.TransactionDate}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>{'Debit'}</Text>
              <Text style={[styles.valuesTextStyle, {color: green1}]}>
                {item.DebitAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>{'Credit'}</Text>
              <Text style={[styles.valuesTextStyle, {color: yellow}]}>
                {item.CreditAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '##F3F4F7',
  },
  searchContainer: {
    padding: sizeHelper.calHp(20),
    backgroundColor: '#25272E',
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  tabStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    height: sizeHelper.calHp(100),
    backgroundColor: '#595FD5',
    borderRadius: sizeHelper.calHp(50),
    marginLeft: sizeHelper.calWp(22),
  },
  tabTextStyle: {
    paddingHorizontal: sizeHelper.calWp(45),
    color: 'white',
    fontSize: sizeHelper.calHp(35),
    fontFamily: 'InterMedium',
  },
  colorbodyContainer: {
    marginVertical: sizeHelper.calHp(20),
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#25272E',
    borderRadius: sizeHelper.calHp(16),
  },
  rowText: {
    padding: sizeHelper.calHp(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameTxtStyle: {
    color: white,
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'InterBold',
    fontWeight: '500',
  },
  rightTextStyles: {
    color: white,
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'InterBold',
    fontWeight: '500',
  },
  innerContainer: {
    backgroundColor: white,
    borderRadius: sizeHelper.calHp(16),
  },
  borderWidthCtn: {
    margin: sizeHelper.calHp(40),
    marginBottom: sizeHelper.calHp(0),
    borderRadius: sizeHelper.calHp(12),
    borderWidth: 0.7,
    borderColor: '#D9D9D9',
    marginBottom: sizeHelper.calHp(20),
  },
  widthConatiner: {
    margin: sizeHelper.calHp(20),
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: sizeHelper.calHp(12),
  },
  keyTextValues: {
    color: '#25272E',
    fontWeight: '500',
    fontSize: sizeHelper.calHp(30),
    marginRight: sizeHelper.calWp(10),
    fontFamily: FontFamilies.InterSemiBold,
  },
  valuesTextStyle: {
    color: '#9D9C9C',
    fontWeight: '400',
    fontSize: sizeHelper.calHp(30),
    marginRight: sizeHelper.calWp(10),
    fontFamily: FontFamilies.InterMedium,
  },
});
export default PartnerAccountCard;
