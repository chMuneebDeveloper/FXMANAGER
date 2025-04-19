import React, { useEffect } from 'react';
import {View, Text,StyleSheet,TouchableOpacity,I18nManager,Platform} from 'react-native';
import { blue1, blue2, white } from '../constants/colors';
import sizeHelper from '../helpers/sizeHelper';
import Feather from 'react-native-vector-icons/Feather';
const Header =({goBack,text,moveToProfile})=>{


    return(
    <View style={[styles.mainContainer,{
      paddingTop: Platform.OS === 'android'?sizeHelper.calHp(30): sizeHelper.calHp(120),
        height:  Platform.OS === 'android'? sizeHelper.calHp(200): sizeHelper.calHp(250),
        }]}>
        {goBack?<TouchableOpacity
        onPress={goBack}>
            <Feather
              name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
              size={sizeHelper.calHp(60)}
              color={white}
            />
          </TouchableOpacity>:<View/>}

          <Text
              style={styles.headerText}
              numberOfLines={1}>
              {text}
            </Text>
        <TouchableOpacity
          onPress={moveToProfile}
            // style={{
            //   paddingHorizontal: sizeHelper.calHp(22),
            // }}
            >
            <Feather
              name={'users'}
              size={sizeHelper.calHp(60)}
              color={white}
            />
          </TouchableOpacity>
    </View>
    );
};

const styles = StyleSheet.create({
    mainContainer:{
        
        backgroundColor:blue2,
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection: 'row',
        paddingHorizontal:sizeHelper.calHp(30),
        paddingVertical:sizeHelper.calHp(10),
        borderBottomLeftRadius:sizeHelper.calHp(90)
    },
    headerText:{
        color: white,
        fontFamily: 'InterBold',
        paddingLeft: sizeHelper.calHp(15),
        textAlign: 'center',
        fontSize: sizeHelper.calHp(45),
      }
})

export default Header;