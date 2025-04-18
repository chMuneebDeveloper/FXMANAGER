import React from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TextInput,
  StatusBar,
  I18nManager,
  TouchableOpacity,
} from 'react-native';
import sizeHelper from '../../helpers/sizeHelper';
import style from './style';
import Feather from 'react-native-vector-icons/Feather';
import {black, black1, gray, gray1} from '../../constants/colors';
import CustomAlert from '../../components/CustomAlert';
import Loading from '../../components/Loading';
const Design = ({
  keyboardStatus,
  setDomainUrl,
  domainUrl,
  checkDomian,
  isAlert,
  alertMessage,
  onCloseAlert,
  isLoading
}) => {
  return (
    <View>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle={'light-content'}
      />

      <ImageBackground
        source={
          sizeHelper.screenWidth > 450
            ? require('../../assets/image/bgTab.png')
            : require('../../assets/image/bg1.png')
        }
        style={style.mainBG}>
        <View style={style.textContainer}>
          <Text style={style.headingText}>
            {I18nManager.isRTL ? 'إعادة توجيه عنوان ورل' : 'Redirect URL'}
          </Text>
          <Text style={style.context}>
            {I18nManager.isRTL
              ? 'أدخل عنوانورل لمجالك وسنأخذك إلى إدارة أعمال ERP المتنقلة عالية الكفاءة والمريحة.'
              : 'Enter your domain URL and we will take you to your highly efficient and convenient mobile ERP business management.'}{' '}
          </Text>
          {!keyboardStatus ? (
            <Image
              resizeMode={'contain'}
              source={require('../../assets/image/Domainurl.png')}
              style={{
                width: '100%',
              }}
            />
          ) : null}
        </View>

        <View
          style={[
            style.bottomContainer,
            {
              position: keyboardStatus ? 'relative' : 'absolute',
              bottom: keyboardStatus ? sizeHelper.calHp(-350) : 0,
            },
          ]}>
          <Text style={style.labelText}>Enter Domain Url</Text>

          <View style={style.inputTextContainer}>
            <TextInput
              style={style.textInput}
              placeholder="Enter Url"
              placeholderTextColor={gray1}
              onChangeText={setDomainUrl}
            />
            <Text
              style={{
                fontSize: sizeHelper.calHp(30),
                color: black1,
                paddingHorizontal: 10,
                textAlign: 'left',
                fontFamily: 'InterMedium',
              }}>
              {'.finexcloud.com'}
            </Text>
            <Feather name="globe" size={sizeHelper.calHp(50)} color={gray1} />
          </View>

          <TouchableOpacity
            style={[
              style.buttonContainer,
              {
                backgroundColor: domainUrl == '' ? gray1 : black1,
              },
            ]}
            onPress={checkDomian}
            disabled={domainUrl == ''}>
            <Text style={style.buttonText}>GO</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <CustomAlert
        visible={isAlert}
        message={alertMessage}
        onClose={onCloseAlert}
      />
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
