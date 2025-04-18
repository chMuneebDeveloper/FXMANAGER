import React,{useEffect, useState} from 'react';
import {View, Text, Keyboard} from'react-native';
import { checkUserDomain } from '../../server/service';
import  Design  from './design';

const DomainURLScreen = (props)=>{
    const [keyboardStatus, setKeyboardStatus] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [domainUrl, setDomainUrl] = useState('');
    const [isAlert, setAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    
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

    const checkDomian = async url => {
      setLoading(true);
      let response = await checkUserDomain(domainUrl);
      if(response.IsSuccess){
        props.navigation.navigate('login', { url: domainUrl });
        setLoading(false);
      }else{
        setAlert(true);
        setAlertMessage(response?.ReturnMessage);
        setLoading(false);
      }
      
    }

const onCloseAlert=()=>{
  setAlert(false);
  setAlertMessage('');
}
  
    return(
  <Design
  keyboardStatus={keyboardStatus}
  setDomainUrl={setDomainUrl}
  domainUrl={domainUrl}
  checkDomian={checkDomian}
  isAlert={isAlert}
  alertMessage={alertMessage}
  onCloseAlert={onCloseAlert}
  isLoading={isLoading}
  />
    )
}

export default DomainURLScreen;
