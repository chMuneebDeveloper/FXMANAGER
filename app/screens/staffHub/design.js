import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import sizeHelper from '../../helpers/sizeHelper';
import CustomAlert from '../../components/CustomAlert';
import Loading from '../../components/Loading';
import moment from 'moment';
import {blue1, blue2} from '../../constants/colors';
import Header from '../../components/Header';
import NavigationHeader from '../../components/NavigationHeader';
const Design = ({
  data,
  approvedRejectLeaves,
  isLoading,
  onCloseAlert,
  isAlert,
  alertMessage,
  isRefreshing,
  onRefresh,
  moveToProfile,
  TabsNavigations,
}) => {
  const renderItem = (item, index) => {
    return (
      <View key={item.id} style={styles.Container}>
        <View style={styles.TopView}>
          <Text style={styles.Toptxt}>{item?.item?.LeaveType}</Text>
          <Text style={styles.Toptxt}>
            {moment(item?.item?.LeaveStartDate, 'DD/MM/YYYY').format('DD-MMM') +
              ' - ' +
              moment(item?.item?.LeaveEndDate, 'DD/MM/YYYY').format('DD-MMM')}
          </Text>
        </View>
        <View style={styles.bottomView}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../../assets/image/noImage.png')}
            />
            <View>
              <Text style={styles.employeeName}>
                {item?.item?.EmployeeName}
              </Text>
              <Text style={styles.employeeCode}>
                {item?.item?.EmployeeCode}
              </Text>
            </View>
          </View>
          <Text style={styles.mainTxt}>{item?.item?.Description}</Text>

          <View style={styles.dashedLine}></View>

          <View style={styles.btnContainer}>
            <TouchableOpacity
              style={styles.ApprovedBtn}
              onPress={() => {
                approvedRejectLeaves(
                  item?.item?.EmployeeCode,
                  item?.item?.EmployeeLeaveCode,
                  1,
                );
              }}>
              <Text style={styles.btntxt}>Approved</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.RejectedBtn}
              onPress={() => {
                approvedRejectLeaves(
                  item?.item?.EmployeeCode,
                  item?.item?.EmployeeLeaveCode,
                  2,
                );
              }}>
              <Text style={styles.btntxt}>Rejected</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.headerContainer}>
        <Header text={'Manager'} moveToProfile={moveToProfile} />
      </View>
      <NavigationHeader TabsNavigations={TabsNavigations} />
        <View>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => String(item.RowIndex)}
            contentContainerStyle={styles.flatListStyle}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={[blue1, blue2]}
              />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
              <Image source={require('../../assets/image/empty.png')} />
              <Text style={styles.emptyText}>{'Record not found yet.'}</Text>
            </View> 
            }
          />
        </View>
      <CustomAlert
        visible={isAlert}
        message={alertMessage}
        onClose={onCloseAlert}
      />
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
