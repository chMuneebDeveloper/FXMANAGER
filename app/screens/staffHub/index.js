import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fetchService} from '../../server/service';
import Design from './design';
import {API_BASE_URL} from '../../server/constant';
import Toast from 'react-native-simple-toast';
const StaffHubScreen = props => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [isAlert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      let token = await AsyncStorage.getItem('MY_TOKEN');
      let url = API_BASE_URL + '/Managers/SelectAll?cultureCode=en-US';
      console.log(url, 'GET', token);
      const response = await fetchService(url, 'GET', token);

      if (response.IsSuccess) {
        let data = JSON.parse(response?.Data);
        setData(data);
        console.log('Response:', response);
      } else {
        setAlertMessage(response.ReturnMessage);
        setAlert(true);
      }
    } catch (error) {
      setAlertMessage(error);
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      await fetchData();
    };

    getData();

    return () => {
      // Cleanup if necessary
    };
  }, []);

  const approvedRejectLeaves = async (EmpCode, EmpLeaveCode, status) => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('MY_TOKEN');
      const url = `${API_BASE_URL}/Managers/UpdateStatus?EmpLeaveCode=${EmpLeaveCode}&EmpCode=${EmpCode}&Status=${status}`;
      console.log('status......',status == 1);
      const response = await fetchService(url, 'GET', token);
      if (response?.IsSuccess) {
        Toast.show(
          'Leave ' + (status == 1 ? 'Approved' : 'Rejected') + ' successfully!',
          Toast.SHORT,
        );
        fetchData();
      } else {
        setAlertMessage(response.ReturnMessage);
        setAlert(true);
      }
    } catch (error) {
      setAlertMessage(error);
      setAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchData().then(() => setIsRefreshing(false));
  };

  const onCloseAlert = () => {
    setAlert(false);
    setAlertMessage('');
  };

  const moveToProfile = () => {
    props.navigation.navigate('profile');
  };

  const TabsNavigations = Tab => {
    props.navigation.navigate(Tab);
  };
  return (
    <Design
      data={data}
      isLoading={isLoading}
      approvedRejectLeaves={approvedRejectLeaves}
      onCloseAlert={onCloseAlert}
      isAlert={isAlert}
      alertMessage={alertMessage}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      moveToProfile={moveToProfile}
      TabsNavigations={TabsNavigations}
    />
  );
};

export default StaffHubScreen;
