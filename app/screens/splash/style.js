import { StyleSheet } from "react-native";
import sizeHelper from "../../helpers/sizeHelper";


 const style = StyleSheet.create({
    mainContainer:{
        //  flex:1,
         height: sizeHelper.screentHeight,
         width: sizeHelper.screenWidth,
         justifyContent: 'center',
        },
    splashBG:{
        flex:1,
        resizeMode:'cover',
        justifyContent:'center',
        alignItems:'center',
    },
    sliderBG:{
        flex:1,
        resizeMode:'cover',
        height: sizeHelper.screentHeight,
     width: sizeHelper.screenWidth,
    },
    titleContainer:{
        paddingVertical: sizeHelper.calHp(190),
        paddingHorizontal: sizeHelper.calWp(60),
        alignItems: 'center',
      },
      titleText:{
        fontSize: sizeHelper.calHp(55),
        color: '#fff',
        fontFamily: 'InterSBold',
        textAlign: 'center',
        paddingVertical: sizeHelper.calHp(20),
      },
      context:{
        fontSize: sizeHelper.calHp(35),
        fontFamily: 'InterRegular',
        color: '#fff',
        lineHeight: sizeHelper.calHp(50),
        textAlign: 'center',
      },
      image:{
        width: '100%',
        height: sizeHelper.calHp(980),
        alignSelf: 'center',
        resizeMode: 'contain',
      },
    dotStyle:{
        backgroundColor: '#B4B2E4',
        width:sizeHelper.calWp(60),
        height:sizeHelper.calHp(8)
    },
    activeDot:{
        backgroundColor: 'white',
        width:sizeHelper.calWp(90),
        height:sizeHelper.calHp(8),
    },
    
})

export default style;