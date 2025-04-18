import React from 'react';
import {View, ScrollView,Image,Text, useColorScheme} from 'react-native';
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
const interSbold = require('../../assets/fonts/InterSBold.ttf');
const interBold = require('../../assets/fonts/InterBold.ttf');

const INIT_STATE = {x: 0, y: {Count: 0, Amount: 0}};
const Design = ({moveToProfile, TabsNavigations, isLoading, pOSGraphs}) => {
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
<ScrollView>
{/* <View style={styles.graphView}> */}
      {/* <Text style={styles.graphHeading}>{'Counter Activity'}</Text>
      <View style={styles.graphContainer}>

        </View>
        </View> */}
        <CounterActivity data={pOSGraphs?.commonPOSInfo}/>
      {pOSGraphs?.counterSalesData.length>=5&&<LineGraph graphHeeading={'Counter Sales'} data={pOSGraphs?.counterSalesData} xLabelName={"StringName"} yLabelName={['Amount']}/>}
      {pOSGraphs?.salesAgentData.length>=5&&<LineGraph graphHeeading={'Sales Agents'} data={pOSGraphs?.salesAgentData} xLabelName={"StringName"} yLabelName={['Amount']}/>}
      {/* <BarChart graphHeading={'BarChart'}/> */}
     { pOSGraphs?.productFamiliesData.length>=5 && (pOSGraphs?.productFamiliesData? (
  <View style={{ backgroundColor: white, paddingLeft: sizeHelper.calHp(60) }}>
  <View style={styles.graphView}>
      <Text style={styles.graphHeading}>{'Products families'}</Text>
      <View style={styles.graphContainer}>
        {/* {isActive && (
            <Text style={{position: 'absolute', top: 10, left: 20}}>
              Selected X: {pressState.x.value.value} | High:{' '}
              {pressState.y.Amount.value.value}
            </Text>
          )} */}
          {console.log('data is for last graph...',pOSGraphs)}
        {pOSGraphs?.productFamiliesData ? (
          <CartesianChart
          
            data={pOSGraphs?.productFamiliesData}
            xKey={"StringName"}
            yKeys={['Count']}
            domainPadding={{top: 40,left:-10,
                right:30,}}
            axisOptions={{
              
              font,
              tickCount: 5,
              labelColor: '#B5B9C0',
              labelRotate:45,
              lineColor: {
                grid:  {
                // x: "transparent",
                y: '#B5B9C0',
                },
               },
              formatYLabel: t =>
                t >= 1000000 || t <= -1000000
                  ? `${(t / 1000000).toFixed(1)}M`
                  : t >= 1000 || t <= -1000
                  ? `${(t / 1000).toFixed(1)}K`
                  : t.toString(),
                  xAxis: {
                    labelRotate	: 90,
                    
                  },
                  lineWidth: { 
                    grid: { 
                      x: 0, 
                      y: sizeHelper.calHp(1), 
                    }, 
                    frame: 0 
                  },
                 
            }}
            chartPressState={pressState}>
            {({points, chartBounds}) => (
              <>
                <SKText
                  x={chartBounds.left }
                  y={10}
                  font={chartFont}
                  text={
                    // `Counter No: ${pressState.x.value.value}
                    `Products : ${ pressState.y.Count.value.value.toFixed(2)}`
                  }
                  color={'#8270fd'}
                  style={'fill'}
                />
                {/* <Line
                  points={points.Count}
                  color="#8270fd"
                  strokeWidth={1} 
                  animate={{type: 'timing', duration: 500}}
                  curveType={'monotoneX'}
                />
                <Area
                  points={points.Count}
                  y0={chartBounds.bottom}
                  curveType={'monotoneX'}
                  animate={{type: 'timing', duration: 500}}>
                  <LinearGradient
                    start={vec(chartBounds.left, chartBounds.top)}
                    end={vec(chartBounds.left, chartBounds.bottom)}
                    colors={['#8270fd', 'rgba(89, 95, 213, 0.3)']}
                  />
                </Area> */}
                        <Bar
          points={points.Count}
          chartBounds={chartBounds}
          color='#8270fd'
          barWidth={20}
          
          roundedCorners={{ topLeft: 10, topRight: 10 }}
        />
                {/* {points?.Count && (
                  <Line points={points.Count} color="blue" strokeWidth={1} />
                )} */}
              </>
            )}
          </CartesianChart>
        ) : (
          <View>
            <Image
              source={require('../../assets/image/nulgraph.jpg')}
              style={styles.nullGraph}
            />
          </View>
        )}
       
      </View>
    </View>
  </View>
) : (
  <Image
    style={{ width: '100%', height: sizeHelper.calHp(200), resizeMode: 'contain', marginBottom: sizeHelper.calHp(20), alignSelf: 'center' }}
    source={require('../../assets/image/nulgraph.jpg')}
  />
))}

      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
