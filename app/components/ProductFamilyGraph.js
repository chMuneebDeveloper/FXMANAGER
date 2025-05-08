import React, { useEffect } from 'react';
import {View, ScrollView,Image,Text,StyleSheet, useColorScheme} from 'react-native';
import {
    LinearGradient,
    useFont,
    vec,
    Text as SKText,
    DashPathEffect,
  } from '@shopify/react-native-skia';
  import {CartesianChart, Line, useChartPressState,Bar, Area} from 'victory-native';
import sizeHelper from '../helpers/sizeHelper';
import FontFamilies from '../constants/Fonts';
import { black } from '../constants/colors';

  const interSbold = require('../assets/fonts/InterSBold.ttf');
const interBold = require('../assets/fonts/InterBold.ttf');


const ProductFamilyGraph =({graphHeeading,data})=>{

    let totalCount = 0;
  
        data.forEach(item => {
            totalCount += Number(item.Count);
        });

    const INIT_STATE = {x: 0, y: {Count: totalCount, Amount: 0}};
const {state: pressState, isActive} = useChartPressState(INIT_STATE);
  const font = useFont(interSbold, sizeHelper.calHp(24));
  const chartFont = useFont(interBold, 12);

    return(
        <View style={styles.graphView}>
        <Text style={styles.graphHeading}>{graphHeeading}</Text>
        <View style={styles.graphContainer}>
        {data ? (
          <CartesianChart
          
          data={data}
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
                  `Products : ${isActive? pressState.y.Count.value.value.toFixed(2): totalCount.toFixed(2)}`
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
              source={require('../assets/image/nulgraph.jpg')}
              style={styles.nullGraph}
            />
          </View>
        )}
        </View>
        </View>
    )
}

export default ProductFamilyGraph;

const styles = StyleSheet.create({
    graphView: {
      backgroundColor: 'white',
      margin: sizeHelper.calHp(50),
      padding: sizeHelper.calHp(30),
      borderRadius: sizeHelper.calHp(20),
    },
    graphHeading: {
      fontFamily: FontFamilies.InterSemiBold,
      fontSize: sizeHelper.calHp(38),
      paddingBottom: sizeHelper.calHp(40),
      color: black,
    },
    nullGraph: {
      resizeMode: 'center',
      height: sizeHelper.calHp(500),
      width: '100%',
      alignSelf: 'center',
    },
    graphContainer: {
      height: sizeHelper.calHp(500),
      width: '100%',
      alignSelf: 'center',
    },
  });
  