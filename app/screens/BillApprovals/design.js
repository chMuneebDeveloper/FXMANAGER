import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  TextInput,
  RefreshControl,
} from 'react-native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import Icon from 'react-native-vector-icons/Feather';
import {
  black2,
  blue,
  blue1,
  blue2,
  green,
  red1,
  white,
  gray1,
} from '../../constants/colors';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './style';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import FontFamilies from '../../constants/Fonts';
const Design = ({
  goBack,
  moveToProfile,
  suitcaseArray,
  selectedItem,
  setSelectedItem,
  selectedTab,
  setSelectedTab,
  isLoading,
  filterBills,
  value,
  getPendingBills,
  getRejectedBills,
  getApprovedBills,
  totalRecord,
  isLoadMore,
  approveRejectedBills,
  handleSelect,
  inputValue,
  setInputValue,
  SearchRecord,
  pageNo,
  setPageNo,
  salePurchesTabs,
  getPendingOrders,
  getApprovedOrders,
  getRejectedOrders,
  isRefreshing,
  onRefresh,
  salebillsPending,
  salebillsApproved,
  salebillsReject,
  getrecordLenght,
  purchasebillsPending,
  purchasebillsApproved,
  purchasebillsReject,
  saleordersPending,
  saleordersApproved,
  saleordersReject,
  purchaseordersPending,
  purchaseordersApproved,
  purchaseordersReject,
}) => {
  let filterdata = [];
  if (selectedTab == 'salebills') {
    if (value == 'pending') {
      filterdata = salebillsPending;
    } else if (value == 'approved') {
      filterdata = salebillsApproved;
    } else {
      filterdata = salebillsReject;
    }
  } else if (selectedTab == 'purchasebills') {
    if (value == 'pending') {
      filterdata = purchasebillsPending;
    } else if (value == 'approved') {
      filterdata = purchasebillsApproved;
    } else {
      filterdata = purchasebillsReject;
    }
  } else if (selectedTab == 'saleorders') {
    if (value == 'pending') {
      filterdata = saleordersPending;
    } else if (value == 'approved') {
      filterdata = saleordersApproved;
    } else {
      filterdata = saleordersReject;
    }
  } else if (selectedTab == 'purchaseorders') {
    if (value == 'pending') {
      filterdata = purchaseordersPending;
    } else if (value == 'approved') {
      filterdata = purchaseordersApproved;
    } else {
      filterdata = purchaseordersReject;
    }
  }

  const CardComponent = ({item, index}) => {
    return (
      <View key={index} style={styles.colorbodyContainer}>
        <View style={styles.rowText}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              position: 'relative',
            }}>
            <Text style={styles.nameTxtStyle}>{item?.Vendor_Buyer}</Text>
          </View>

          <Text style={styles.rightTextStyles}>
            {item.NetAmount?.toFixed(2)}
          </Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.borderWidthCtn}>
            <View style={styles.widthConatiner}>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{item?.InvoiceNumber}</Text>
                <Text style={styles.valuesTextStyle}>{item?.GodownName}</Text>
              </View>
              {/* <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Date'}</Text>
                <Text style={styles.valuesTextStyle}>{   moment(item?.InvoiceDate, 'YYYYMMDD').format('DD/MM/YYYY')}</Text>
              </View> */}
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Payent Method'}</Text>
                <Text style={styles.valuesTextStyle}>{item?.PaymentType}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Transaction Type'}</Text>
                <Text style={[styles.valuesTextStyle, {color: green}]}>
                  {item?.TransactionType == 7
                    ? 'Sales Bills'
                    : item?.TransactionType == 6
                    ? 'Purchase Bill'
                    : item?.TransactionType == 5
                    ? 'Sales Order'
                    : 'Purchase Orders'}
                </Text>
              </View>
              {value == 'rejected' && (
                <View style={styles.textContainer}>
                  <Text style={styles.keyTextValues}>{'Bill Status'}</Text>
                  <Text
                    style={[
                      styles.valuesTextStyle,
                      {color: value == 'rejected' ? red1 : green},
                    ]}>
                    {value == 'rejected' ? 'Rejected' : 'Approved'}
                  </Text>
                </View>
              )}
            </View>
          </View>
          {value != 'approved' && (
            <View style={styles.rowBtn}>
              <TouchableOpacity
                onPress={() => {
                  approveRejectedBills(item?.InvoiceNumber, 1, index);
                }}
                style={[styles.button, styles.approvedBtn]}>
                <Text style={styles.buttonText1}>Approved</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  approveRejectedBills(item?.InvoiceNumber, 2, index);
                }}
                disabled={value == 'rejected' ? true : false}
                style={[
                  styles.button,
                  styles.rejectedBtn,
                  {backgroundColor: value == 'rejected' ? gray1 : red1},
                ]}>
                <Text style={styles.buttonText1}>Rejected</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const listFooter = () => {
    if (totalRecord == filterdata?.length || inputValue != '') return null;
    return (
      // totalRecord && (
      <View>
        {isLoadMore !== true ? (
          <View
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {!isLoading ? (
              <TouchableOpacity
                style={{
                  width: sizeHelper.calHp(250),
                  backgroundColor: white,
                  borderRadius: sizeHelper.calHp(34),
                  marginTop: sizeHelper.calHp(24),
                  borderWidth: 1,
                  borderColor: blue1,
                  paddingVertical: sizeHelper.calHp(8),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setPageNo(prev => {
                    const newPage = prev + 1;
                    // Now you can use newPage immediately
                    // console.log('New Page:', newPage);
                    return newPage;
                  });
                  const isOrderTab =
                    selectedTab === 'purchaseorders' ||
                    selectedTab === 'saleorders';

                  if (value === 'pending') {
                    isOrderTab ? getPendingOrders() : getPendingBills();
                  } else if (value === 'rejected') {
                    isOrderTab ? getRejectedOrders() : getRejectedBills();
                  } else {
                    isOrderTab ? getApprovedOrders() : getApprovedBills();
                  }
                }}>
                <Text
                  style={{
                    fontFamily: FontFamilies.InterSemiBold,
                    color: blue1,
                  }}>
                  Load More
                </Text>
              </TouchableOpacity>
            ) : (
              <ActivityIndicator color={blue} size={25} />
            )}
          </View>
        ) : (
          ''
        )}
      </View>
      // )
    );
  };

  const renderTabs = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setPageNo(1);
          setSelectedTab(item.value);
        }}
        style={[
          styles.buttonStyle,
          {backgroundColor: selectedTab === item.value ? blue2 : black2},
        ]}>
        <Text style={styles.buttonText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const DropDown = () => {
    return (
      <View style={styles.DropdownContainer}>
        <Menu>
          <MenuTrigger>
            <View style={styles.triggerButton}>
              <Text style={styles.titleText}>{selectedItem.title}</Text>
              <Icon name={'chevron-down'} size={18} color="white" />
            </View>
          </MenuTrigger>

          <MenuOptions customStyles={{optionsContainer: styles.menuOptions}}>
            {suitcaseArray.map(item => (
              <MenuOption key={item.id} onSelect={() => handleSelect(item)}>
                <View style={styles.menuOptionItem}>
                  <Text style={styles.menuText}>{item.title}</Text>
                </View>
              </MenuOption>
            ))}
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          goBack={goBack}
          text={'Manager'}
          moveToProfile={moveToProfile}
        />
      </View>
      <View style={styles.NavigationContainer}>
        <View style={styles.headerBox}>
          <FlatList
            data={salePurchesTabs}
            renderItem={renderTabs}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <DropDown />
      </View>

      <View style={styles.textInputContainer}>
        <Icon name="search" size={sizeHelper.calHp(60)} color={'#B1B1B1'} />
        <TextInput
          placeholder="Search Invoice or Customer Name"
          placeholderTextColor={'#979797'}
          value={inputValue}
          style={styles.textInputStyles}
          onChangeText={setInputValue}
          onEndEditing={SearchRecord}
        />
      </View>

      <View style={{marginVertical: sizeHelper.calHp(20)}}>
        <FlatList
          // data={filterBills}
          data={inputValue ? filterBills : filterdata}
          renderItem={CardComponent}
          onEndReachedThreshold={0.5}
          windowSize={20}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          removeClippedSubviews={true}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            paddingHorizontal: sizeHelper.calWp(30),
            paddingBottom: sizeHelper.calHp(480),
          }}

          refreshControl={
            totalRecord == filterdata?.length ? null : (
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[blue1, blue2]}
              />
            )
          }
          ListFooterComponent={item => listFooter()}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                paddingTop: '50%',
              }}>
              <Image
                source={require('../../assets/image/emptyFolder.png')}
                // style={styles.nullGraph}
              />
              <Text>No data available.</Text>
            </View>
          }
        />
      </View>
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
