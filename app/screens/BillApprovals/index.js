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
  const [pageNo, setPageNo] = useState(1);
  const [getrecordLenght, setrecordLenght] = useState(0);
  const [value, setValue] = useState('pending');
  const [inputValue, setInputValue] = useState('');
  const [selectedItem, setSelectedItem] = useState(suitcaseArray[0]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [salebillsPending, setSalebillsPending] = useState([]);
  const [salebillsApproved, setSalebillsApproved] = useState([]);
  const [salebillsReject, setSalebillsReject] = useState([]);
  const [purchasebillsPending, setPurchasebillsPending] = useState([]);
  const [purchasebillsApproved, setPurchasebillsApproved] = useState([]);
  const [purchasebillsReject, setPurchasebillsReject] = useState([]);
  const [saleordersPending, setSaleordersPending] = useState([]);
  const [saleordersApproved, setSaleordersApproved] = useState([]);
  const [saleordersReject, setSaleordersReject] = useState([]);
  const [purchaseordersPending, setPurchaseordersPending] = useState([]);
  const [purchaseordersApproved, setPurchaseordersApproved] = useState([]);
  const [purchaseordersReject, setPurchaseordersReject] = useState([]);

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
      setSalebillsPending([]);
      setSalebillsApproved([]);
      setFilterBills([]);
      setSalebillsReject([]);
      setPurchasebillsPending([]);
      setPurchasebillsApproved([]);
      setPurchasebillsReject([]);
      setSaleordersPending([]);
      setSaleordersApproved([]);
      setSaleordersReject([]);
      setPurchaseordersPending([]);
      setPurchaseordersApproved([]);
      setPurchaseordersReject([]);
      setPageNo(1);
      setInputValue('');
      // Wait for one render frame to ensure state is cleared
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
  console.log('value...1.....', value);
  const getBills = useCallback(
    async statusCode => {
      try {
        setLoading(true);
        setLoadMore(true);
        const pageSize = 20;
        const token = await AsyncStorage.getItem('MY_TOKEN');

        const billType =
          selectedTab === 'saleorders' || selectedTab === 'salebills'
            ? statusCode.sales
            : statusCode.purchase;

        let recordLength = 0;

        if (selectedTab === 'salebills') {
          recordLength =
            value === 'pending'
              ? salebillsPending.length
              : value === 'approved'
              ? salebillsApproved.length
              : salebillsReject.length;
        }else if (selectedTab === 'purchasebills') {
          recordLength =
            value === 'pending'
              ? purchasebillsPending.length
              : value === 'approved'
              ? purchasebillsApproved.length
              : purchasebillsReject.length;
        }else if (selectedTab === 'saleorders') {
          recordLength =
            value === 'pending'
              ? saleordersPending.length
              : value === 'approved'
              ? saleordersApproved.length
              : saleordersReject.length;
        }else if (selectedTab === 'purchaseorders') {
          recordLength =
            value === 'pending'
              ? purchaseordersPending.length
              : value === 'approved'
              ? purchaseordersApproved.length
              : purchaseordersReject.length;
        }


        const page =
          recordLength === 0 ? 1 : Math.ceil(recordLength / pageSize) + 1;
        const url = `${GET_BILLS}${page}/${pageSize}/${billType}/${list.CultureCode}`;

        const res = await loadOrders(token, url);
        if (res.Data !== 'null') {
          const data = JSON.parse(res.Data);
          setTotalRecord(data[0].Total);

          const appendData = setter =>
            setter(prev => [...(prev || []), ...data]);

          if (selectedTab === 'salebills') {
            if (value === 'pending') appendData(setSalebillsPending);
            else if (value === 'approved') appendData(setSalebillsApproved);
            else if (value === 'rejected') appendData(setSalebillsReject);
          } else if (selectedTab === 'purchasebills') {
            if (value === 'pending') appendData(setPurchasebillsPending);
            else if (value === 'approved') appendData(setPurchasebillsApproved);
            else if (value === 'rejected') appendData(setPurchasebillsReject);
          } else if (selectedTab === 'saleorders') {
            if (value === 'pending') appendData(setSaleordersPending);
            else if (value === 'approved') appendData(setSaleordersApproved);
            else if (value === 'rejected') appendData(setSaleordersReject);
          } else if (selectedTab === 'purchaseorders') {
            if (value === 'pending') appendData(setPurchaseordersPending);
            else if (value === 'approved')
              appendData(setPurchaseordersApproved);
            else if (value === 'rejected') appendData(setPurchaseordersReject);
          }

          appendData(setBills);
          appendData(setFilterBills);
        }else{
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
        // setFilterBills(prev => prev.filter(b => b.InvoiceNumber !== BillNumber));
        // setBills(prev => prev.filter(b => b.InvoiceNumber !== BillNumber));
        const removeBillByNumber = setter => {
          setter(prev => prev.filter(b => b.InvoiceNumber !== BillNumber));
        };

        if (selectedTab === 'salebills') {
          if (value === 'pending') {
            removeBillByNumber(setSalebillsPending);
            setTotalRecord(totalRecord-1);
          } else if (value === 'approved') {
            removeBillByNumber(setSalebillsApproved);
            setTotalRecord(totalRecord-1);
          } else if (value === 'rejected') {
            removeBillByNumber(setSalebillsReject);
            setTotalRecord(totalRecord-1);
          }
        } else if (selectedTab === 'purchasebills') {
          if (value === 'pending') {
            removeBillByNumber(setPurchasebillsPending);
            setTotalRecord(totalRecord-1);
          } else if (value === 'approved') {
            removeBillByNumber(setPurchasebillsApproved);
            setTotalRecord(totalRecord-1);
          } else if (value === 'rejected') {
            removeBillByNumber(setPurchasebillsReject);
            setTotalRecord(totalRecord-1);
          }
        } else if (selectedTab === 'saleorders') {
          if (value === 'pending') {
            removeBillByNumber(setSaleordersPending);
            setTotalRecord(totalRecord-1);
          } else if (value === 'approved') {
            removeBillByNumber(setSaleordersApproved);
            setTotalRecord(totalRecord-1);
          } else if (value === 'rejected') {
            removeBillByNumber(setSaleordersReject);
            setTotalRecord(totalRecord-1);
          }
        } else if (selectedTab === 'purchaseorders') {
          if (value === 'pending') {
            removeBillByNumber(setPurchaseordersPending);
            setTotalRecord(totalRecord-1);
          } else if (value === 'approved') {
            removeBillByNumber(setPurchaseordersApproved);
            setTotalRecord(totalRecord-1);
          } else if (value === 'rejected') {
            removeBillByNumber(setPurchaseordersReject);
            setTotalRecord(totalRecord-1);
          }
        }
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
    setPageNo(1);
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
      pageNo={pageNo}
      setPageNo={setPageNo}
      getPendingOrders={getPendingOrders}
      getApprovedOrders={getApprovedOrders}
      getRejectedOrders={getRejectedOrders}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      salebillsPending={salebillsPending}
      salebillsApproved={salebillsApproved}
      salebillsReject={salebillsReject}
      getrecordLenght={getrecordLenght}
      purchasebillsPending={purchasebillsPending}
      purchasebillsApproved={purchasebillsApproved}
      purchasebillsReject={purchasebillsReject}
      saleordersPending={saleordersPending}
      saleordersApproved={saleordersApproved}
      saleordersReject={saleordersReject}
      purchaseordersPending={purchaseordersPending}
      purchaseordersApproved={purchaseordersApproved}
      purchaseordersReject={purchaseordersReject}
    />
  );
};

export default BillApprovals;
