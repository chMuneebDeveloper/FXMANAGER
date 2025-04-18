import {StyleSheet} from 'react-native';
import {
  black1,
  black2,
  blue,
  blue2,
  blue3,
  gray3,
  white,
} from '../../constants/colors';
import FontFamilies from '../../constants/Fonts';
import sizeHelper from '../../helpers/sizeHelper';
const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: '#F3F4F7'},
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
  },
  searchContainer: {
    backgroundColor: '#25272E',
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  headerContainer: {
    backgroundColor: black2,
  },
  colorbodyContainer: {
    width: '90%',
    alignSelf: 'center',
    // marginTop: sizeHelper.calHp(40),
    // backgroundColor: '#25272E',
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
    backgroundColor: 'white',
    borderRadius: sizeHelper.calHp(14),
    padding: sizeHelper.calHp(40),
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
  dropDnContainer: {
    width: '89.9%',
    alignSelf: 'center',
    borderWidth: 0,
    elevation: 2,
    top: sizeHelper.calHp(125),
  },
  subHeadingText: {
    fontSize: sizeHelper.calHp(39),
    color: 'white',
    paddingVertical: sizeHelper.calHp(40),
    alignSelf: 'center',
  },
  borderContainer: {
    borderRadius: sizeHelper.calHp(12),
    borderWidth: sizeHelper.calHp(1),
    borderColor: '#D9D9D9',
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizeHelper.calHp(35),
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: 'center',
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    width: '100%',
  },

  cancelText: {
    fontSize: 18,
    color: 'red',
  },

  okText: {
    fontSize: 18,
    color: 'blue',
  },
  loadingContainer: {
    width: '100%',
    height: sizeHelper.calHp(150),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingButton: {
    width: sizeHelper.calHp(280),
    backgroundColor: white,
    borderRadius: sizeHelper.calHp(40),
    marginTop: sizeHelper.calHp(15),
    borderWidth: 1,
    borderColor: gray3,
    paddingVertical: sizeHelper.calHp(8),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadingText: {
    fontFamily: FontFamilies.InterSemiBold,
    color: gray3,
    paddingHorizontal: sizeHelper.calWp(20),
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
  container: {
    flex: 1,
    backgroundColor: '#F3F4F7',
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
  borderWidthCtn: {
    margin: sizeHelper.calHp(40),
    marginBottom: sizeHelper.calHp(0),
    borderRadius: sizeHelper.calHp(12),
    borderWidth: 0.7,
    borderColor: '#D9D9D9',
    marginBottom: sizeHelper.calHp(20),
  },
});

export default styles;
