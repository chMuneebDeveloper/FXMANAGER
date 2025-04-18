import {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import list from '../../constants/Common';
import {
  GET_FINANCE_STATEMENT_REPORT,
  GET_FINANCE_STATEMENT_REPORT_Detail,
} from '../../server/constant';
import {loadOrders} from '../../server/service';
import Design from './design';

const PartnerStatementofAccounts = props => {
  const [reportData, setReportData] = useState();
  const [tabIndex, setTabIndex] = useState(0);
  const [isLoading, setLaoding] = useState(false);
  const [open, setOpen] = useState(false);
  const [reportList, setReportList] = useState([]);
  const [totalRecord, setTotalRecord] = useState(0);
  const [from, setFrom] = useState(new Date('2024-01-01'));
  const [to, setTo] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState(null);
  const [items, setItems] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [backSearch, setBackSearch] = useState(false);
  const [value, setValue] = useState(null);
  const tabData = [
    {id: 0, name: 'All'},
    {id: 1, name: 'Buyer'},
    {id: 2, name: 'Vendor'},
  ];

  const moveToProfile = () => {
    props.navigation.navigate('profile');
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const goBacktoSearch = () => {
    setBackSearch(false);
    setValue(null);
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

  const getAllReportData = async () => {
    setLaoding(true);
    const token = await AsyncStorage.getItem('MY_TOKEN');
    let orderUrl =
      GET_FINANCE_STATEMENT_REPORT + '0&cultureCode=' + list.CultureCode;
    console.log('GET_FINANCE_STATEMENT_REPORT url', orderUrl, token);
    const res = await loadOrders(token, orderUrl);

    console.log('my rider collection is  1', res);
    if (res.Data !== null) {
      setReportData(res.Data);
      setTotalRecord(res.Total);
      let Accounts = [];
      let Buyers = [];
      let Vendor = [];
      res.Data.AccountList.forEach(element => {
        let obj = {label: '', value: ''};
        obj.value = element.AccountCode;
        obj.label = element.AccountName;
        Accounts.push(obj);
      });
      console.log('all array is', Accounts);
      setItems(Accounts);

      res.Data.BuyerList.forEach(element => {
        let obj = {label: '', value: ''};
        obj.value = element.Code;
        obj.label = element.Name;
        Buyers.push(obj);
      });
      console.log('all array is', Buyers);
      setBuyers(Buyers);

      res.Data.VendorList.forEach(element => {
        let obj = {label: '', value: ''};
        obj.value = element.Code;
        obj.label = element.Name;
        Vendor.push(obj);
      });
      console.log('all array is', Vendor);
      setVendor(Vendor);
      setLaoding(false);
    }
  };

  useEffect(() => {
    getAllReportData();
  }, []);

  const searchReportDetail = async () => {
    setLaoding(true);
    console.log('-----', from);
    const startDate = `${from.getFullYear()}${String(
      from.getMonth() + 1,
    ).padStart(2, '0')}${String(from.getDate()).padStart(2, '0')}`;
    let lastDate =
      to.getFullYear().toString() +
      String(to.getMonth() + 1).padStart(2, '0') +
      String(to.getDate()).padStart(2, '0');
    let typ = tabIndex == 0 ? 2 : tabIndex == 1 ? 1 : 0;
    const token = await AsyncStorage.getItem('MY_TOKEN');
    let orderUrl =
      GET_FINANCE_STATEMENT_REPORT_Detail +
      typ +
      '&startDate=' +
      startDate +
      '&endDate=' +
      lastDate +
      '&code=' +
      value +
      '&cultureCode=' +
      list.CultureCode;

    console.log(
      'GET_FINANCE_STATEMENT_REPORT_Detail url------------',
      orderUrl,
    );
    const res = await loadOrders(token, orderUrl);

    console.log('GET_FINANCE_STATEMENT_REPORT_Detail is', res.Data);
    setTotalRecord(res.Total);
    if (res.Data !== null) {
      setReportList(res.Data);
      setLaoding(false);
      setBackSearch(true);
    } else {
      setReportList(null);
      setLaoding(false);
      Alert.alert('Alert', 'Recored is not Found');
    }
  };

  return (
    <Design
      moveToProfile={moveToProfile}
      goBack={goBack}
      tabData={tabData}
      setTabIndex={setTabIndex}
      tabIndex={tabIndex}
      isLoading={isLoading}
      open={open}
      setOpen={setOpen}
      setFrom={setFrom}
      from={from}
      setTo={setTo}
      to={to}
      showPicker={showPicker}
      setShowPicker={setShowPicker}
      currentPicker={currentPicker}
      setCurrentPicker={setCurrentPicker}
      handleDateChange={handleDateChange}
      formatDate={formatDate}
      searchReportDetail={searchReportDetail}
      reportData={reportData}
      reportList={reportList}
      totalRecord={totalRecord}
      items={items}
      setItems={setItems}
      setValue={setValue}
      value={value}
      backSearch={backSearch}
      buyers={buyers}
      setBuyers={setBuyers}
      vendor={vendor}
      setVendor={setVendor}
      goBacktoSearch={goBacktoSearch}
    />
  );
};

export default PartnerStatementofAccounts;
