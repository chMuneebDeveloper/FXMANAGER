import React,{useEffect, useState} from 'react';
import {View, Text, Keyboard} from'react-native';
import { loginUser } from '../../server/service';
import  Design  from './design';
import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen=({navigation,route})=>{
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [isVisiblePassword, setVisiblePassword] = useState(false);
    const [isAlert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [domainUrl, setDomainUrl] = useState(route.params?.url || '');
    useEffect(() => {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardStatus(true);
      });
      
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardStatus(false);
      });
  
      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }, []);

    const goBack=()=>{
      navigation.goBack()
    };

    const onCloseAlert=()=>{
      setAlert(false);
      setAlertMessage('');
    };

    const setToken = async (token, isAdmin,PrimaryPhone,ConnectionStirng,TrueName,Email,LoginId ,ModuleIds) => {
      try {
        console.log('token and isadmin value is', token, isAdmin,PrimaryPhone,ConnectionStirng,TrueName,LoginId);
        const obj={
          token: token,
          isAdmin: isAdmin,
          PrimaryPhone:PrimaryPhone,
          ConnectionStirng: ConnectionStirng,
          TrueName: TrueName,
          Email: Email,
          LoginId: LoginId,
        };
        await AsyncStorage.setItem('MODULEIDS', ModuleIds);        ;
        await AsyncStorage.setItem('MY_TOKEN', token);
        await AsyncStorage.setItem('My_Data', JSON.stringify(obj));
      } catch (e) {
        console.error(e);
      }
    };

    const managerLogin=async(params)=>{
      setLoading(true);
      params.Url = domainUrl + '.finexcloud.com';
    params.IsAdmin = true;
      console.log('my params are ......',params)
      const response = await loginUser(params);

      if (response.responseBody.IsSuccess) {
        if (response.responseBody.Data === null) {
          setAlertMessage(response.responseBody.ReturnMessage);
          setAlert(true);
        } else {
          console.log('resp*/*', response);
          console.log(
            'token and isadmin value is0000',
            response.responseBody.Data.Token,
            response.responseBody.Data.IsAdmin ? 'true' : 'false',
          );
          await setToken(
            response.responseBody.Data.Token,
            response.responseBody.Data.IsAdmin ? 'true' : 'false',
            response.responseBody.Data.PrimaryPhone,
            response.responseBody.Data.ConnectionStirng,
            response.responseBody.Data.TrueName,
            response.responseBody.Data.Email,
            response.responseBody.Data.LoginId,
            response.responseBody.Data.ModuleIds,
          );
          navigation.replace('Main');

        }
      } else {
        setAlertMessage(response.responseBody.ReturnMessage);
        setAlert(true);
      }
      setLoading(false);
    }

    return(
  <Design
  keyboardStatus={keyboardStatus}
  setVisiblePassword={setVisiblePassword}
  isVisiblePassword={isVisiblePassword}
  goBack={goBack}
  isAlert={isAlert}
  alertMessage={alertMessage}
  onCloseAlert={onCloseAlert}
  isLoading={isLoading}
  managerLogin={managerLogin}
  />
    )
}

export default LoginScreen;
