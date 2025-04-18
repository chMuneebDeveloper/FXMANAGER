
import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { I18nManager as RNI18nManager } from "react-native";
import sizeHelper from "../helpers/sizeHelper";
 
const CustomButton = (props) => {
  console.log(props.onPress);
 
  const setButton = (props) => {
    if (!props.loading) {
      return (
        <View>
          <TouchableOpacity
            {...props}
            style={{ height: sizeHelper.calHp(100), width: "100%" }}
            backgroundColor={props.backgroundColor}
            onPress={props.onPress}
            disabled={props.disabled}
          >
            <Image style={styles.btnImage} source={props.source} />
            <View style={styles.textView}>
              <Text style={props.style}>{props.name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <ActivityIndicator color={"blue"} />;
    }
  };
 
  return (
    <View {...props} style={styles.loginContainer}>
      {setButton(props)}
    </View>
  );
};
 
const styles = StyleSheet.create({
  loginContainer: {
    width: "100%",
    height: sizeHelper.calHp(100),
    justifyContent: "center",
    alignContent: "center",
    borderRadius: sizeHelper.calHp(10),
    overflow: "hidden",
  },
  btnImage: {
    height: sizeHelper.calHp(120),
    width: "50%",
    alignSelf: RNI18nManager.isRTL ? "flex-end" : "flex-start",
    borderRadius: sizeHelper.calHp(10),
  },
  textView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
 
export default CustomButton;