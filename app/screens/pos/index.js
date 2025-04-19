import React, { useState ,useCallback, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {convertRtl} from 'react-native-rtl-reshaper';
import list from '../../constants/Common';
import { GET_ADMIN_POSDATA } from '../../server/constant';
import { fetchService } from '../../server/service';
import Design from './design';
import { Dimensions } from 'react-native';
const {width, height} = Dimensions.get('window');
const POSScreen = props =>{

  const [pOSGraphs, setPOSGraphs] = useState(null);
const [refreshing, setRefreshing] = useState(false);
const [isLoading, setLoading] = useState(false);
const [isAlert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
const POSData = useCallback(async () => {
  setLoading(true);
  const dashboardUrl = `${GET_ADMIN_POSDATA}${list.CultureCode}`; 
  console.log('Fetching POS data from:', dashboardUrl);
  const token = await AsyncStorage.getItem('MY_TOKEN');
  console.log('Fetching POS data from:', dashboardUrl,token);
  try {
    const res = await fetchService(dashboardUrl, 'GET', token);

    if (!res?.Data) {
      if (res.message === 'Unauthorized') {
        setAlertMessage('Authincations Failed');
        setAlert(true);
        props.navigation.replace('Auth');
        
      }
      return;
    }

    const commonPOSInfo = [];
    const counterSalesData = [];
    const salesAgentData = [];
    const productFamiliesData = [{GraphID: '4', StringName: '', Count: 0}];
    const productFamiliesDataReq = { labels: [], datasets: [{ data: [], color: () => 'rgba(31, 85, 218, 1)' }] };
// let totalCount = 0 ;
    res.Data.forEach(({ GraphID, StringName, Count,Amount }) => {
      
      switch (GraphID) {
        case '1':
          commonPOSInfo.push({  StringName, Count });
          break;
        case '2':
          if (width >= 450 || counterSalesData.length < 8) counterSalesData.push({ StringName, Count ,Amount});
          break;
        case '3':
          const name = /^[a-z0-9]+$/i.test(StringName) ? StringName : convertRtl(StringName);
          salesAgentData.push({  StringName: name.slice(0,6), Amount });
          break;
        case '4':
          if (width >= 450 || productFamiliesData.length < 5) {
            // const formattedName = /^[a-z0-9]+$/i.test(StringName) ? StringName : convertRtl(StringName);
            const name = StringName.slice(0,6);
            productFamiliesDataReq.labels.push(name);
            // totalCount = totalCount + Count;
            productFamiliesDataReq.datasets[0].data.push(Count);
            productFamiliesData.push({ GraphID, StringName: name, Count });
            
          }
          break;
      }
    });
    // productFamiliesData.push(totalCount);
    setPOSGraphs(prevState => {
      const newState = { ...res.Data, commonPOSInfo, counterSalesData, salesAgentData, productFamiliesData, productFamiliesDataReq };
      return JSON.stringify(prevState) === JSON.stringify(newState) ? prevState : newState;
    });
console.log("object, graph", pOSGraphs,'------2',salesAgentData )
  } catch (error) {
    console.error('Error fetching POS data:', error);
  }
  setLoading(false);
}, []);

useEffect(() => {
  POSData();
}, []);

const onRefresh = () => {
  setRefreshing(true);
  POSData();
  // Simulate a network request or some other async operation
  setTimeout(() => {
    // Do something after the refresh is complete
    setRefreshing(false);
  }, 500); // You can adjust the timeout as needed
};


    const moveToProfile = () => {
        props.navigation.navigate('profile');
      };
    
      const TabsNavigations = Tab => {
        props.navigation.navigate(Tab);
      };

    return(
        <Design moveToProfile={moveToProfile} TabsNavigations={TabsNavigations} isLoading={isLoading}
        pOSGraphs={pOSGraphs}
        onRefresh={onRefresh}
        refreshing={refreshing}/>
    );
};

export default POSScreen;