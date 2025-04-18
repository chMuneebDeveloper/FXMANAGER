import {StyleSheet} from 'react-native';
import {black, black1, black2, gray2, white} from '../../constants/colors';
import sizeHelper from '../../helpers/sizeHelper';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: black2,
    borderBottomLeftRadius: sizeHelper.calHp(90),
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    height: '100%',
    marginRight: sizeHelper.calWp(30),
    alignSelf: 'center',
    marginTop: sizeHelper.calHp(20),
    paddingLeft: sizeHelper.calHp(50),
  },
  profileImage: {
    width: sizeHelper.calHp(120),
    height: sizeHelper.calHp(120),
    overflow: 'hidden',
    borderRadius: sizeHelper.calHp(80),
    borderColor: white,
    borderWidth: 2,
    margin: sizeHelper.calHp(5),
  },
  image: {
    width: sizeHelper.calHp(120),
    height: sizeHelper.calHp(120),
  },
  editProfileImage: {
    backgroundColor: white,
    position: 'absolute',
    bottom: sizeHelper.calHp(30),
    right: 0,
    padding: sizeHelper.calHp(8),
    borderRadius: sizeHelper.calHp(50),
  },
  profileNameText: {
    color: white,
    fontSize: sizeHelper.calHp(40),
    fontFamily: 'InterMedium',
    paddingTop: sizeHelper.calHp(20),
    textTransform: 'capitalize',
  },
  ProfilePhoneNumber: {
    color: '#CBCBCB',
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterMedium',
  },
  backgroundImage: {
    flex: 1,
  },
  quickLinksText: {
    fontSize: sizeHelper.calHp(50),
    fontWeight: 'bold',
    color: black2,
    fontFamily: 'InterSBold',
    textAlign: 'left',
    paddingHorizontal: sizeHelper.calWp(26),
    paddingVertical: sizeHelper.calHp(40),
  },
  versionsText: {
    textAlign: 'center',
    color: black1,
    fontSize: sizeHelper.calHp(30),
    fontFamily: 'InterSBold',
    paddingHorizontal: sizeHelper.calWp(26),
    padding: sizeHelper.calHp(10),
    marginBottom: sizeHelper.calHp(25),
  },
  buttonStyle: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    marginVertical: sizeHelper.calHp(15),
    alignSelf: 'center',
    justifyContent: 'space-between',
    overflow: 'hidden',
    marginHorizontal: sizeHelper.calWp(30),
    borderRadius: sizeHelper.calHp(10),
    backgroundColor: white,
    flexDirection: 'row',
    padding: sizeHelper.calHp(20),
    shadowColor: 'rgba(100, 100, 111, 0.7)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 12,
    borderWidth:1,
    borderColor: gray2,
  },
  vectorIconStyle: {
    padding: sizeHelper.calHp(20),
    backgroundColor: gray2,
    borderRadius: sizeHelper.calHp(10),
  },
  textLabels: {
    color: black,
    fontFamily: 'InterMedium',
    textAlign: 'center',
    paddingHorizontal: sizeHelper.calWp(15),
    fontSize: sizeHelper.calHp(32),
  },
});

export default styles;
