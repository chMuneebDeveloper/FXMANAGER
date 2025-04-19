import {StyleSheet} from 'react-native';
import {black, black2, blue, blue1, white} from '../../constants/colors';
import FontFamilies from '../../constants/Fonts';
import sizeHelper from '../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: black2,
  },
  rowBtnContainer: {
    flexDirection: 'row',
    marginHorizontal: sizeHelper.calWp(60),
    marginVertical: sizeHelper.calHp(40),
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: sizeHelper.calHp(50),
    height: sizeHelper.calHp(100),
    justifyContent: 'space-between',
    gap:sizeHelper.screenWidth > 450? sizeHelper.calWp(140) : sizeHelper.calWp(10)
  },
  btnStyles: {
    paddingHorizontal: sizeHelper.calWp(40),
    borderRadius: sizeHelper.calHp(60),
    backgroundColor: blue1,
    justifyContent: 'center',
    // width: '48%',
    //
  },

  btntextStyles: {
    textAlign: 'center',
    color: white,

    fontSize: sizeHelper.calHp(28),
    fontFamily: FontFamilies.InterSemiBold,
  },
  containerStyle: {
    marginTop: sizeHelper.calHp(40),
    width: '92%',
    margin: sizeHelper.calHp(50),
    padding: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(20),
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    width: '75%',
  },
  rowComponents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: sizeHelper.calHp(26),
  },
  headingTxt: {
    color: '#000000',
    fontSize: sizeHelper.calHp(40),
    fontFamily: 'InterMedium',
  },
  subHeading: {
    color: '#B5B9C0',
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterMedium',
  },
  textStyle: {
    paddingLeft: sizeHelper.calWp(20),
    fontSize: sizeHelper.calHp(35),
    color: '#000000',
  },
  firstBozStyle: {
    width: sizeHelper.calHp(35),
    height: sizeHelper.calHp(35),
    backgroundColor: '#8E55E9',
    borderRadius: sizeHelper.calHp(10),
  },
  secondBoxStyle: {
    marginLeft: sizeHelper.calWp(50),
    width: sizeHelper.calHp(35),
    height: sizeHelper.calHp(35),
    backgroundColor: '#FF9F29',
    borderRadius: sizeHelper.calHp(10),
  },
  tableContainer: {
    width: '9%',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: sizeHelper.calHp(40),
    borderRadius: sizeHelper.calHp(10),
    shadowColor: 'rgba(100, 100, 111, 0.7)',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: white,
    width: '90%',
  },
  tableHeadingText: {
    textAlign: 'left',
    color: black,
    fontSize: sizeHelper.calHp(36),
    fontFamily: FontFamilies.InterSemiBold,
    fontWeight: '500',
    paddingHorizontal: sizeHelper.calWp(40),
    paddingVertical: sizeHelper.calHp(30),
  },
  TableHeaderContainer: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#e9e9e9',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: sizeHelper.calWp(80),
    padding: sizeHelper.calHp(20),
  },
  rowContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: sizeHelper.calWp(80),
    justifyContent: 'space-between',
  },
  itemText: {
    fontFamily: 'InterMedium',
    color: '#333333',
    fontSize: sizeHelper.calHp(32),
  },
  amountText: {
    fontFamily: 'InterMedium',
    color: black,
    paddingLeft: sizeHelper.calWp(110),
    paddingTop: sizeHelper.calHp(10),
    textAlign: 'left',
    fontSize: sizeHelper.calHp(30),
  },
  vendorNameText: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    color: black,
    fontSize: sizeHelper.calHp(30),
  },
  TableHeaderAmount: {
    fontFamily: 'InterMedium',
    fontWeight: '500',
    color: '#000000',
    fontSize: sizeHelper.calHp(30),
    textAlign: 'left',
    right: sizeHelper.calWp(100),
  },
  graphView: {
    backgroundColor: 'white',
    margin: sizeHelper.calHp(50),
    padding: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(20),
  },
  graphHeading: {
    fontFamily: FontFamilies.InterSemiBold,
    fontSize: sizeHelper.calHp(38),
    paddingBottom: sizeHelper.calHp(40),
    color: black,
  },
  nullGraph: {
    resizeMode: 'center',
    height: sizeHelper.calHp(500),
    width: '100%',
    alignSelf: 'center',
  },
  graphContainer: {
    height: sizeHelper.calHp(500),
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default styles;
