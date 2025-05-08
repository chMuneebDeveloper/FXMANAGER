import {View, Text, Image, StyleSheet} from 'react-native';
import {
  LinearGradient,
  useFont,
  vec,
  Text as SKText,
  DashPathEffect,
} from '@shopify/react-native-skia';
import ToolTip from './ToolTip';
import {CartesianChart, Line, useChartPressState, Area} from 'victory-native';
import {useDerivedValue} from 'react-native-reanimated';
import sizeHelper from '../helpers/sizeHelper';
import FontFamilies from '../constants/Fonts';
import {black} from '../constants/colors';
import Loading from './Loading';
const interSbold = require('../assets/fonts/InterSBold.ttf');
const interBold = require('../assets/fonts/InterBold.ttf');



const LineGraph = ({graphHeeading, data, xLabelName, yLabelName}) => {
  console.log(' POS Graphs data is ', data);

  let totalAmount = 0;
  
  data.forEach(item => {
    totalAmount += Number(item.Amount);
  });

  const INIT_STATE = {x: 0, y: {Count: 0, Amount: totalAmount}};
  const {state: pressState, isActive} = useChartPressState(INIT_STATE);
  const font = useFont(interSbold, sizeHelper.calHp(24));
  const chartFont = useFont(interBold, 12);
console.log('------------',data);
  return (
    <View style={styles.graphView}>
      <Text style={styles.graphHeading}>{graphHeeading}</Text>
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
                    isActive 
                      ? pressState.y.Amount.value.value.toFixed(2)
                      : totalAmount.toFixed(2)
                  }
                  color={'#8270fd'}
                  style={'fill'}
                />
                <Line
                  points={points.Amount}
                  color="#8270fd"
                  strokeWidth={1} 
                  animate={{type: 'timing', duration: 500}}
                  curveType={'monotoneX'}
                />
                <Area
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
                </Area>
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
  );
};

export default LineGraph;

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
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
  graphContainer: {
    height: sizeHelper.calHp(500),
    width: '100%',
    alignSelf: 'center',
  },
});
