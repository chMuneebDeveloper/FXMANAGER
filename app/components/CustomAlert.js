import React from 'react';
import { Modal, View, Text, Button, StyleSheet,TouchableOpacity } from 'react-native';
import { black, black1, white } from '../constants/colors';
import sizeHelper from '../helpers/sizeHelper';

const CustomAlert = ({ visible, message, onClose }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
    //   onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.alertBox}>
          <Text style={styles.alertMessage}>{message}</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>{'OK'}</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  button:{
backgroundColor:black,
paddingHorizontal: sizeHelper.calHp(50),
borderRadius: sizeHelper.calHp(20),
paddingVertical: sizeHelper.calHp(15)
  },
  buttonText:{
    color:white,
    fontSize:sizeHelper.calHp(34),
  },
  alertBox: {
    backgroundColor: 'white',
    padding: sizeHelper.calHp(30),
    borderRadius: sizeHelper.calHp(10),
    width: '70%',
    alignItems: 'center',
  },
  alertMessage: {
    color:black1,
    fontSize:sizeHelper.calHp(32),
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default CustomAlert;
