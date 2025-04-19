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
  useColorScheme,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';

import sizeHelper from '../../helpers/sizeHelper';
import style from './style';
import Feather from 'react-native-vector-icons/Feather';
import {gray1} from '../../constants/colors';
import CustomAlert from '../../components/CustomAlert';
import Loading from '../../components/Loading';

const Design = ({
  keyboardStatus,
  setVisiblePassword,
  isVisiblePassword,
  goBack,
  isAlert,
  alertMessage,
  onCloseAlert,
  isLoading,
  managerLogin
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const loginValidationSchema = yup.object().shape({
    userName: yup.string().required('Name is required'),
    password: yup.string().required('Password is required'),
  });

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
        <View>
          <TouchableOpacity style={style.goBack} onPress={goBack}>
            <Feather
              name={I18nManager.isRTL ? 'chevron-right' : 'chevron-left'}
              size={sizeHelper.calHp(80)}
              color={'#fff'}
            />
          </TouchableOpacity>
        </View>

        <View style={style.textContainer}>
          <Text style={style.headingText}>
            {I18nManager.isRTL ? 'تسجيل الدخول' : 'Login'}
          </Text>
          <Text style={style.context}>
            {I18nManager.isRTL
              ? 'أضف معلومات تسجيل الدخول الخاصة بك بشكل صحيح حيث يتيح لك التطبيق الوصول إلى وحدات إدارة الأعمال. تأكد من عدم مشاركة معلومات تسجيل الدخول الخاصة بك مع أي شخص.'
              : 'Add your login information correctly as the app allows you access to business management modules. Be sure not to share your login information with anyone.'}
          </Text>
          {!keyboardStatus ? (
            <Image
              resizeMode={'contain'}
              source={require('../../assets/image/Login.png')}
              style={style.imageStyle}
            />
          ) : null}
        </View>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{
            userName: '',
            password: '',
          }}
          validateOnChange={false} // Disable validation on change
          validateOnBlur={false}
          onSubmit={values => {
            managerLogin(values);
            // navigation.replace('Home', {screen: 'ryderorders'});
          }}>
          {({handleChange, handleSubmit, values, errors, isValid}) => (
            <View style={[style.bottomContainer]}>
              <Text style={style.labelText}>{'User name'}</Text>

              <View style={style.inputTextContainer}>
                <TextInput
                  style={{
                    width: '90%',
                  }}
                  onChangeText={handleChange('userName')}
                  value={values.userName}
                  name={'userName'}
                  error={errors.userName}
                  placeholder="Enter username"
                  placeholderTextColor={gray1}
                  // value={}
                  // onChangeText={text => }
                />
                <Feather
                  name="user"
                  size={sizeHelper.calHp(50)}
                  color={gray1}
                />
              </View>
              {errors.userName && (
                <Text style={style.errorText}>{errors.userName}</Text>
              )}
              <Text style={style.labelText}>Password</Text>

              <View style={style.inputTextContainer}>
                <TextInput
                  style={{
                    width: '90%',
                    color: isDarkMode ? '#000' : '#000',
                  }}
                  name={'password'}
                  onChangeText={handleChange('password')}
                  placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
                  placeholder="********"
                  // placeholderTextColor={gray1}
                  secureTextEntry={!isVisiblePassword}
                  value={values.password}
                  // value={}
                  // onChangeText={text => }
                />
                <TouchableOpacity
                  onPress={() => {
                    setVisiblePassword(!isVisiblePassword);
                  }}>
                  <Feather
                    name={!isVisiblePassword ? 'eye' : 'eye-off'}
                    size={sizeHelper.calHp(50)}
                    color={gray1}
                  />
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={style.errorText}>{errors.password}</Text>
              )}
              <TouchableOpacity
                style={style.buttonContainer}
                onPress={() => {
                  handleSubmit();
                }}>
                <Text style={style.buttonText}>{'Login'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
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
