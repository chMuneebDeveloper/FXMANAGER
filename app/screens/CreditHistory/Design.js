import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import {black2, blue2} from '../../constants/colors';
import sizeHelper from '../../helpers/sizeHelper';
import styles from './Style';
import moment from 'moment';
const Design = ({
  goBack,
  moveToProfile,
  selectedTab,
  setSelecetTab,
  isLoading,
  filterOrders,
  order,
}) => {
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
            <Text style={styles.nameTxtStyle}>{item?.Name}</Text>
          </View>

          {/* <Text style={styles.rightTextStyles}>{item.Balance}</Text> */}
        </View>
        <View style={styles.innerContainer}>
          <View style={styles.borderWidthCtn}>
            <View style={styles.widthConatiner}>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Credit Days'}</Text>
                <Text style={styles.valuesTextStyle}>
                  {item?.item?.CreditDays}
                </Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Date'}</Text>
                <Text style={styles.valuesTextStyle}>{   moment(item?.InvoiceDate, 'YYYYMMDD').format('DD/MM/YYYY')}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Amount Paid'}</Text>
                <Text style={styles.valuesTextStyle}>{item?.AmountPaid}</Text>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.keyTextValues}>{'Net Amount'}</Text>
                <Text style={styles.valuesTextStyle}>{item?.NetAmount}</Text>
              </View>
            </View>
          </View>
        </View>
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
        <TouchableOpacity
          onPress={() => {
            setSelecetTab('Payables');
          }}
          style={[
            styles.buttonStyle,
            {backgroundColor: selectedTab === 'Payables' ? blue2 : black2},
          ]}>
          <Text style={styles.buttonText}>{'Payables'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelecetTab('Receivables');
          }}
          style={[
            styles.buttonStyle,
            {backgroundColor: selectedTab === 'Receivables' ? blue2 : black2},
          ]}>
          <Text style={styles.buttonText}>{'Receivables'}</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: sizeHelper.calHp(20),}}>
        <FlatList
          data={filterOrders}
          renderItem={CardComponent}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingHorizontal: sizeHelper.calWp(30),paddingBottom:sizeHelper.calHp(340)}}
        />
      </View>
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
