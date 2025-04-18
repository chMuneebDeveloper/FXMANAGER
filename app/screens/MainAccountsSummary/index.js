import React, {useEffect, useState, useRef} from 'react';
import {Alert} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import list from '../../constants/Common';
import {
  GET_FINANCE_STATEMENT_REPORT,
  GET_FINANCE_SUMMARY_REPORT_Detail,
  GET_PAGEING_MAIN_ACCOUNT,
} from '../../server/constant';
import Design from './design';
import {loadOrders} from '../../server/service';

const MainAccountsSummary = props => {
  const [reportData, setReportData] = useState();
  const [backSearch, setBackSearch] = useState(false);
  const [totalRecord, setTotalRecord] = useState(0);
  const [salesItems, setSalesItems] = useState([]);
  const [from, setFrom] = useState(new Date('2024-01-01'));
  const [valueMsg, setValueMsg] = useState(false);
  const [to, setTo] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [openSecond, setOpenSecond] = useState(false);
  const [isLoading, setLaoding] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [saleValue, setSaleValue] = useState(null);

  const numRef = useRef(1);
  const endPageRef = useRef(20);
  const GetMoreRecord = async () => {
    setLaoding(true);

    numRef.current =
      reportList.length === 20 ? 21 : Math.ceil(reportList.length) + 1;
    endPageRef.current = endPageRef.current + 20;

    const orderUrl =
      GET_PAGEING_MAIN_ACCOUNT +
      'rowIndexStart=' +
      numRef.current +
      '&rowIndexEnd=' +
      endPageRef.current +
      '&cultureCode=' +
      'en-US';

    const token = await AsyncStorage.getItem('MY_TOKEN');
    console.log('GET_FINANCE_STATEMENT_REPORT url', orderUrl, token);

    const res = await loadOrders(token, orderUrl);

    setTotalRecord(res.Total);
    if (res.Data !== null) {
      setReportList(prevData => [...prevData, ...res.Data]);
      setReportData(res.Data);
    }
    setLaoding(false);
  };

  const moveToProfile = () => {
    props.navigation.navigate('profile');
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const goBacktoSearch = () => {
    setBackSearch(false);
    setSaleValue(null);
    setValue(null);
    numRef.current = 1;
    endPageRef.current = 20;
  };

  const formatDate = date => {
    if (!date) return 'dd/mm/yyyy';
    return moment(date, 'DD-MM-YYYY').format('DD/MM/YYYY');
  };

  const handleDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (event.type === 'dismissed') return;

    if (currentPicker === 'from') {
      setFrom(selectedDate);
    } else if (currentPicker === 'to') {
      setTo(selectedDate);
    }
  };

  const getSalesReportData = async () => {
    setLaoding(true);
    const token = await AsyncStorage.getItem('MY_TOKEN');
    let orderUrl =
      GET_FINANCE_STATEMENT_REPORT + '2&cultureCode=' + list.CultureCode;
    console.log('GET_FINANCE_STATEMENT_REPORT url', orderUrl);
    const res = await loadOrders(token, orderUrl);

    console.log('my rider collection is 2', res.Total);
    setTotalRecord(res.Total);
    if (res.Data !== null) {
      setReportData(res.Data);
      let array = [];
      res.Data.AccountList.forEach(element => {
        let obj = {label: '', value: ''};
        obj.value = element.AccountCode;
        obj.label = element.AccountName;
        array.push(obj);
      });
      console.log(' array is', array);
      setItems(array);
      let srray = [];
      res.Data.SalesAgentList.forEach(element => {
        let obj = {label: '', value: ''};
        obj.value = element.Code;
        obj.label = element.Name;
        srray.push(obj);
      });
      console.log('all srray is', srray);
      setSalesItems(srray);
      setLaoding(false);
    }
  };

  useEffect(() => {
    getSalesReportData();
  }, []);

  const searchSaleReportDetail = async () => {
    setLaoding(true);
    let startDate =
      from.getFullYear().toString() +
      String(from.getMonth() + 1).padStart(2, '0') +
      String(from.getDate()).padStart(2, '0');

    let lastDate =
      to.getFullYear().toString() +
      String(to.getMonth() + 1).padStart(2, '0') +
      String(to.getDate()).padStart(2, '0');
    let orderUrl =
      GET_FINANCE_SUMMARY_REPORT_Detail +
      'startDate=' +
      startDate +
      '&endDate=' +
      lastDate +
      '&accountCode=' +
      value +
      '&cultureCode=' +
      list.CultureCode +
      '&saleAgentcode=' +
      saleValue;
    const token = await AsyncStorage.getItem('MY_TOKEN');
    console.log('GET_FINANCE_SUMMARY_REPORT_Detail url', orderUrl);
    const res = await loadOrders(token, orderUrl);
    console.log('GET_FINANCE_SUMMARY_REPORT_Detail is', res.Data);
    setTotalRecord(res.Total);
    if (res.Data !== null) {
      setReportList(res.Data);
      setLaoding(false);
      setBackSearch(true);
    } else {
      setReportList(null);
      setLaoding(false);
      Alert.alert(i18n.t('dtanotfound'));
    }
  };

  return (
    <Design
      goBack={goBack}
      moveToProfile={moveToProfile}
      open={open}
      value={value}
      items={items}
      openSecond={openSecond}
      saleValue={saleValue}
      formatDate={formatDate}
      from={from}
      to={to}
      setOpen={setOpen}
      reportData={reportData}
      salesItems={salesItems}
      handleDateChange={handleDateChange}
      showPicker={showPicker}
      setShowPicker={setShowPicker}
      currentPicker={currentPicker}
      setCurrentPicker={setCurrentPicker}
      setSalesItems={setSalesItems}
      isLoading={isLoading}
      setValue={setValue}
      setOpenSecond={setOpenSecond}
      setSaleValue={setSaleValue}
      searchSaleReportDetail={searchSaleReportDetail}
      backSearch={backSearch}
      setBackSearch={setBackSearch}
      reportList={reportList}
      GetMoreRecord={GetMoreRecord}
      totalRecord={totalRecord}
      goBacktoSearch={goBacktoSearch}
      setValueMsg={setValueMsg}
      valueMsg={valueMsg}
    />
  );
};

export default MainAccountsSummary;
