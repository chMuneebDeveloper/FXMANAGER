import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import i18n from 'i18n-js';
import DropDownPicker from 'react-native-dropdown-picker';
// import Button from '../../../components/Button';
import styles from './style';
import Header from '../../components/Header';
import sizeHelper from '../../helpers/sizeHelper';
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomButton from '../../components/CustomButton';
import Loading from '../../components/Loading';
import PatnerAccounts from '../../components/PatnerAccounts';
import CardComponent from '../../components/CardComponent';
import PartnerAccountCard from '../../components/PartnerAccountCard';
import {green1, yellow} from '../../constants/colors';

const Design = ({
  moveToProfile,
  goBack,
  tabData,
  setTabIndex,
  tabIndex,
  isLoading,
  open,
  setOpen,
  setFrom,
  from,
  setTo,
  to,
  showPicker,
  setShowPicker,
  currentPicker,
  setCurrentPicker,
  handleDateChange,
  formatDate,
  searchReportDetail,
  reportData,
  reportList,
  totalRecord,
  items,
  setItems,
  setValue,
  value,
  backSearch,
  buyers,
  setBuyers,
  vendor,
  setVendor,
  goBacktoSearch,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          goBack={() => (backSearch ? goBacktoSearch() : goBack())}
          text={backSearch ? 'Back to Search Report' : 'Manager'}
          moveToProfile={moveToProfile}
        />
      </View>
      <View style={styles.searchContainer}>
        {backSearch ? (
          <Text style={styles.subHeadingText}>
            {'Partner Statement Of Account'}
          </Text>
        ) : (
          <FlatList
            horizontal
            data={tabData}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => setTabIndex(item.id)}
                style={[
                  styles.tabStyles,
                  {
                    backgroundColor:
                      tabIndex === item.id ? '#595FD5' : '#25272E',
                  },
                ]}>
                <Text style={styles.tabTextStyle}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      {console.log('[----------]', reportList)}
      {backSearch ? (
        <View style={{paddingVertical: sizeHelper.calHp(30)}}>
          <FlatList
            data={reportList}
            keyExtractor={item => item.id}
            numColumns={1}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => (
              <View>
                <PartnerAccountCard item={item} index={index} />
                {reportList?.length == index + 1 ? (
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
                        {item.Description}
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
                        {item.Balance < 0
                          ? `${Math.abs(item.Balance.toFixed(2))} Cr`
                          : `${item.Balance.toFixed(2)} Dr`}
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
          <PatnerAccounts
            isLoading={isLoading}
            open={open}
            value={value}
            items={
              tabIndex == 0
                ? [{label: 'None', value: null}, ...items]
                : tabIndex == 1
                ? [{label: 'None', value: null}, ...buyers]
                : [{label: 'None', value: null}, ...vendor]
            }
            setOpen={setOpen}
            setValue={setValue}
            setItems={
              tabIndex == 0 ? setItems : tabIndex == 1 ? setBuyers : setVendor
            }
            setCurrentPicker={setCurrentPicker}
            setShowPicker={setShowPicker}
            from={from}
            to={to}
            showPicker={showPicker}
            formatDate={formatDate}
            handleDateChange={handleDateChange}
            currentPicker={currentPicker}
          />
          <View style={styles.btnContainer}>
            <CustomButton
              onPress={searchReportDetail}
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
