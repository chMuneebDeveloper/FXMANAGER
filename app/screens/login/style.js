import sizeHelper from "../../helpers/sizeHelper";
import { I18nManager, StyleSheet } from "react-native";
import { red, white } from "../../constants/colors";
const style= StyleSheet.create({
    mainBG:{
        // flex:1,
        resizeMode:'cover',
        height: sizeHelper.screentHeight,
     width: sizeHelper.screenWidth,
    },
    goBack:{
        marginTop: sizeHelper.calHp(130),
        paddingHorizontal: sizeHelper.calHp(30),
      },
      textContainer:{
        alignSelf: 'center',
        marginTop: sizeHelper.calHp(50),
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      headingText:{
        color:white,
        fontFamily:'InterSBold',
        fontSize: sizeHelper.calHp(50),
        textAlign:'center',
        lineHeight:sizeHelper.calHp(100),
      },
      context:{
        color:white,
        fontFamily:'InterMedium',
        fontSize: sizeHelper.calHp(34),
        textAlign:'center',
        paddingBottom:sizeHelper.calHp(100),
      },
      imageStyle:{
        width: '100%',
        height: sizeHelper.calHp(615),
        alignSelf: 'center',
      },
      bottomContainer:{
        backgroundColor: white,
        width: '100%',
        borderTopLeftRadius: sizeHelper.calHp(100),
        paddingHorizontal: sizeHelper.calHp(50),
        paddingBottom:sizeHelper.calHp(90)
      },
      labelText:{
        fontSize: sizeHelper.calHp(34),
        fontFamily: 'InterMedium',
        color: '#000',
        paddingTop: sizeHelper.calHp(50),
      },
      inputTextContainer:{
        borderWidth: 1,
        borderRadius: sizeHelper.calHp(15),
        borderColor: '#d9d9d9',
        paddingVertical: sizeHelper.calHp(15),
        paddingHorizontal: sizeHelper.calHp(20),
        marginTop: sizeHelper.calHp(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      buttonContainer:{
        backgroundColor: '#25272E',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: sizeHelper.calHp(30),
        borderRadius: sizeHelper.calHp(10),
        marginTop: sizeHelper.calHp(50),
        marginBottom: sizeHelper.calHp(50),
      },
      buttonText:{
        color: white,
        fontSize: sizeHelper.calHp(32),
        fontFamily: 'InterMedium',
      },
     
      errorText: {
        //textAlign: 'right',
        color: red,
        fontFamily: 'InterMedium',
        marginTop: sizeHelper.calHp(5),
        fontSize: sizeHelper.calHp(27),
        marginStart: sizeHelper.calWp(5),
      },
});

export default style;