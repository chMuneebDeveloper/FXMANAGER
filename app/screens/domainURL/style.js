import sizeHelper from "../../helpers/sizeHelper";
import { I18nManager, StyleSheet } from "react-native";
import { black, black2, gray, white } from "../../constants/colors";
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
        marginTop: sizeHelper.calHp(260),
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
      },
      bottomContainer:{
        backgroundColor: white,
        
        width: '100%',
        borderTopLeftRadius: sizeHelper.calHp(100),
        padding: sizeHelper.calHp(30),
        paddingHorizontal: sizeHelper.calHp(50),
        paddingBottom: sizeHelper.calHp(100),
      },
      labelText:{
        fontSize: sizeHelper.calHp(34),
        fontFamily: 'InterMedium',
        color: black,
        paddingTop: sizeHelper.calHp(50),
      },
      inputTextContainer:{
        borderWidth: 1,
        borderRadius: sizeHelper.calHp(10),
        borderColor: gray,
        paddingVertical: sizeHelper.calHp(10),
        paddingHorizontal: sizeHelper.calHp(20),
        marginTop: sizeHelper.calHp(15),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      textInput:{
        color: black2,
                  flex: 1,
                  fontSize: sizeHelper.calHp(30),
                  fontFamily: 'InterMedium',
                  // paddingLeft: size(15),
                  textAlign: 'left',
      },
      buttonContainer:{
        backgroundColor: black2,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: sizeHelper.calHp(30),
        borderRadius: sizeHelper.calHp(10),
        marginTop: sizeHelper.calHp(80),
        // marginVertical: sizeHelper.calHp(30),
      },
      buttonText:{
        color: white,
        fontSize: sizeHelper.calHp(32),
        fontFamily: 'InterMedium',
      }
});

export default style;