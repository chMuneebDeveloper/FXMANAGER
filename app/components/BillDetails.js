import {Text, View, StyleSheet, ScrollView, FlatList} from 'react-native';
import React from 'react';
import CardComponent from './CardComponent';
import sizeHelper from '../helpers/sizeHelper';
const BillDetails = ({item}) => {
  console.log('item at billdetails page.......... ', item);


  return (
    <>
      <View style={styles.searchContainer}>
        <View style={styles.headingConatiner}>
          <Text style={styles.headingText}>Invoice Number</Text>
          <Text style={styles.subHeading}>{item?.InvoiceNumber}</Text>

        </View>
        <View style={styles.headingConatiner}>
        <Text style={[styles.headingText,{textAlign:"left"}]}>Paid on</Text>

          <Text style={styles.subHeading}>{item?.RecordTimeStampFormatted}</Text>

        </View>
      </View>
<ScrollView>
      <View style={styles.colorbodyContainer}>
        <View style={styles.rowText}>
          <Text style={styles.nameTxtStyle}>General</Text>
        </View>
        <View style={[styles.innerContainer]}>
          <View style={styles.borderWidthCtn}>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>Date</Text>
              <Text style={styles.valuesTextStyle}>{item?.InvoiceDate}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>{item?.BuyerName? 'Buyer Name': 'Vendor Name'}</Text>
              <Text style={styles.valuesTextStyle}>{item?.BuyerName? item?.BuyerName: item?.VendorName}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>{item?.SalesAgentName? 'Sales Agent Name' : 'Vendor Code'}</Text>
              <Text style={styles.valuesTextStyle}>{item?.SalesAgentName? item?.SalesAgentName : item?.VendorCode}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.keyTextValues}>Stock Name</Text>
              <Text style={styles.valuesTextStyle}>{item?.GoDownName}</Text>
            </View>
          </View>
          {item?.BuyerName&&<View style={styles.btnContainer}>
            <Text style={styles.loginButton}>{item?.PaymentTypeName}</Text>
          </View>}
        </View>
      </View>

      <View
        style={[
          styles.colorbodyContainer,
          {marginVertical: sizeHelper.calHp(20)},
        ]}>
        <View style={styles.rowText}>
          <Text style={styles.nameTxtStyle}>Products</Text>
        </View>
        <View style={styles.innerContainer}>
          <View
            style={[
              styles.borderWidthCtn,
              {
                padding: 10,
                marginBottom: sizeHelper.calHp(30),
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <FlatList
              data={
                item?.saleInvoiceDetails
                  ? item?.saleInvoiceDetails
                  : item?.PurchaseInvoiceDetails
              }
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={styles.textStyles}>{item?.Name}</Text>
                  </View>
                  <View>
                    <Text style={styles.textStyles}>
                      {item?.Quantity}x{' '}
                      <Text style={{color: '#6B64E7'}}>({item?.UnitName})</Text>
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        color: '#9D9C9C',
                        marginRight: 5,
                        fontFamily: 'InterBold',
                        fontSize: sizeHelper.calHp(29),
                      }}>
                      PK {item?.NetPrice}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </View>

      <View style={styles.colorbodyContainer}>
        <View style={styles.rowText}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <Text style={styles.nameTxtStyle}>Aggregate</Text>
          </View>

          <Text style={styles.rightTextStyles}>{item.Balance}</Text>
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.borderWidthCtn}>
            <View style={[styles.widthConatiner]}>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Sub total'}</Text>
                <Text style={styles.valuesTextStyle}>{item?.GrandAmount}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Tax'}</Text>
                <Text style={styles.valuesTextStyle}>
                  {(item.GlobalTax1Amount + item?.GlobalTax2Amount).toFixed(2)}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Net Total'}</Text>
                <Text style={styles.valuesTextStyle}>{item?.NetAmount}</Text>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={{height:20}}></View> */}

      </View>
      </ScrollView>
    </>
  );
};

export default BillDetails;

const styles = StyleSheet.create({
  safeAreaContainer: {flex: 1, backgroundColor: '#F3F4F7'},
  txtView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: sizeHelper.calHp(10),
  },
  keyStyl: {
    color: '#25272E',
    fontWeight: 'bold',
    marginRight: sizeHelper.calWp(10),
    fontFamily: 'InterBold',
    fontSize: sizeHelper.calHp(29),
  },
  searchContainer: {
    padding: sizeHelper.calHp(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#25272E',
    borderBottomLeftRadius: sizeHelper.calHp(80),
  },
  headingConatiner: {
    padding: sizeHelper.calHp(20),
  },
  headingText: {
    color: '#FFFFFF',
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'InterBold',
    fontWeight: '500',
    textAlign: 'right',
    // marginHorizontal: sizeHelper.calHp(15),
  },
  subHeading: {
    color: '#FFFFFF',
    fontSize: sizeHelper.calHp(26),
    fontFamily: 'InterMedium',
    fontWeight: '500',
    textAlign: 'left',
  },
  colorbodyContainer: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: sizeHelper.calHp(40),
    backgroundColor: '#25272E',
    borderRadius: sizeHelper.calHp(16),
  },
  innerContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: sizeHelper.calHp(16),
    borderTopRightRadius: sizeHelper.calHp(16),
    borderRadius: sizeHelper.calHp(16),
    paddingVertical: sizeHelper.calHp(5),
  },
  borderWidthCtn: {
    margin: sizeHelper.calHp(40),
    // paddingVertical:20,
    marginBottom: sizeHelper.calHp(0),
    borderRadius: sizeHelper.calHp(12),
    borderWidth: 0.7,
    borderColor: '#D9D9D9',
  },
  widthConatiner: {
    margin: sizeHelper.calHp(20),
  },
  rowText: {
    padding: sizeHelper.calHp(30),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nameTxtStyle: {
    color: '#FFFFFF',
    fontSize: sizeHelper.calHp(32),
    fontFamily: 'InterBold',
  },
  btnContainer: {
    backgroundColor: '#25272E',
    marginVertical: sizeHelper.calHp(38),
    width: '92%',
    alignSelf: 'center',
    borderRadius: sizeHelper.calHp(18),
  },
  loginButton: {
    color: 'white',
    fontSize: sizeHelper.calHp(37),
    fontFamily: 'InterBold',
    textAlign: 'center',
    padding: sizeHelper.calHp(20),
  },
  textStyles: {
    color: '#25272E',
    fontSize: sizeHelper.calHp(28),
    fontFamily: 'InterMedium',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: sizeHelper.calHp(7),
    paddingHorizontal: 10,
  },
  keyTextValues: {
    color: '#25272E',
    fontWeight: 'bold',
    marginRight: sizeHelper.calWp(10),
    fontFamily: 'InterBold',
  },
  valuesTextStyle: {
    color: '#9D9C9C',
    marginRight: sizeHelper.calWp(10),
    fontFamily: 'InterBold',
  },
});
