import react, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/Header';
import styles from './style';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import sizeHelper from '../../helpers/sizeHelper';
import CustomButton from '../../components/CustomButton';

import Loading from '../../components/Loading';
import CardComponent from '../../components/CardComponent';
import {
  black,
  blue1,
  gray,
  gray1,
  gray3,
  green,
  green1,
  white,
  yellow,
} from '../../constants/colors';
import FontFamilies from '../../constants/Fonts';

const Design = ({
  goBack,
  moveToProfile,
  open,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  openSecond,
  saleValue,
  setOpenSecond,
  setSaleValue,
  formatDate,
  showPicker,
  setShowPicker,
  handleDateChange,
  from,
  to,
  reportData,
  salesItems,
  currentPicker,
  setCurrentPicker,
  setSalesItems,
  isLoading,
  searchSaleReportDetail,
  backSearch,
  setBackSearch,
  reportList,
  GetMoreRecord,
  totalRecord,
  goBacktoSearch,
  setValueMsg,
  valueMsg,
}) => {
  console.log('-----', totalRecord, reportList?.length);
  const listFooter = () => {
    return (
      <View>
        {totalRecord == reportList.length ? (
          ''
        ) : (
          <View style={styles.loadingContainer}>
            <TouchableOpacity
              style={styles.loadingButton}
              onPress={() => {
                GetMoreRecord();
              }}>
                {isLoading? <ActivityIndicator/>:
                <Text style={styles.loadingText}>Load More</Text>
                }
              
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          goBack={() => (backSearch ? goBacktoSearch() : goBack())}
          text={backSearch ? ' Back to Search Report' : 'Manager'}
          moveToProfile={moveToProfile}
        />
      </View>
      <View style={styles.searchContainer}>
        {backSearch ? (
          <Text style={styles.subHeadingText}>
            {'Patner Statement Of Account'}
          </Text>
        ) : (
          <DropDownPicker
            zIndex={isLoading ? 0 : 9}
            style={{
              ...styles.dropDown,
              borderRadius: open ? sizeHelper.calHp(50) : sizeHelper.calHp(100),
            }}
            open={open}
            value={value}
            setOpen={setOpen}
            setValue={val => {
              if (val === 'none') {
                setValue(null);
              } else {
                setValue(val);
              }
            }}
            setItems={setItems}
            items={[{label: 'None', value: null}, ...items]}
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
        )}
      </View>
      {backSearch ? (
        <View style={{paddingVertical: sizeHelper.calHp(30)}}>
          <FlatList
            data={reportList}
            keyExtractor={item => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={item => listFooter()}
            renderItem={({item, index}) => (
              <View>
                <CardComponent item={item} index={item} />
                {totalRecord == index + 1 ? (
                  <View style={styles.blueContainer}>
                    <View style={styles.textContainer}>
                      <Text
                        style={[
                          styles.keyTextValues,
                          {
                            fontWeight: '700',
                            fontSize: sizeHelper.calHp(32),
                          },
                        ]}>
                        {item.AccountName}
                      </Text>
                      <Text
                        style={[
                          styles.valuesTextStyle,
                          {
                            fontWeight: '700',
                            fontSize: sizeHelper.calHp(32),
                            color: 'orange',
                          },
                        ]}>
                        {'8,95,89,989 Cr'}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.keyTextValues}>
                        {'Startup Equity'}
                      </Text>
                      <Text style={styles.valuesTextStyle}>
                        {item.StartUpEquity}
                      </Text>
                    </View>
                    <View style={styles.textContainer}>
                      <View style={styles.textContainer1}>
                        <Text style={styles.keyTextValues}>{'Debit'}</Text>
                        <Text
                          style={[
                            styles.valuesTextStyle,
                            {
                              backgroundColor: green1,
                            },
                          ]}>
                          {item.DebitAmount}
                        </Text>
                      </View>
                      <View style={styles.textContainer1}>
                        <Text style={styles.keyTextValues}>{'Credit'}</Text>
                        <Text
                          style={[
                            styles.valuesTextStyle,
                            {
                              backgroundColor: yellow,
                            },
                          ]}>
                          {item.CreditAmount}
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : null}
              </View>
            )}
            contentContainerStyle={{paddingBottom: sizeHelper.calHp(380)}}
          />
        </View>
      ) : (
        <View>
          <DropDownPicker
            style={{
              ...styles.dropDown,
              borderRadius: openSecond
                ? sizeHelper.calHp(50)
                : sizeHelper.calHp(100),
            }}
            open={openSecond}
            value={saleValue}
            items={[{label: 'None', value: null}, ...salesItems]}
            setOpen={setOpenSecond}
            setValue={val => {
              if (val === 'none') {
                setSaleValue(null);
              } else {
                setSaleValue(val);
              }
            }}
            setItems={setSalesItems}
            dropDownContainerStyle={styles.dropDnContainer}
            searchable={true}
            zIndex={isLoading ? 0 : 1}
            searchPlaceholder="Search account"
            searchContainerStyle={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
            }}
            searchTextInputStyle={{
              color: '#000',
            }}
          />
          {valueMsg && (saleValue == null || value == null) && (
            <Text
              style={{
                fontFamily: 'ProximaNova-Regular',
                textAlign: 'left',
                left: sizeHelper.calWp(60),
                paddingBottom: sizeHelper.calHp(30),
                color: yellow,
              }}>
              {'Please Select an Account Name'}
            </Text>
          )}
          <View style={styles.colorbodyContainer}>
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

          <View style={styles.btnContainer}>
            <CustomButton
              onPress={() => {
                if (value !== null) {
                  searchSaleReportDetail();
                } else {
                  setValueMsg(true);
                  // Alert.alert('Fill all fields');
                }
              }}
              name={'Search'}
              style={styles.loginButton}
            />
          </View>
        </View>
      )}

      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
