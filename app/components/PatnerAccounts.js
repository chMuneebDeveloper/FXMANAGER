import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal
} from 'react-native';
import React, {useState} from 'react';
import i18n from 'i18n-js';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import sizeHelper from '../helpers/sizeHelper';
import CustomButton from './CustomButton';
import {white} from '../constants/colors';

const PatnerAccounts = ({
  isLoading,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  setCurrentPicker,
  setShowPicker,
  from,
  to,
  showPicker,
  formatDate,
  handleDateChange,currentPicker

}) => {
  return (
    <View>
      <View style={styles.colorbodyContainer}>
        <DropDownPicker
          style={{...styles.dropDown,
            borderRadius: open
            ? sizeHelper.calHp(50)
            : sizeHelper.calHp(100),}}
          zIndex={isLoading ? 0 : 1}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          dropDownContainerStyle={styles.dropDnContainer}
          searchable={true}
          searchPlaceholder="Search account"
          searchContainerStyle={{
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
          }}
          searchTextInputStyle={{
            color: '#000',
          }}
        />
        <View style={styles.innerContainer}>
          <View style={styles.borderContainer}>
          <TouchableOpacity
                  style={styles.innerView}
                  onPress={() => {
                    setCurrentPicker('from');
                    setShowPicker(true);
                  }}>
                  <Text style={styles.leftText}>Date From</Text>
                  <Text style={styles.rightText}>
                    {from ? formatDate(from) : 'mm/dd/yyyy'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.innerView,
                    {
                      borderTopWidth: sizeHelper.calHp(1),
                      borderColor: '#D9D9D9',
                    },
                  ]}
                  onPress={() => {
                    setCurrentPicker('to');
                    setShowPicker(true);
                  }}>
                  <Text style={styles.leftText}>Date To</Text>
                  <Text style={styles.rightText}>
                    {to ? formatDate(to) : 'mm/dd/yyyy'}
                  </Text>
                </TouchableOpacity>
          </View>

          {showPicker &&
                (Platform.OS === 'ios' ? (
                  <Modal
                    transparent={true}
                    animationType="slide"
                    visible={showPicker}
                    onRequestClose={() => setShowPicker(false)}>
                    <View style={styles.modalContainer}>
                      <View style={styles.modalContent}>
                        <DateTimePicker
                          value={currentPicker === 'from' ? from : to}
                          mode="date"
                          display={'spinner'}
                          onChange={handleDateChange}
                        />
                        <View style={styles.buttonRow}>
                          <TouchableOpacity
                            onPress={() => setShowPicker(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setShowPicker(false)}>
                            <Text style={styles.okText}>OK</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </Modal>
                ) : (
                  <DateTimePicker
                    value={currentPicker === 'from' ? from : to}
                    mode="date"
                    display={'default'}
                    onChange={handleDateChange}
                  />
                ))}
        </View>
      </View>

      
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: sizeHelper.calHp(22),
    backgroundColor: '#25272E',
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  colorbodyContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: sizeHelper.calHp(40),
    backgroundColor: '#25272E',
    borderRadius: sizeHelper.calHp(16),
  },
  dropDown: {
    marginVertical: '3%',
    borderRadius: sizeHelper.calHp(100),
    width: '90%',
    // height: sizeHelper.calHp(90),
    alignSelf: 'center',
    borderWidth: 0,
  },
  innerContainer: {
    backgroundColor: white,
    borderRadius: sizeHelper.calHp(14),
  },
  btnContainer: {
    backgroundColor: '#25272E',
    marginTop: sizeHelper.calHp(45),
    width: '90%',
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(18),
  },
  dropDnContainer: {
    width: '89.9%',
    alignSelf: 'center',
    borderWidth: 0,
    elevation: 2,
    marginTop: sizeHelper.calHp(20),
  },
  innerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: sizeHelper.calHp(30),
  },

  leftText: {
    fontFamily: 'InterBold',
    fontSize: sizeHelper.calHp(32),
    fontWeight: '600',
    color: '#25272E',
  },
  rightText: {
    fontFamily: 'InterBold',
    fontSize: sizeHelper.calHp(32),
    fontWeight: '600',
    color: '#9D9C9C',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    width: '100%',
  },

  cancelText: {
    fontSize: 18,
    color: 'red',
  },

  okText: {
    fontSize: 18,
    color: 'blue',
  },
});

export default PatnerAccounts;
