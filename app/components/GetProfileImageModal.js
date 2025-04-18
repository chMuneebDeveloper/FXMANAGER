import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Button,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { black, blue, white } from '../constants/colors';
const GetProfileImageModal=({modal,setModal,pickFromCamera,pickImage})=>{
    return(
<Modal
animationType="slide"
transparent={true}
visible={modal}
onRequestClose={() => {
  setModal(false);
}}>
<View style={styles.modalparent}>
  <View style={styles.modalView}>
    <View style={styles.modalButtonView}>
      <TouchableOpacity
        onPress={() => pickFromCamera()}
        style={styles.cameraStyle}>
        <Feather name="camera" size={24} color="black" />

        <Text
          style={styles.cameraText}>
          {/* {i18n.t('cam')} */}
          {'camera'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => pickImage()}
        style={styles.pickImage}>
        <Feather
          name="image"
          size={24}
          color="black"
        />

        <Text
          style={styles.galleryStyle}>
          {/* {i18n.t('gal')} */}
          {'Gallery'}
        </Text>
      </TouchableOpacity>
    </View>
    <Button
      color={blue}
      onPress={() => setModal(false)}
    //   title={i18n.t('cancel')}
    title={'cancel'}
    />
  </View>
</View>
</Modal>
    );
};

const styles = StyleSheet.create({
    modalparent: {
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
      },
      modalView: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: white,
        padding: '5%',
        elevation: 5,
      },
      modalButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
      },
      cameraStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
      },
      cameraText:{
        fontSize: 15,
        paddingLeft: 15,
        fontWeight: 'bold',
        color: black,
        fontFamily: 'ProximaNova',
        textAlign: 'left',
      },
      pickImage:{
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
      },
      galleryStyle:{
        fontSize: 15,
        paddingLeft: 15,
        fontWeight: 'bold',
        color: black,
        fontFamily: 'ProximaNova',
        textAlign: 'left',
      }
})
export default GetProfileImageModal;