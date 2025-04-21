import React, {useEffect, useState} from 'react';
import {Linking, PermissionsAndroid, Alert} from 'react-native';
import Design from './design';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import list from '../../constants/Common';
const ProfileScreen = props => {
  const [basicData, setBasicData] = useState({});
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState('');
  const linkArray = [
    {
      title: 'Dashboard',
      icon: 'home',
      onPress: () => goBack(),
      active: true,
    },
    {
      title: basicData?.LoginId,
      icon: 'user',
      onPress: () => {},
      active: false,
    },
    {
      title: basicData?.PrimaryPhone,
      icon: 'phone',
      onPress: () => {},
      active: false,
    },
    {
      title: basicData?.Email,
      icon: 'mail',
      onPress: () => {},
      active: false,
    },
    {
      title: 'Privacy',
      icon: 'home',
      onPress: async () => {
        await Linking.openURL('https://finexcloud.com/privacy-policy/');
      },
      active: true,
    },
    {
      title: 'Logout',
      icon: 'log-out',
      onPress: () => logoutUser(),
      active: true,
    },
  ];

  const SaveImage = async img => {
    try {
      await AsyncStorage.setItem('MY_IMAGE', img);
      list.ProfileImage = img;
    } catch (e) {
      console.error(e);
    }
  };

  const getDatainStart = async () => {
    const storedData = await AsyncStorage.getItem('My_Data');
    const data = JSON.parse(storedData);
    console.log(data);
    setBasicData(data);
    var img = await GetImage();
    if (img !== null) {
      setImage(img);
    }
  };

  useEffect(() => {
    getDatainStart();
  }, []);

  const getData = image => {
    if (image.didCancel) {
      setModal(false);
    } else if (image.errorCode) {
      Alert.alert(image.errorMessage);
      setModal(false);
    } else {
      setImage(image.assets[0].uri);
      SaveImage(image.assets[0].uri);
      setModal(false);
    }
  };

  const pickFromCamera = async () => {
    try {
        if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs access to your camera to take photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        launchCamera(options, getData);
      } else {
        Alert.alert(
          'Permission Denied',
          'Camera access is required to take photos.',
        );
      }
      } else if (Platform.OS === 'ios')  {
        const cameraPermission = await checkPermission('camera');

      if (cameraPermission === 'authorized') {
        launchCamera(options, getData); // Make sure to define options and getData
      } else {
          Alert.alert(
            'Permission Denied',
            'Camera access is required to take photos.',
          );
        }
      }
      
    } catch (err) {
      console.warn('Error requesting camera permission:', err);
    }
  };

  const pickImage = async () => {
    launchImageLibrary(options, getData);
  };

  const options = {
    mediaType: 'photo',
    quality: 0.5,
    includeBase64: true,
  };

  const GetImage = async () => {
    const imag = await AsyncStorage.getItem('MY_IMAGE');
    return imag;
  };

  const goBack = () => {
    props.navigation.replace('Procurement');
  };

  const logoutUser = async () => {
    console.log('logout calling');
    try {
        await AsyncStorage.removeItem('MODULEIDS');        ;
        await AsyncStorage.removeItem('MY_TOKEN',);
        await AsyncStorage.removeItem('My_Data');
        await AsyncStorage.removeItem('GoDownCode');
        await AsyncStorage.removeItem('GoDownValue');

      props.navigation.replace('Auth');
    } catch (e) {
      console.log('logout calling');
      console.error(e);
    }
  };

  return (
    <Design
      goBack={goBack}
      basicData={basicData}
      image={image}
      modal={modal}
      setModal={setModal}
      logoutUser={logoutUser}
      linkArray={linkArray}
      pickFromCamera={pickFromCamera}
      pickImage={pickImage}
    />
  );
};

export default ProfileScreen;
