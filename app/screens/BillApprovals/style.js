import {StyleSheet} from 'react-native';
import {black, black2, red1, white} from '../../constants/colors';
import FontFamilies from '../../constants/Fonts';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: '#F3F4F7'},
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
  },
  headerContainer: {
    backgroundColor: black2,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#25272E',
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  NavigationContainer: {
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor: black2,
    paddingVertical: sizeHelper.calHp(20),
    paddingHorizontal: sizeHelper.calWp(40),
    borderBottomLeftRadius: sizeHelper.calHp(90),
  },
  buttonStyle: {
    marginHorizontal: sizeHelper.calWp(20),
    borderRadius: sizeHelper.calHp(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontFamily: FontFamilies.InterMedium,
    fontSize: sizeHelper.calHp(35),
    marginVertical: sizeHelper.calHp(20),
    marginHorizontal: sizeHelper.calWp(30),
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
  dropDownStyle: {
    backgroundColor: '#25272E',
    borderColor: 'white',
    borderWidth: 1,
  },
  dropDownLabel: {
    color: 'white',
    fontFamily: 'InteSemiBold',
    fontSize: sizeHelper.calHp(32),
    
  },
  pickerConStyle: {
    // width: '25%',
    borderWidth: 0,
    backgroundColor: 'white',
    
  },
  headerBox:{
    justifyContent:'center',
    justifyContent:'center',
    flexDirection:'row',
    width:'75%',
    paddingHorizontal:sizeHelper.calWp(20)
  },
  button: {
    width: '25%',
    height: sizeHelper.calHp(70),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeHelper.calHp(16),
  },
  approvedBtn: {
    backgroundColor: '#4CAF50',
  },
  rejectedBtn: {
    backgroundColor: red1,
  },
  buttonText1: {
    color: 'white',
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(28),
  },
  rowBtn: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginBottom: sizeHelper.calHp(20),
  },
  nullGraph: {
    resizeMode: 'center',
    height: sizeHelper.calHp(500),
    width: '100%',
    alignSelf: 'center',
  },
  DropdownContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  triggerButton: {
    flexDirection: 'row',
    width: sizeHelper.calHp(220),
    height: sizeHelper.calHp(80),
    borderWidth: sizeHelper.calHp(2),
    borderColor: white,
    borderRadius: sizeHelper.calHp(16),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: black2,
    gap: 5,
  },
  menuOptions: {
    marginTop: sizeHelper.calHp(80),
    borderRadius: sizeHelper.calHp(10),
    paddingVertical: sizeHelper.calHp(15),
    paddingHorizontal: sizeHelper.calHp(10),
    backgroundColor: black2,
    width: sizeHelper.calHp(220),
    backgroundColor:"white"

  },
  menuOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuText: {
    color: black,
    fontFamily: FontFamilies.InterMedium,
    fontSize: sizeHelper.calHp(28),
  },
  titleText: {
    fontFamily: FontFamilies.InterMedium,
    fontSize: sizeHelper.calHp(28),
    color: white,
  },
  textInputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '85%',
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(55),
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(30),
    paddingVertical:sizeHelper.calHp(15),
    marginTop:sizeHelper.calHp(30),
  },
  textInputStyles: {
    borderRadius: sizeHelper.calHp(50),
    paddingHorizontal: sizeHelper.calWp(30),
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(34),
    color:black,
    flex:1
  },
});

export default styles;
