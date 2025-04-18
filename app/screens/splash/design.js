import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Platform,
  I18nManager,
  Image
} from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import Logo from '../../assets/svg/white-logo.svg';
import style from './style';
import sizeHelper from '../../helpers/sizeHelper';
import { blue1 } from '../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
const Design = ({
    slides
}) => {
  const renderItem = ( item ) => {
    return (
     <View>
<View
  style={style.titleContainer}>
  <Text
    style={style.titleText}>
    {I18nManager.isRTL ? item.item.title1 : item.item.title}
  </Text>
  <Text
    style={style.context}>
    {I18nManager.isRTL ? item.item.text1 : item.item.text}
  </Text>
</View>

<Image
  source={item.item.image}
  resizeMode="contain"
  style={style.image}
/>
     </View> 
    );
  }

  return (
    <View style={style.mainContainer}>
      <StatusBar backgroundColor={blue1} barStyle="light-content" />
      {/* <ImageBackground source={require('../../assets/image/bgs.png')} style={style.splashBG}>
      <Logo height={200} width={250} />
      </ImageBackground> */}
      <ImageBackground source={sizeHelper.screenWidth > 450? require('../../assets/image/bgTab.png'):require('../../assets/image/bg1.png')} style={style.sliderBG}>
      <AppIntroSlider
        data={slides}
        activeDotStyle={style.activeDot}
        dotStyle={style.dotStyle}
        style={{flex:1}}
        renderItem={renderItem}
        renderNextButton={()=>{
          return(
            <Feather
            name={'arrow-right'}
            size={24}
            color="rgba(255, 255, 255, .9)"
          />
          )
        }}

        renderPrevButton={()=>{
          return(
            <Feather
            name={'arrow-left'}
            size={24}
            color="rgba(255, 255, 255, .9)"
          />
          )
        }}
          showSkipButton
          showPrevButton
      />
       </ImageBackground> 
    </View>
  );
};

export default Design;
