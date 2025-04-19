import {View, StyleSheet, Text, Image} from 'react-native';
import {CartesianChart, Line, useChartPressState, Area} from 'victory-native';
import {
  LinearGradient,
  useFont,
  vec,
  Text as SKText,
  DashPathEffect,
} from '@shopify/react-native-skia';
import {blue2, red} from '../constants/colors';
import sizeHelper from '../helpers/sizeHelper';
import { useEffect } from 'react';
const interSbold = require('../assets/fonts/InterSBold.ttf');
const interBold = require('../assets/fonts/InterBold.ttf');


const ExpensesVsRevenue = ({
  data,
  firstName,
  secondName,
  firstLineColor,
  firstGRBA,
  secondLineColor,
  secondRGBA,
}) => {
  let totalValue = 0;
let totalField4 = 0;

  data.forEach(item => {
    totalValue += Number(item.Value);
    totalField4 += Number(item.Field4);
  });

const INIT_STATE = {x: 0, y: {Value:   totalValue, Field4: totalField4}};
  const {state: pressState, isActive} = useChartPressState(INIT_STATE);
  const font = useFont(interSbold, sizeHelper.calHp(24));
  const chartFont = useFont(interBold, 12);
console.log('data............',data)
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          alignItems: 'center',
          // marginLeft: sizeHelper.calWp(40),
          left: sizeHelper.screenWidth > 450?'10%' :'9%',
          flexDirection: 'row',
        }}>
          <View
          style={{
            // marginLeft:'5%',
            alignItems: 'center',
            width:'30%',
            flexDirection: 'row',
          }}>
          <View
          style={[
            styles.firstBozStyle,
            {backgroundColor: firstLineColor},
          ]}></View>
          <Text style={styles.textStyle}>{secondName}</Text>
          </View>
          <View
          style={{
            alignItems: 'center',
            width:'29%',
            flexDirection: 'row',
          }}>
 <View
          style={[
            styles.secondBoxStyle,
            {backgroundColor: secondLineColor},
          ]}></View>
        <Text style={styles.textStyle}>{firstName}</Text>
          </View>
         
      </View>
      {data ? (
        <CartesianChart
          data={data}
          xKey={'StringText'}
          yKeys={['Value', 'Field4']}
          domainPadding={{top: 50, left: sizeHelper.calWp(25), right: sizeHelper.calWp(25)}}
          axisOptions={{
            font,
            tickCount: 5,
            labelRotate:90,
            labelColor: '#B5B9C0',
            lineColor: {
              grid: {
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
              labelRotation: '30deg', // Rotates x-axis labels by 30 degrees
            },
            lineWidth: {
              grid: {
                x: 0, // Hides X grid lines
                y: sizeHelper.calHp(1), // Y grid lines are thin (1px)
              },
              frame: 0, // Removes the outer frame
            },
          }}
          chartPressState={pressState}>
          {({points, chartBounds}) => (
            <>
              <SKText
                x={sizeHelper.calWp(140)}
                y={10}
                font={chartFont}
                text={
                  // `Counter No: ${pressState.x.value.value}
                  ` ${
                    pressState
                      ? pressState?.y?.Value?.value?.value?.toFixed(2)
                      : pressState
                  }`
                }
                color={firstLineColor}
                style={'fill'}
              />
              <SKText
                x={sizeHelper.screenWidth > 450? sizeHelper.calWp(470) : sizeHelper.calWp(460)}
                y={10}
                font={chartFont}
                text={` ${
                  pressState
                    ? pressState?.y?.Field4?.value?.value?.toFixed(2)
                    : pressState
                }`}
                color={secondLineColor}
                style={'fill'}
              />
              <Line
                points={points.Value}
                color={firstLineColor}
                strokeWidth={2}
                animate={{type: 'timing', duration: 500}}
                curveType={'monotoneX'}
              />
              <Area
                points={points.Value}
                y0={chartBounds.bottom}
                curveType={'monotoneX'}
                animate={{type: 'timing', duration: 500}}>
                <LinearGradient
                  start={vec(chartBounds.left, chartBounds.top)}
                  end={vec(chartBounds.left, chartBounds.bottom)}
                  colors={[firstLineColor, firstGRBA]}
                />
                {/* {isActive && (
                    <ToolTip
                      // x={pressState.x.Value.value}
                      y={pressState.y.Field4.value.value.toFixed(2)}
                    />
                  )} */}
              </Area>
              {points?.Field4 && (
                <Line
                  points={points.Field4}
                  color={secondLineColor}
                  strokeWidth={2}
                  curveType={'monotoneX'}
                />
              )}
              {/* {isActive && (
                    <ToolTip
                      x={pressState.x.value.value}
                      y={pressState.y.Value.value.value}
                    />
                  )} */}
              <Area
                points={points.Field4}
                y0={chartBounds.bottom}
                curveType={'monotoneX'}
                animate={{type: 'timing', duration: 500}}>
                <LinearGradient
                  start={vec(chartBounds.left, chartBounds.top)}
                  end={vec(chartBounds.left, chartBounds.bottom)}
                  colors={[secondLineColor, secondRGBA]}
                />
                {/* {isActive && (
                    <ToolTip
                      x={pressState.x.Value.value}
                      y={pressState.y.Field4.value.value}
                    />
                  )} */}
              </Area>
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
  );
};

const styles = StyleSheet.create({
  nullGraph: {
    resizeMode: 'center',
    height: sizeHelper.calHp(500),
    width: '100%',
    alignSelf: 'center',
  },
  textStyle: {
    paddingLeft: sizeHelper.calWp(20),
    fontSize: sizeHelper.calHp(35),
    color: '#000000',
  },
  firstBozStyle: {
    width: sizeHelper.calHp(35),
    height: sizeHelper.calHp(35),
    borderRadius: sizeHelper.calHp(10),
  },
  secondBoxStyle: {
    marginLeft: sizeHelper.calWp(50),
    width: sizeHelper.calHp(35),
    height: sizeHelper.calHp(35),
    borderRadius: sizeHelper.calHp(10),
  },
});

export default ExpensesVsRevenue;
