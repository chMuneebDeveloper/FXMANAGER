import {StyleSheet} from 'react-native';
import {black2} from '../../constants/colors';
import sizeHelper from '../../helpers/sizeHelper';

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: '#F3F4F7'},
  container: {
    flex: 1,
    backgroundColor: '##F3F4F7',
  },
  headerContainer: {
    backgroundColor: black2,
  },
  searchContainer: {
    alignItems: 'center',
    backgroundColor: '#25272E',
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  rowComp: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius: sizeHelper.calHp(70),
    margin: sizeHelper.calHp(25),
    alignItems: 'center',
    width: '88%',
    alignSelf:"center",
    paddingHorizontal:sizeHelper.calWp(25),
  },
  textStyle: {
    fontSize: sizeHelper.calHp(40),
    fontFamily: 'InterBold',
    color: '#000000',
    paddingLeft: sizeHelper.calWp(20),
  },
  textInputStyles: {
    paddingLeft: sizeHelper.calWp(25),
    width: '68%',
    color: '#25272E',
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterMedium',
    textAlign: 'left',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: sizeHelper.calHp(80),
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  allOrderHistoryText: {
    // width:size(460),
    paddingVertical:sizeHelper.calHp(30),
    width: '90%',
    backgroundColor: 'white',
    borderRadius: sizeHelper.calHp(2),
    alignSelf: 'center',
    marginTop: sizeHelper.calHp(60),
    justifyContent: 'center',
    zIndex: -1,
  },
  headingContainer: {
    flexDirection: 'row',
    height: sizeHelper.calHp(100),
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headinTextStyle: {
    fontSize: sizeHelper.calHp(34),
    fontFamily: 'InterBold',
    color: '#000000',
  },
  itemContainer: {
    width: '90%',
    alignSelf: 'center',
    padding: sizeHelper.calHp(40),
    flexDirection: 'row',
    backgroundColor: 'white',
    borderWidth: 0.4,
    borderColor: '#EAEAEA',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumTextStyle: {
    // paddingLeft:size(16),
    color: '#333333',
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterMedium',
    textAlign:'left'
  },
  arrowImageStyles: {
    height: sizeHelper.calHp(30),
    width: sizeHelper.calWp(30),
    resizeMode: 'contain',
  },
  spaceContainer: {
    height: sizeHelper.calHp(40),
    width: '15%',
    // backgroundColor: 'green',
  },
});

export default styles;
