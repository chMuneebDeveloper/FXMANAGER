import React, {useEffect, useState} from 'react';
import {View, Text, I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Design from './design';
import Feather from 'react-native-vector-icons/Feather';
import {
  GET_ADMIN_DASHBOARDDATA,
  GET_SPECIFIC_GODOWN_GRAPH,
  GET_SPECIFIC_GRAPH,
} from '../../server/constant';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import sizeHelper from '../../helpers/sizeHelper';
import {black, white} from '../../constants/colors';
import FontFamilies from '../../constants/Fonts';
import {loadOrders} from '../../server/service';
const ProcurementScreen = props => {
  const [selectedMenu, setSelectedMenu] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState();
  const [dashBoardData, setDashBoardData] = useState();
  const [content, setContent] = useState([]);
  const [dialogue, setDialogue] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [valueMonth,setValueMonth]=useState(1);
  const [open, setOpen] = useState(false);
  const [itemsMonths, setItemsMonths] = useState([
    {label: '3 Month', value: 0},
    {label: '6 Month', value: 1},
  ]);
  
  const moveToProfile = () => {
    props.navigation.navigate('profile');
  };

  const moveToPurchesVsSale =()=>{
    props.navigation.navigate('BillHistory');
  }

  const moveToBillApprovals =()=>{
    props.navigation.navigate('BillApprovals');
  }

  const moveToPayableVsReceivables=()=>{
    props.navigation.navigate('CreditHistory');
  }

  const TabsNavigations = Tab => {
    props.navigation.navigate(Tab);
  };

  const getDashboardData = async () => {
    setLoading(true);
    let gcode = await AsyncStorage.getItem('GoDownCode');
    if (gcode) {
    } else {
      gcode = '';
    }
    let dashboardUrl = GET_ADMIN_DASHBOARDDATA + '&goDownCode=' + gcode;
    const token = await AsyncStorage.getItem('MY_TOKEN');
    try {
      const res = await loadOrders(token, dashboardUrl);

      if (res.Data !== null && Array.isArray(res.Data)) {
        (res.Data.purchaseVSSaleGraph = []),
          (res.Data.topSaleProducts = []),
          (res.Data.topVendors = []),
          (res.Data.topBuyers = []),
          (res.Data.reportingOfCreditBills = []),
          (res.Data.GoDownList = []),
          (res.Data.topProductDetails = []);
        res.Data.sumOfProducts = 0;
        res.Data.forEach(element => {
          if (element.GraphID == '401') {
            element.Field4 = Number(Number(element.Field4).toFixed(0));
            
            res.Data.purchaseVSSaleGraph.push(element);
          } else if (element.GraphID == '402') {
            res.Data.topSaleProducts.push(element);
          } else if (element.GraphID == '403') {
            res.Data.topVendors.push(element);
          } else if (element.GraphID == '404') {
            res.Data.topBuyers.push(element);
          } else if (element.GraphID == '405') {
            element.Field4 = Number(Number(element.Field4).toFixed(0));
            res.Data.reportingOfCreditBills.push(element);
          } else if (element.GraphID == '400') {
            res.Data.GoDownList.push(element);
          } else if (element.GraphID == '406') {
            res.Data.topProductDetails.push(element);
          }
        });
        if (Array.isArray(res.Data.purchaseVSSaleGraph)) {
          // let label = [];
          // let dataValue = [];
          // let returnData = [];
          res.Data?.purchaseVSSaleGraph.forEach(element => {
            let half = String(element.StringText).slice(0, 3);
            element.StringText = half;
            let nam = element.StringText;
            let isAlphaNumeric = /^[a-z0-9]+$/i.test(nam);
            if (isAlphaNumeric) {
            } else {
              element.StringText = convertRtl(element.StringText);
            }
          });
          let sArray = [];
          res.Data?.reportingOfCreditBills.forEach(element => {
            let half = String(element.StringText).slice(0, 3);
            element.StringText = half;
            let nam = element.StringText;
            let isAlphaNumeric = /^[a-z0-9]+$/i.test(nam);
            if (isAlphaNumeric) {
            } else {
              element.StringText = convertRtl(element.StringText);
            }
          });
        }
        if (Array.isArray(res.Data.GoDownList)) {
          let array = [];
          res.Data.GoDownList.forEach(element => {
            let obj = {label: '', value: ''};
            obj.value = String(element.Value);
            obj.label = element.StringText;
            array.push(obj);
          });
          let goDownArray = res.Data.GoDownList;
          let obj = {
            Id: 0,
            GraphID: 400,
            StringText: 'All',
            Value: ' ',
            Field4: '',
          };
          let tempArray = [];
          tempArray.push(obj);
          tempArray = tempArray.concat(res.Data.GoDownList);
          // goDownArray.unshift
          setItems(tempArray);
        }
        if (Array.isArray(res.Data.topSaleProducts)) {
          let Piedata = [];
          res.Data?.topSaleProducts.forEach((element, index) => {
            let obj = {};
            obj.name = element.StringText;
            obj.population = element.Value;
            obj.color =
              index == 0
                ? '#D80E3E'
                : index == 1
                ? '#244B6C'
                : index == 2
                ? '#F8A545'
                : index == 3
                ? '#665397'
                : '#42bc76';
            obj.legendFontColor = '#7F7F7F';
            obj.legendFontSize = 13;
            Piedata.push(obj);
            res.Data.sumOfProducts = res.Data.sumOfProducts + element.Value;
          });
          res.Data.productData = Piedata;

          res.Data.productData.forEach(element => {
            element.percentage = Number(
              (element.population / res.Data.sumOfProducts) * 100,
            ).toFixed(2);
          });
        }
        setDashBoardData(res.Data);
        setLoading(false);
      } else if (res.message == 'Unauthorized') {
        setContent(['Information', 'Session Expired']);
        setDialogue(true);
        setLoading(false);
        // alert('Session Expired');
        props.navigation.replace('Auth', {
          screen: 'domainURL',
        });
      }
    } catch (e) {
      console.error('error is', e);
      setLoading(false);
    }
  };

  const loadGoDownSpecificData = async code => {
    setLoading(true);
    setSelectedMenu('6 Months');
    try {
      await AsyncStorage.setItem('GoDownCode', code.toString());
    } catch (error) {
      console.error('Error saving value:', error);
    }
    let dashboardUrl = GET_SPECIFIC_GODOWN_GRAPH + code;
    try {
      const token = await AsyncStorage.getItem('MY_TOKEN');
      console.log('--------', dashboardUrl);
      const res = await loadOrders(token, dashboardUrl);
      if (res.Data !== null && Array.isArray(res.Data)) {
        (res.Data.purchaseVSSaleGraph = []),
          (res.Data.topSaleProducts = []),
          (res.Data.topVendors = []),
          (res.Data.topBuyers = []),
          (res.Data.reportingOfCreditBills = []),
          (res.Data.GoDownList = []),
          (res.Data.topProductDetails = []);
        res.Data.sumOfProducts = 0;
        res.Data.forEach(element => {
          if (element.GraphID == '401') {
            element.Field4 = Number(Number(element.Field4).toFixed(0));
            res.Data.purchaseVSSaleGraph.push(element);
          } else if (element.GraphID == '402') {
            res.Data.topSaleProducts.push(element);
          } else if (element.GraphID == '403') {
            res.Data.topVendors.push(element);
          } else if (element.GraphID == '404') {
            res.Data.topBuyers.push(element);
          } else if (element.GraphID == '405') {
            element.Field4 = Number(Number(element.Field4).toFixed(0));
            res.Data.reportingOfCreditBills.push(element);
          } else if (element.GraphID == '400') {
            res.Data.GoDownList.push(element);
          } else if (element.GraphID == '406') {
            res.Data.topProductDetails.push(element);
          }
        });
        if (Array.isArray(res.Data.purchaseVSSaleGraph)) {
          res.Data?.purchaseVSSaleGraph.forEach(element => {
            let half = String(element.StringText).slice(0, 3);
            element.StringText = half;
            let nam = element.StringText;
            let isAlphaNumeric = /^[a-z0-9]+$/i.test(nam);
            if (isAlphaNumeric) {
            } else {
              element.StringText = convertRtl(element.StringText);
            }
          });
          let sArray = [];
          
          res.Data?.reportingOfCreditBills.forEach(element => {
          
            let half = String(element.StringText).slice(0, 3);
            element.StringText = half;
            let nam = element.StringText;
            let isAlphaNumeric = /^[a-z0-9]+$/i.test(nam);
            if (isAlphaNumeric) {
            } else {
              element.StringText = convertRtl(element.StringText);
            }
          });
        }
        if (Array.isArray(res.Data.GoDownList)) {
          let array = [];
          res.Data.GoDownList.forEach(element => {
            let obj = {label: '', value: ''};
            obj.value = String(element.Value);
            obj.label = element.StringText;
            array.push(obj);
          });

          let goDownArray = res.Data.GoDownList;
          let obj = {
            Id: 0,
            GraphID: 400,
            StringText: 'All',
            Value: ' ',
            Field4: '',
          };
          let tempArray = [];
          tempArray.push(obj);
          tempArray = tempArray.concat(res.Data.GoDownList);
          setItems(tempArray);
        }
        if (Array.isArray(res.Data.topSaleProducts)) {
          let Piedata = [];
          res.Data?.topSaleProducts.forEach((element, index) => {
            let obj = {};
            obj.name = element.StringText;
            obj.population = element.Value;
            obj.color =
              index == 0
                ? '#D80E3E'
                : index == 1
                ? '#244B6C'
                : index == 2
                ? '#F8A545'
                : index == 3
                ? '#047bf8'
                : '#42bc76';
            obj.legendFontColor = '#7F7F7F';
            obj.legendFontSize = 13;
            Piedata.push(obj);
            res.Data.sumOfProducts = res.Data.sumOfProducts + element.Value;
          });
          res.Data.productData = Piedata;

          res.Data.productData.forEach(element => {
            element.percentage = Math.ceil(
              (element.population / res.Data.sumOfProducts) * 100,
            );
          });
        }

        setDashBoardData(res.Data);
        setLoading(false);
      } else if (res.message == 'Unauthorized') {
        setContent(['Information', 'Session Expired']);
        setDialogue(true);
        setLoading(false);
        // alert('Session Expired');
        props.navigation.replace('Auth', {
          screen: 'domainURL',
        });
      }
    } catch (e) {
      console.error('error is', e);
    }
  };

  const getSeletedgoDown = async () => {
    try {
      const getcode = await AsyncStorage.getItem('GoDownCode');
      const getValue = await AsyncStorage.getItem('GoDownValue');
      setValue(getValue);
      if (getcode) {
        setTimeout(() => {
          loadGoDownSpecificData(getcode);
        }, 200);
      }
    } catch (e) {
      console.error(e);
    }
  };
  const openModal = () => {
    setModalVisible(true);
  };
  const closeModalbtn =()=>{
    setModalVisible(false)
  }

  const onGoDownListItemPress = async (item)=>{
    console.log('name is................',item.Field4);
    setModalVisible(false);
          setValue( item.StringText);
        await AsyncStorage.setItem('GoDownValue', item.StringText);
        await AsyncStorage.setItem('GoDownCode',item.Field4);
        loadGoDownSpecificData(item.Field4);
  }

  useEffect(() => {
    getDashboardData();
    getSeletedgoDown();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    getSeletedgoDown();
    getDashboardData();
    const getValue = await AsyncStorage.getItem('GoDownValue');
    setValue(getValue);
    // Simulate a network request or some other async operation
    setTimeout(() => {
      // Do something after the refresh is complete
      setRefreshing(false);
    }, 500); // You can adjust the timeout as needed
  };

  return (
    <Design
    items={items}
      moveToProfile={moveToProfile}
      TabsNavigations={TabsNavigations}
      dashBoardData={dashBoardData}
      isLoading={isLoading}
      openModal={openModal}
      modalVisible={modalVisible}
      closeModalbtn={closeModalbtn}
      onGoDownListItemPress={onGoDownListItemPress}
      value={value}
      valueMonth={valueMonth}
      open={open}
      itemsMonths={itemsMonths}
      setItems={setItemsMonths}
      setValueMonth={setValueMonth}
      setOpen={setOpen}
      moveToPurchesVsSale={moveToPurchesVsSale}
      moveToPayableVsReceivables={moveToPayableVsReceivables}
      onRefresh={onRefresh}
      refreshing={refreshing}
      moveToBillApprovals={moveToBillApprovals}
    />
  );
};

export default ProcurementScreen;
