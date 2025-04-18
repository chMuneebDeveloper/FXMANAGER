import {StyleSheet} from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import {
  black2,
  black3,
  gray3,
  gray4,
  green,
  red1,
  white,
} from '../../constants/colors';
const styles = StyleSheet.create({
  Container: {
    backgroundColor: black2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(10),
    marginTop: sizeHelper.calHp(20),
  },
  TopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizeHelper.calHp(20),
  },
  Toptxt: {
    color: white,
    fontFamily: 'InterSBold',
    fontSize: sizeHelper.calHp(27),
  },
  bottomView: {
    backgroundColor: white,
    padding: sizeHelper.calHp(20),
    borderRadius: sizeHelper.calHp(10),
  },
  mainTxt: {
    color: black3,
    paddingBottom: sizeHelper.calHp(20),
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(25),
  },
  dashedLine: {
    width: '100%',
    borderBottomWidth: 1.5,
    borderColor: gray4,
    borderStyle: 'dashed',
    marginVertical: sizeHelper.calHp(10),
  },
  btnContainer: {
    flexDirection: 'row',
    marginTop: sizeHelper.calHp(20),
  },
  ApprovedBtn: {
    backgroundColor: green,
    paddingVertical: sizeHelper.calHp(15),
    paddingHorizontal: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(6),
  },
  RejectedBtn: {
    backgroundColor: red1,
    paddingVertical: sizeHelper.calHp(15),
    paddingHorizontal: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(6),
    marginLeft: sizeHelper.calHp(20),
  },
  btntxt: {
    color: white,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(25),
  },
  image: {
    width: sizeHelper.calHp(120),
    height: sizeHelper.calHp(120),
    borderRadius: sizeHelper.calHp(40),
    marginHorizontal: sizeHelper.calHp(20),
  },
  employeeName: {
    color: black3,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(30),
  },
  name: {
    color: black3,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(39),
  },
  employeeCode: {
    color: gray3,
    fontFamily: 'InterMedium',
    fontSize: sizeHelper.calHp(32),
  },
  emptyText: {
    fontSize: sizeHelper.calHp(40),
    fontFamily: 'InterSBold',
    paddingVertical: sizeHelper.calHp(30),
  },
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  flatListStyle: {
    paddingBottom: sizeHelper.calHp(450),
    paddingTop: sizeHelper.calHp(50),
  },
  headerContainer: {
    backgroundColor: black2,
  },
});

export default styles;
