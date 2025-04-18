import {StyleSheet} from 'react-native';
import {black1, black2, blue3, white} from '../../constants/colors';
import FontFamilies from '../../constants/Fonts';
import sizeHelper from '../../helpers/sizeHelper';
const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: '#F3F4F7'},
  container: {
    flex: 1,
    backgroundColor: '##F3F4F7',
  },
  searchContainer: {
    padding: sizeHelper.calHp(22),
    backgroundColor: '#25272E',
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  tabStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    height: sizeHelper.calHp(100),
    borderRadius: sizeHelper.calHp(100),
    marginLeft: sizeHelper.calWp(22),
  },
  tabTextStyle: {
    paddingHorizontal: sizeHelper.calWp(45),
    color: white,
    fontSize: sizeHelper.calHp(35),
    fontFamily: 'InterMedium',
  },
  colorbodyContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: sizeHelper.calHp(40),
    backgroundColor: '#25272E',
    borderRadius: sizeHelper.calHp(16),
  },
  dropDown: {
    marginVertical: '3%',
    borderRadius: sizeHelper.calHp(100),
    width: '90%',
    // height: sizeHelper.calHp(90),
    alignSelf: 'center',
    borderWidth: 0,
  },
  innerContainer: {
    backgroundColor: white,
    borderRadius: sizeHelper.calHp(14),
  },

  widthConatiner: {
    margin: sizeHelper.calHp(20),
  },
  keyTextStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: sizeHelper.calHp(10),
  },
  keys: {
    color: '#25272E',
    fontWeight: 'bold',
    marginRight: sizeHelper.calHp(10),
    fontFamily: 'InterBold',
  },
  values: {
    color: '#9D9C9C',
    marginRight: sizeHelper.calWp(5),
    fontFamily: 'InterMedium',
  },
  loginButton: {
    color: 'white',
    fontSize: sizeHelper.calHp(37),
    fontFamily: 'InterBold',
    backgroundColor: '#25272E',
  },
  btnContainer: {
    backgroundColor: '#25272E',
    marginTop: sizeHelper.calHp(45),
    width: '90%',
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(18),
  },
  borderWidthCtn: {
    margin: sizeHelper.calHp(40),
    borderRadius: sizeHelper.calHp(12),
    borderWidth: 0.7,
    borderColor: '#D9D9D9',
  },
  dropDnContainer: {
    width: '89.9%',
    alignSelf: 'center',
    borderWidth: 0,
    elevation: 2,
    marginTop: sizeHelper.calHp(20),
  },
  headerContainer: {
    backgroundColor: black2,
  },
  subHeadingText: {
    fontSize: sizeHelper.calHp(39),
    color: 'white',
    paddingVertical: sizeHelper.calHp(20),
    alignSelf: 'center',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizeHelper.calHp(30),
  },

  leftText: {
    fontFamily: 'InterBold',
    fontSize: sizeHelper.calHp(32),
    fontWeight: '600',
    color: '#25272E',
  },
  rightText: {
    fontFamily: 'InterBold',
    fontSize: sizeHelper.calHp(32),
    fontWeight: '600',
    color: '#9D9C9C',
  },
  valuesTextStyle: {
    color: 'white',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(10),
    fontFamily: 'InterRegular',
    paddingVertical: sizeHelper.calHp(10),
    paddingHorizontal: sizeHelper.calWp(10),
    marginLeft: sizeHelper.calWp(20),
  },
  textContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: sizeHelper.calHp(10),
    justifyContent: 'space-between',
  },
  keyTextValues: {
    color: white,
    fontWeight: '500',
    fontSize: sizeHelper.calHp(30),
    marginRight: sizeHelper.calWp(10),
    fontFamily: FontFamilies.InterSemiBold,
  },
  blueContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: blue3,
    borderRadius: sizeHelper.calHp(16),
  },
  textContainer: {
    flexDirection: 'row',
    margin: sizeHelper.calHp(5),
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sizeHelper.calHp(30),
  },
});

export default styles;
