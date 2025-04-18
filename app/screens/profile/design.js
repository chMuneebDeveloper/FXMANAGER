import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  I18nManager,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import GetProfileImageModal from '../../components/GetProfileImageModal';
import Header from '../../components/Header';
import {black, black1, blue, gray2, white} from '../../constants/colors';
import sizeHelper from '../../helpers/sizeHelper';
import {version} from './../../../package.json';
import styles from './style';
const Design = ({
  goBack,
  basicData,
  image,
  modal,
  setModal,
  logoutUser,
  linkArray,
  pickFromCamera,
  pickImage,
}) => {
  const renderList = (item, index) => {
    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        disabled={!item.item.active}
        onPress={item.item.onPress}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Feather
            name={item.item.icon}
            size={sizeHelper.calHp(50)}
            color={black1}
            style={styles.vectorIconStyle}
          />
          <Text style={styles.textLabels}>{String(item.item.title)}</Text>
        </View>
        {item.item.active && (
          <Feather
            name={I18nManager.isRTL ? 'chevron-left' : 'chevron-right'}
            size={sizeHelper.calHp(50)}
            color={black1}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header goBack={goBack} text={'Profile'} />
        <View style={styles.subHeaderContainer}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage}>
              <Image
                style={styles.image}
                source={
                  image === null || image === ''
                    ? require('../../assets/image/noImage.png')
                    : {uri: image}
                }
              />
            </View>
            <TouchableOpacity
              style={styles.editProfileImage}
              onPress={() => setModal(true)}>
              <Feather
                name="edit-3"
                size={sizeHelper.calHp(35)}
                color={black1}
              />
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <Text style={styles.profileNameText}>{basicData?.TrueName}</Text>
            <Text style={styles.ProfilePhoneNumber}>
              {basicData?.PrimaryPhone}
            </Text>
          </View>
        </View>
      </View>

      <ImageBackground
        style={styles.backgroundImage}
        source={require('../../assets/image/profileBackground.png')}>
        <Text style={styles.quickLinksText}>{'Quick Links'}</Text>
        {basicData && (
          <FlatList
            data={linkArray}
            renderItem={renderList}
            contentContainerStyle={{paddingBottom: 50}}
            numColumns={1}
            keyExtractor={item => item.index}
          />
        )}
        <Text style={styles.versionsText}>{'Version :' + version}</Text>
      </ImageBackground>

      <GetProfileImageModal
        modal={modal}
        setModal={setModal}
        pickFromCamera={pickFromCamera}
        pickImage={pickImage}
      />
    </View>
  );
};

export default Design;
