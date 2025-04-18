import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { black, blue1, white } from '../constants/colors';
import sizeHelper from '../helpers/sizeHelper';

const Loading = ({ message = "Loading..." }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={blue1} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width:'100%',
    position:'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Semi-transparent background
  },
  text: {
    fontFamily: 'InterMedium',
    textTransform: 'capitalize',
    marginTop: sizeHelper.calHp(10),
    fontSize: sizeHelper.calHp(30),
    color: white,
  },
});

export default Loading;
