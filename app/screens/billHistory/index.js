import React, {useEffect, useState} from 'react';
import Design from './design';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadOrders } from '../../server/service';
import list from '../../constants/Common';
import { GET_PURCHASE_ORDERS, GET_PURCHASE_ORDER_DETAIL, GET_SALES_ORDERS, GET_SALES_ORDER_DETAIL } from '../../server/constant';
const BillHistory = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('sales');
  const [backToSearch, setbackToSearch] = useState(false);
  const [isSalesOrders, setSalesOrder] = useState(true);
  const [isLoadMore, setLoadmore] = useState(true);
  const [order, setOrders] = useState([]);
  const [filterOrders, setFilterOrder] = useState([]);
  const [search, setSearch] = useState('');
  const [getDetails, setGetDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Sales');
  const [items, setItems] = useState([
    {label: 'Sales', value: 'sales'},
    {label: 'Purchase', value: 'purchase'},
  ]);

  const goBack = () => {
    backToSearch? setbackToSearch(false) : props.navigation.goBack();
  };

  const moveToProfile = () => {
    props.navigation.navigate('profile');
  };

  const searchFilterFunction = async() => {
    setLoading(true);
    if (search) {
      
    const token = await AsyncStorage.getItem('MY_TOKEN');
      setLoadmore(false);
      let orderUrl = 
  (value === 'sales' ? GET_SALES_ORDERS : GET_PURCHASE_ORDERS) +
  'skip=1&next=30&filterText=' + encodeURIComponent(search) +
  '&sortby=2&sort=ASC&cultureCode=' + encodeURIComponent(list.CultureCode);

    console.log('url is', orderUrl);
    const res = await  loadOrders(token, orderUrl);
    console.log('my orders', res.Data);
    if(res.Data !== null){
      value === 'sales'? setOrders(res.Data) : setFilterOrder(res.Data);
    }else{
      Alert.alert('Alert','Record is not found');
      setLoading(false);
    }
      
      // setSearch(text);
    } else {
      if(value=='sales'){
        getOrders();
      }else if(value=='purchase'){
        getPurchaseOrders();
      }
    }
    setLoading(false);
  };

  const getOrders = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('MY_TOKEN');
    let num = value == 'sales' 
      ? order.length == 0
        ? 1
        : Math.ceil(order.length / 10) + 1
      : 1;
    let orderUrl =
      GET_SALES_ORDERS +
      'skip=' +
      num +
      '&next=10&filterText' +
      '&cultureCode=' +
      list.CultureCode +
      '&sortby=2&sort=DSC';
    const res = await loadOrders(token, orderUrl);
    console.log('my orders', res.Data);
    if (res.Data !== null) {
        setOrders(prevData => [...(prevData || []), ...res.Data]);
      //  setFilterOrder(prevData => [...(prevData || []), ...res.Data]);
      setLoading(false);
    }else{
      setLoading(false);
      Alert.alert('Alert',"Record is not found.");
    }
  };
  const getPurchaseOrders = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem('MY_TOKEN');
    let num = value !== 'sales' 
      ? filterOrders.length == 0
        ? 1
        : Math.ceil(filterOrders.length / 10) + 1
      : 1;
    let orderUrl =
      GET_PURCHASE_ORDERS +
      'skip=' +
      num +
      '&next=10&filterText' +
      '&cultureCode=' +
      list.CultureCode +
      '&sortby=2&sort=DSC';;
    const res = await loadOrders(token, orderUrl);
    console.log('my orders', res.Data);
    if (res.Data !== null) {
      // setOrders(prevData => [...(prevData || []), ...res.Data]);
  setFilterOrder(prevData => [...(prevData || []), ...res.Data]);
      setLoading(false);
    }else{
      setLoading(false);
      Alert.alert('Alert',"Record is not found.")
    }
  };

  const getOrderDetail = async (item) => {
    setLoading(true);
    const token = await AsyncStorage.getItem('MY_TOKEN');
    if (value == 'sales') {
      let orderUrl =
        GET_SALES_ORDER_DETAIL +
        item.InvoiceNumber +
        '&cultureCode=' +
        list.CultureCode +
        '&fiscalSpanId=' +
        item?.FiscalSpanID;
      console.log('sales url detail', orderUrl);
      const res = await  loadOrders(token, orderUrl);
      console.log('my order Detail is', res.Data);
      if (res.Data !== null) {
        setGetDetails(res.Data);
        setbackToSearch(true);
      }
    } else {
      let orderUrl =
        GET_PURCHASE_ORDER_DETAIL +
        item.InvoiceNumber +
        '&cultureCode=' +
        list.CultureCode +
        '&fiscalSpanId=' +
        item?.FiscalSpanID;
      const res = await   loadOrders(token, orderUrl);
      console.log('my order Detail is', res.Data);
      if (res.Data !== null) {
        setGetDetails(res.Data);
        setbackToSearch(true);
      }
    }
    setLoading(false);
  };

  useEffect(()=>{
    setOrders([]);
    setFilterOrder([]);
    setSearch('');
    if(value=='sales'){
      getOrders();
    }else if(value=='purchase'){
      getPurchaseOrders();
    }
    
  },[value]);

  return( 
  <Design
  goBack={goBack}
  items={items}
  value={value}
  setValue={setValue}
  open={open}
  setOpen={setOpen}
  order={order}
  moveToProfile={moveToProfile}
  isLoading={isLoading}
  isSalesOrders={isSalesOrders}
  getOrders={getOrders}
  getPurchaseOrders={getPurchaseOrders}
  isLoadMore={isLoadMore}
  getOrderDetail={getOrderDetail}
  getDetails={getDetails}
  backToSearch={backToSearch}
  searchFilterFunction={searchFilterFunction}
  search={search}
  setSearch={setSearch}
  filterOrders={filterOrders}
  />
  );
};

export default BillHistory;
