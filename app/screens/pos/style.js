import {StyleSheet} from 'react-native';
import {black, black2} from '../../constants/colors';
import FontFamilies from '../../constants/Fonts';
import sizeHelper from '../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: black2,
  },
  
  graphView:{
    backgroundColor:'white',
    margin:sizeHelper.calHp(50),
    padding:sizeHelper.calHp(30),
    borderRadius:sizeHelper.calHp(20),
  },
  graphHeading:{
    fontFamily:FontFamilies.InterSemiBold,
    fontSize:sizeHelper.calHp(38),
    paddingBottom:sizeHelper.calHp(20),
    color:black,
  },
  nullGraph:{
    resizeMode: 'center',
    height: sizeHelper.calHp(500),
    width: '100%',
    alignSelf: 'center',
  },
  graphContainer:{
    height: sizeHelper.calHp(500),
    width: '100%',
    alignSelf: 'center',
  },
  
});

export default styles;
