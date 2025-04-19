import React from 'react';
import {View, ScrollView,Image,Text, RefreshControl} from 'react-native';
import Header from '../../components/Header';
import styles from './style';
import NavigationHeader from '../../components/NavigationHeader';
import Loading from '../../components/Loading';
import LineGraph from '../../components/LineGraph';
import sizeHelper from '../../helpers/sizeHelper';
import { gray, white } from '../../constants/colors';
import {
  LinearGradient,
  useFont,
  vec,
  Text as SKText,
  DashPathEffect,
} from '@shopify/react-native-skia';
import {CartesianChart, Line, useChartPressState,Bar, Area} from 'victory-native';
import CounterActivity from '../../components/CounterActivity';
import ToolTip from '../../components/ToolTip';
import ProductFamilyGraph from '../../components/ProductFamilyGraph';
const interSbold = require('../../assets/fonts/InterSBold.ttf');
const interBold = require('../../assets/fonts/InterBold.ttf');

const INIT_STATE = {x: 0, y: {Count: 0, Amount: 0}};
const Design = ({moveToProfile, TabsNavigations, isLoading, pOSGraphs,onRefresh , refreshing}) => {
  const {state: pressState, isActive} = useChartPressState(INIT_STATE);
  const font = useFont(interSbold, sizeHelper.calHp(24));
  const chartFont = useFont(interBold, 12);

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Header text={'Manager'} moveToProfile={moveToProfile} />
        </View>
        <NavigationHeader TabsNavigations={TabsNavigations} />
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
{/* <View style={styles.graphView}> */}
      {/* <Text style={styles.graphHeading}>{'Counter Activity'}</Text>
      <View style={styles.graphContainer}>

        </View>
        </View> */}
        <CounterActivity data={pOSGraphs?.commonPOSInfo}/>
      {pOSGraphs?.counterSalesData.length>=5&&<LineGraph graphHeeading={'Counter Sales'} data={pOSGraphs?.counterSalesData} xLabelName={"StringName"} yLabelName={['Amount']}/>}
      {pOSGraphs?.salesAgentData.length>=5&&<LineGraph graphHeeading={'Sales Agents'} data={pOSGraphs?.salesAgentData} xLabelName={"StringName"} yLabelName={['Amount']}/>}
      {/* <BarChart graphHeading={'BarChart'}/> */}
     {pOSGraphs?.productFamiliesData.length>=5 &&( <ProductFamilyGraph  graphHeeading={'Products Families'} data={pOSGraphs?.productFamiliesData}/>)}

      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
