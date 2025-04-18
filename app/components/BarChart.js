import react from 'react';
import {View,Text,StyleSheet , Image} from 'react-native';
import { black } from '../constants/colors';
import FontFamilies from '../constants/Fonts';
import sizeHelper from '../helpers/sizeHelper';
import { CartesianChart, Bar ,useChartPressState} from "victory-native";
const BarChart =({
    graphHeading,
    data,
    xLabelName,
    yLabelName

})=>{
    return(
        <View style={styles.graphView}>
      <Text style={styles.graphHeading}>{graphHeading}</Text>
      <View style={styles.graphContainer}>
        {/* {isActive && (
            <Text style={{position: 'absolute', top: 10, left: 20}}>
              Selected X: {pressState.x.value.value} | High:{' '}
              {pressState.y.Amount.value.value}
            </Text>
          )} */}
        {data ? (
          <CartesianChart
            data={data}
            xKey={xLabelName}
            yKeys={yLabelName}
            domainPadding={{top: 50,left:20,
                right:20,}}
            axisOptions={{
              font,
              tickCount: 5,
              labelColor: '#B5B9C0',
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
                    labelRotation: '30deg' // Rotates x-axis labels by 30 degrees
                  },
                  lineWidth: { 
                    grid: { 
                      x: 0, // Hides X grid lines
                      y: sizeHelper.calHp(1), // Y grid lines are thin (1px)
                    }, 
                    frame: 0 // Removes the outer frame
                  }
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
                    `Sales: ${pressState.y.Amount.value.value.toFixed(2)? pressState.y.Amount.value.value.toFixed(2) : pressState.y.Count.value.value.toFixed(2)}`
                  }
                  color={'#8270fd'}
                  style={'fill'}
                />
                <Line
                  points={points.Amount}
                  color="#8270fd"
                  strokeWidth={3} 
                  animate={{type: 'timing', duration: 500}}
                  curveType={'monotoneX'}
                />
                {/* <Area
                  points={points.Amount}
                  y0={chartBounds.bottom}
                  curveType={'monotoneX'}
                  animate={{type: 'timing', duration: 500}}>
                  <LinearGradient
                    start={vec(chartBounds.left, chartBounds.top)}
                    end={vec(chartBounds.left, chartBounds.bottom)}
                    colors={['#8270fd', 'rgba(89, 95, 213, 0.3)']}
                  />
                  {isActive && (
                    <ToolTip
                      x={pressState.x.value.value}
                      y={pressState.y.Count.value.value}
                    />
                  )}
                </Area> */}
                {points?.Count && (
                  <Line points={points.Count} color="blue" strokeWidth={3} />
                )}
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
};

export default BarChart;

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