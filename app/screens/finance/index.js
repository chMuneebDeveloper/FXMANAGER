import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { convertRtl } from 'react-native-rtl-reshaper';
import { GET_ADMIN_FINANCEDATA } from '../../server/constant';
import { loadOrders } from '../../server/service';
import Design from './design';

const FinanceScreen = (props) => {
  const [selectedMenu, setSelectedMenu] = useState();
  const [isLoading, setLoading] = useState(false);
  const [financeGraphs, setFinanceGraphs] = useState();
  const [refreshing, setRefreshing] = useState(false);
  // helper function to calculate the absolute value safely
  const getAbs = (val) =>
    val === undefined ? 0 : val < 0 ? Math.abs(val) : val;

  const financeData = async () => {
    setLoading(true)
    const dashboardUrl = GET_ADMIN_FINANCEDATA;
    console.log('finance url is', dashboardUrl);

    try {
      const token = await AsyncStorage.getItem('MY_TOKEN');
      const res = await loadOrders(token, dashboardUrl);
      console.log('finance detail is', res.Data);

      if (res.Data !== null && Array.isArray(res.Data)) {
        // Prepare arrays for different graph types
        let expenseVsRevence = [];
        let topExpenses = [];
        let topEarnings = [];
        let binaryData = [];

        // First pass: sort each element
        res.Data.forEach((element) => {
          if (element.GraphID == 201) {
            topExpenses.push(element);
          } else if (element.GraphID == 202) {
            // Process for expenseVsRevence
            element.Field4 = Number(Number(element.Field4).toFixed(0));

            let shortenedText = String(element.StringText).slice(0, 3);
            // Optionally convert RTL if text is not alphanumeric
            if (!/^[a-z0-9]+$/i.test(shortenedText)) {
              shortenedText = convertRtl(shortenedText);
            }
            element.StringText = shortenedText;
            expenseVsRevence.push(element);
          } else if (element.GraphID == 203) {
            // Process for topEarnings
            const firstPart = String(element.StringText).split(' ')[0];
            element.StringText = convertRtl(firstPart);
            topEarnings.push(element);
          } else {
            // For other items, push them into binaryData.
            binaryData.push(element);
          }
        });

        // Second pass: calculate color, percentage and displayValue
        // This pass uses binaryData itself for look-ups (by assumed fixed indices)
        binaryData.forEach((element) => {
          if (element.StringText === 'Assets') {
            const value1 = getAbs(binaryData[0]?.Value);
            const value2 = getAbs(binaryData[1]?.Value);
            const value3 = getAbs(binaryData[4]?.Value);
            const total = value1 + value2 + value3;
            element.color = 'rgba(89, 95, 213, 1)';
            element.percentage = total ? `${(value1 / total) * 100}%` : '0%';
          } else if (element.StringText === 'Payables') {
            const value1 = getAbs(binaryData[0]?.Value);
            const value2 = getAbs(binaryData[1]?.Value);
            const value3 = getAbs(binaryData[4]?.Value);
            const total = value1 + value2 + value3;
            element.color = 'rgba(237, 183, 48, 1)';
            element.percentage = total ? `${(value2 / total) * 100}%` : '0%';
          } else if (element.StringText === 'Expenses') {
            const value1 = getAbs(binaryData[3]?.Value);
            const value2 = getAbs(binaryData[2]?.Value);
            const total = value1 + value2;
            element.color = 'rgba(255, 0, 4, 1)';
            element.percentage = total ? `${(value2 / total) * 100}%` : '0%';
          } else if (element.StringText === 'Income') {
            const value1 = getAbs(binaryData[3]?.Value);
            const value2 = getAbs(binaryData[2]?.Value);
            const total = value1 + value2;
            element.color = 'rgb(102, 255, 51)';
            element.percentage = total ? `${(value1 / total) * 100}%` : '0%';
          } else if (element.StringText === 'Equity') {
            const value1 = getAbs(binaryData[0]?.Value);
            const value2 = getAbs(binaryData[1]?.Value);
            const value3 = getAbs(binaryData[4]?.Value);
            const total = value1 + value2 + value3;
            element.color = 'rgb(255, 0, 255)';
            element.percentage = total ? `${(value3 / total) * 100}%` : '0%';
          }
          // Calculate and set the formatted display value with DR/CR suffix
          const roundedValue = Math.abs(element.Value).toFixed(2);
          const formattedValue = Number(roundedValue).toLocaleString();
          element.displayValue =
            element.Value < 0 ? `${formattedValue} CR` : `${formattedValue} DR`;
        });

        // Build the final object to update state.
        const obj = {
          expenseVsRevence,
          topExpenses,
          topEarnings,
          binaryData,
        };

        // Optionally, process expenseVsRevence for chart labels & data if needed.
        // (This example leaves that commented as in your original code.)
        /*
        let label = [];
        let dataValue = [];
        let returnData = [];
        expenseVsRevence.forEach((element) => {
          const nam = String(element.StringText);
          const half = nam.slice(0, 3);
          label.push(half);
          dataValue.push(Math.round(element.Field4));
          returnData.push(Math.round(element.Value));
        });
        */

        setFinanceGraphs(obj);
        setLoading(false);
      } else if (res.message === 'Unauthorized') {
        setLoading(false);
      }
    } catch (e) {
      console.error('error is', e);
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedMenu('sixmonth');
    financeData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    financeData();
    setTimeout(() => {
      setRefreshing(false);
    }, 500); 
  };

  const moveToProfile = () => {
    props.navigation.navigate('profile');
  };

  const moveToPartnerStatementofAccounts = () => {
    props.navigation.navigate('PartnerStatementofAccounts');
  };

  const moveToMainAccountsSummary = () => {
    props.navigation.navigate('MainAccountsSummary');
  };
  
  const TabsNavigations = (tab) => {
    props.navigation.navigate(tab);
  };

  return (
    <Design
      moveToProfile={moveToProfile}
      TabsNavigations={TabsNavigations}
      isLoading={isLoading}
      financeGraphs={financeGraphs}
      moveToPartnerStatementofAccounts={moveToPartnerStatementofAccounts}
      moveToMainAccountsSummary={moveToMainAccountsSummary}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

export default FinanceScreen;
