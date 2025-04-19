import {
  TextInput,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './style';
import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather';
import {black, blue, blue1, gray, gray1, gray2, gray3, gray4, white} from '../../constants/colors';
import Loading from '../../components/Loading';
import FontFamilies from '../../constants/Fonts';
import BillDetails from '../../components/BillDetails';

const Design = ({
  moveToProfile,
  goBack,
  open,
  value,
  items,
  setValue,
  setItems,
  setOpen,
  order,
  isLoading,
  isSalesOrders,
  getOrders,
  getPurchaseOrders,
  isLoadMore,
  getOrderDetail,
  getDetails,
  backToSearch,
  searchFilterFunction,
  setSearch,
  search,
  filterOrders,
  totalRecord
}) => {
  console.log('object.....', filterOrders);

  const listFooter = () => {
    if (totalRecord == filterOrders?.length)  return null;
    return (
      // totalRecord && (
      <View>
        {isLoadMore == true?
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
                value == 'sales' ? getOrders() : getPurchaseOrders();
              }}>
              <Text
                style={{fontFamily: FontFamilies.InterSemiBold, color: blue1}}>
                Load More
              </Text>
            </TouchableOpacity>
          ) : (
            <ActivityIndicator color={blue} size={25} />
          )}
        </View>
         :''} 
      </View>
      // )
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
      <View style={styles.searchContainer}>
        {backToSearch ? (
          <View></View>
        ) : (
          <View style={styles.rowComp}>
            <Feather
              name={'search'}
              color={gray3}
              size={sizeHelper.calHp(40)}
            />
            <TextInput
              value={search}
              underlineColorAndroid="transparent"
              placeholder={
                value == 'sales' ? 'Search Sale ID' : 'Search Purchase ID'
              }
              placeholderTextColor={gray3}
              // onChangeText={(text) =>  {
              //   setSearch(text)
              //   searchFilterFunction(text)
              // }}
              // autoFocus={true}
              onChangeText={(text)=>{setSearch(text)}}
              onEndEditing={()=> {searchFilterFunction()}}
              style={styles.textInputStyles}
            />
            <DropDownPicker
              style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                // marginLeft: sizeHelper.calWp(6),
                width: '32.5%',
                borderTopRightRadius: open
                  ? sizeHelper.calHp(85)
                  : sizeHelper.calHp(100),
                borderBottomRightRadius: sizeHelper.calHp(100),
                borderLeftWidth: 3,
                borderWidth: 0,
              }}
              open={open}
              textStyle={{
                fontSize: sizeHelper.calHp(28),
              }}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              zIndex={0}
              dropDownContainerStyle={{
                width: '32.5%',
                borderWidth: 0,
                // marginLeft: sizeHelper.calWp(7.2),
                borderTopRightRadius: open
                  ? sizeHelper.calHp(100)
                  : sizeHelper.calHp(20),
                elevation: 2,
                // iOS shadow
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 3.84,
                backgroundColor: 'white', // important for shadows to show properly
              }}
            />
          </View>
        )}
      </View>
      {backToSearch ? (
        <View>
          <BillDetails item={getDetails} />
        </View>
      ) : (
        <View>
          <View style={styles.allOrderHistoryText}>
            <Text style={styles.textStyle}>
              {value == 'sales' ? 'All Sales History' : 'All Purchase History'}
            </Text>
          </View>
          <View style={styles.headingContainer}>
            <Text
              style={[
                styles.headinTextStyle,
                {paddingLeft: sizeHelper.calWp(20), width: '33%'},
              ]}>
              Order NO
            </Text>
            <Text style={[styles.headinTextStyle, {width: '33%'}]}>Name</Text>
            <Text style={[styles.headinTextStyle, {width: '33%'}]}>Date</Text>
            <View style={styles.spaceContainer}></View>
          </View>
          <View style={{paddingBottom:120}}>
            <FlatList
              data={value=='sales'? order :filterOrders}
              keyExtractor={item => item.InvoiceNumber}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => (
                <TouchableOpacity
                  style={styles.itemContainer}
                  key={item.id}
                  onPress={() => {
                    getOrderDetail(item);
                  }}>
                  <Text style={[styles.orderNumTextStyle, {width: '33%'}]}>
                    {item?.InvoiceNumber}
                  </Text>
                  <Text style={[styles.orderNumTextStyle, {width: '33%'}]}>
                    {item.BuyerName
                      ? item.BuyerName?.slice(0, 10)
                      : item.VendorName?.slice(0, 10)}
                    {item.BuyerName?.length >= 10 ||
                    item.VendorName?.length >= 10
                      ? '...'
                      : ''}
                  </Text>
                  <Text style={[styles.orderNumTextStyle, {width: '30%'}]}>
                    {item.InvoiceDate}
                  </Text>
                  <Feather
                    name={'chevron-right'}
                    color={black}
                    size={sizeHelper.calHp(40)}
                  />
                </TouchableOpacity>
              )}
              contentContainerStyle={{paddingBottom: sizeHelper.calHp(680)}}
              ListFooterComponent={item => listFooter()}
            />
          </View>
        </View>
      )}

      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
