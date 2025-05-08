import React, {useEffect, useState} from 'react';
import {loadOrders} from '../../server/service';
import Design from './Design';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CreditHistory = props => {
  const [selectedTab, setSelecetTab] = useState('Payables');
  const [order, setOrders] = useState([]);
  const [filterOrders, setFilterOrder] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const Tabs = [
    {id: 'Payables', title: 'Payables'},
    {id: 'Receivables', title: 'Receivables'},
  ];

  const goBack = () => {
    props.navigation.replace('Procurement');
  };

  const moveToProfile = () => {
    props.navigation.navigate('profile');
  };

  const getOrders = async () => {
    setLoading(true);
    setFilterOrder(null);
    setOrders(null);
    const token = await AsyncStorage.getItem('MY_TOKEN');

    let orderUrl =
      selectedTab == 'Receivables'
        ? 'https://livemanagerapi.finexcloud.com/Sales/GetAllPartiallyPaidBillsForSales?skip=1&next=100000&filterText='
        : 'https://livemanagerapi.finexcloud.com/Purchase/GetAllPartiallyPaidBills?skip=1&next=100000&filterText=';
    const res = await loadOrders(token, orderUrl);
    console.log('url is', orderUrl, ' my orders', res.Data);
    if (res.Data !== null) {
      setOrders(res.Data);
      setFilterOrder(res.Data);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, [selectedTab]);

  return (
    <Design
      goBack={goBack}
      moveToProfile={moveToProfile}
      Tabs={Tabs}
      selectedTab={selectedTab}
      setSelecetTab={setSelecetTab}
      isLoading={isLoading}
      order={order}
      filterOrders={filterOrders}
    />
  );
};

export default CreditHistory;
