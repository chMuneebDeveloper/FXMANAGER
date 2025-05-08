import React, {useEffect, useState, useCallback} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Design from './design';
import {
  GET_BILLS,
  SEEARCH_BILLS,
  APPROVE_SALE_BILLS,
  APPROVE_PURCHASE_BILLS,
  APPROVE_SALE_ORDERS,
  APPROVE_PURCHASE_ORDERS,
} from '../../server/constant';
import {fetchService, loadOrders} from '../../server/service';
import list from '../../constants/Common';

const suitcaseArray = [
  {id: 'pending', title: 'Pending'},
  {id: 'approved', title: 'Approved'},
  {id: 'rejected', title: 'Rejected'},
];

const BillApprovals = ({navigation}) => {
  const [selectedTab, setSelectedTab] = useState('salebills');
  const [bills, setBills] = useState([]);
  const [filterBills, setFilterBills] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isLoadMore, setLoadMore] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [value, setValue] = useState('pending');
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(suitcaseArray[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const salePurchesTabs = [
    {
      id: 1,
      title: 'Sale Bills',
      value: 'salebills',
    },
    {
      id: 2,
      title: 'Purchase Bills',
      value: 'purchasebills',
    },
    {
      id: 3,
      title: 'Sale Orders',
      value: 'saleorders',
    },
    {
      id: 4,
      title: 'Purchase Orders',
      value: 'purchaseorders',
    },
  ];
  useEffect(() => {
    const clearAndFetch = async () => {
      setBills([]);
      setInputValue('');
      requestAnimationFrame(() => {
        const isOrderTab =
          selectedTab === 'purchaseorders' || selectedTab === 'saleorders';
        if (value == 'pending') {
          isOrderTab ? getPendingOrders() : getPendingBills();
        } else if (value == 'rejected') {
          isOrderTab ? getRejectedOrders() : getRejectedBills();
        } else {
          isOrderTab ? getApprovedOrders() : getApprovedBills();
        }
      });
    };

    clearAndFetch();
  }, [value, selectedTab]);

  const goBack = () => navigation.goBack();
  const moveToProfile = () => navigation.navigate('profile');
  const getBills = useCallback(
    async statusCode => {
      try {
        setLoading(true);
        setLoadMore(true);
        const pageSize = 10000;
        const token = await AsyncStorage.getItem('MY_TOKEN');

        const billType =
          selectedTab === 'saleorders' || selectedTab === 'salebills'
            ? statusCode.sales
            : statusCode.purchase;

        // const page =
        //   recordLength === 0 ? 1 : Math.ceil(recordLength / pageSize) + 1;
        const url = `${GET_BILLS}${1}/${pageSize}/${billType}/${
          list.CultureCode
        }`;

        const res = await loadOrders(token, url);
        if (res.Data !== 'null') {
          const data = JSON.parse(res.Data);
          setTotalRecord(data[0].Total);
          setFilterBills(data);
          setBills(data);
        } else {
          setTotalRecord(0);
        }
      } finally {
        setLoading(false);
        setLoadMore(false);
      }
    },
    [selectedTab, filterBills, value],
  );

  const getPendingBills = () => getBills({sales: 7, purchase: 6});
  const getApprovedBills = () => getBills({sales: 9, purchase: 8});
  const getRejectedBills = () => getBills({sales: 1007, purchase: 1006});
  const getPendingOrders = () => getBills({sales: 5, purchase: 4});
  const getApprovedOrders = () => getBills({sales: 11, purchase: 10});
  const getRejectedOrders = () => getBills({sales: 1009, purchase: 1008});

  const approveRejectedBills = async (BillNumber, type) => {
    try {
      setLoading(true);
      setLoadMore(true);

      const token = await AsyncStorage.getItem('MY_TOKEN');
      const endpoints = {
        salebills: APPROVE_SALE_BILLS,
        saleorders: APPROVE_SALE_ORDERS,
        purchaseorders: APPROVE_PURCHASE_ORDERS,
        purchasebills: APPROVE_PURCHASE_BILLS,
      };
      console.log('---------------', endpoints);
      const baseUrl = endpoints[selectedTab]; // default fallback
      const url = `${baseUrl}${BillNumber}/${type}`;

      const res = await fetchService(url, 'POST', token);

      if (res.ReturnMessage === 'Success') {
        setFilterBills(prev =>
          prev.filter(b => b.InvoiceNumber !== BillNumber),
        );
        setBills(prev => prev.filter(b => b.InvoiceNumber !== BillNumber));
        setTotalRecord(totalRecord - 1);
      } else {
        Alert.alert('Alert', res.ReturnMessage);
      }
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const SearchRecord = async () => {
    try {
      setLoading(true);
      setLoadMore(true);
      const token = await AsyncStorage.getItem('MY_TOKEN');

      if (!inputValue) {
        setBills([]);
        setFilterBills([]);
        const isOrderTab =
          selectedTab === 'purchaseorders' || selectedTab === 'saleorders';

        if (value == 'pending') {
          isOrderTab ? getPendingOrders() : getPendingBills();
        } else if (value == 'rejected') {
          isOrderTab ? getRejectedOrders() : getRejectedBills();
        } else {
          isOrderTab ? getApprovedOrders() : getApprovedBills();
        }
        return;
      }

      const statusCode =
        value == 'pending' ? '0' : value == 'approved' ? '1' : '2';
      let typeCode;
      if (selectedTab === 'salebills') {
        typeCode = '7';
      } else if (selectedTab === 'purchasebills') {
        typeCode = '6';
      } else if (selectedTab === 'saleorders') {
        typeCode = '5';
      } else {
        typeCode = '4';
      }

      const url = `${SEEARCH_BILLS}${typeCode}/${list.CultureCode}/${statusCode}/${inputValue}`;

      const res = await loadOrders(token, url);

      if (res.Data !== 'null') {
        const data = JSON.parse(res.Data);
        setBills(data);
        setFilterBills(data);
      } else {
        setBills([]);
        setFilterBills([]);
        Alert.alert('Alert', 'No Record Found');
      }
    } finally {
      setLoading(false);
      setLoadMore(false);
    }
  };

  const handleSelect = item => {
    setValue(item.id);
    setSelectedItem(item);
    const isOrderTab =
      selectedTab === 'purchaseorders' || selectedTab === 'saleorders';
    if (value == 'pending') {
      isOrderTab ? getPendingOrders() : getPendingBills();
    } else if (value == 'rejected') {
      isOrderTab ? getRejectedOrders() : getRejectedBills();
    } else {
      isOrderTab ? getApprovedOrders() : getApprovedBills();
    }
    setIsRefreshing(false);
  };

  console.log('value is....................', value);
  const onRefresh = () => {
    setIsRefreshing(true);
    setInputValue('');
    const isOrderTab =
      selectedTab === 'purchaseorders' || selectedTab === 'saleorders';
    if (value == 'pending') {
      isOrderTab ? getPendingOrders() : getPendingBills();
    } else if (value == 'rejected') {
      isOrderTab ? getRejectedOrders() : getRejectedBills();
    } else {
      isOrderTab ? getApprovedOrders() : getApprovedBills();
    }
    setIsRefreshing(false);
  };

  return (
    <Design
      salePurchesTabs={salePurchesTabs}
      goBack={goBack}
      moveToProfile={moveToProfile}
      suitcaseArray={suitcaseArray}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
      isLoading={isLoading}
      bills={bills}
      filterBills={filterBills}
      value={value}
      setValue={setValue}
      getPendingBills={getPendingBills}
      getRejectedBills={getRejectedBills}
      totalRecord={totalRecord}
      isLoadMore={isLoadMore}
      approveRejectedBills={approveRejectedBills}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      handleSelect={handleSelect}
      inputValue={inputValue}
      setInputValue={setInputValue}
      SearchRecord={SearchRecord}
      getApprovedBills={getApprovedBills}
      getPendingOrders={getPendingOrders}
      getApprovedOrders={getApprovedOrders}
      getRejectedOrders={getRejectedOrders}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
    />
  );
};

export default BillApprovals;
