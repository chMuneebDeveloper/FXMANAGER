import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {CartesianChart, Line, useChartPressState, Area} from 'victory-native';
import {
  LinearGradient,
  useFont,
  vec,
  Text as SKText,
  DashPathEffect,
} from '@shopify/react-native-skia';
import Header from '../../components/Header';
import styles from './style';
import NavigationHeader from '../../components/NavigationHeader';
import Loading from '../../components/Loading';
import sizeHelper from '../../helpers/sizeHelper';
import BinaryDataComponent from '../../components/BinaryDataComponent';
import {gray2} from '../../constants/colors';
import ToolTip from '../../components/ToolTip';
import TwoLineGraph from '../../components/TwoLineGraph';
const interSbold = require('../../assets/fonts/InterSBold.ttf');
const interBold = require('../../assets/fonts/InterBold.ttf');

const INIT_STATE = {x: 0, y: {Value: 0, Field4: 0}};
const Design = ({
  moveToProfile,
  TabsNavigations,
  isLoading,
  financeGraphs,
  moveToPartnerStatementofAccounts,
  moveToMainAccountsSummary,
}) => {
  const {state: pressState, isActive} = useChartPressState(INIT_STATE);
  const font = useFont(interSbold, sizeHelper.calHp(24));
  const chartFont = useFont(interBold, 12);

  const renderItem = ({item, index}) => {
    return (
      <BinaryDataComponent
        aboveText={item.StringText}
        bottomText={item.displayValue}
        color={item.color}
        progressWidth={item.percentage}
      />
    );
  };

  const TableRenderHeader = () => {
    return (
      <View style={styles.TableHeaderContainer}>
        <Text style={styles.vendorNameText}>{'Vender Name'}</Text>

        <Text style={[styles.TableHeaderAmount]} numberOfLines={1}>
          {'Amount'}
        </Text>
      </View>
    );
  };

  const TableRenderItem = (item, index) => {
    return (
      <View
        style={[
          styles.itemsContainer,
          {
            paddingTop: index == 0 ? sizeHelper.calHp(20) : 0,
          },
        ]}>
        <View style={styles.rowContainer}>
          <View style={{flex: 1.5, justifyContent: 'center'}}>
            <Text style={styles.itemText}>{item.StringText}</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.amountText} numberOfLines={1}>
              {item?.Value?.toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            height: 1.5,
            backgroundColor: gray2,
            marginTop: sizeHelper.calHp(25),
          }}></View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Header text={'Manager'} moveToProfile={moveToProfile} />
        </View>
        <NavigationHeader TabsNavigations={TabsNavigations} />
      </View>
      <ScrollView>
        <View>
          <View style={styles.rowBtnContainer}>
            <TouchableOpacity
              style={styles.btnStyles}
              onPress={() => {
                moveToPartnerStatementofAccounts();
              }}>
              <Text style={styles.btntextStyles}>
                Partner Statement of Accounts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btnStyles, ]}
              onPress={moveToMainAccountsSummary}>
              <Text style={styles.btntextStyles}>Main Accounts Summary</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerStyle}>
            <View style={styles.rowComponents}>
              <View style={styles.textContainer}>
                <Text style={styles.headingTxt}>{'Expenses Vs Revenue'}</Text>
                <Text style={styles.subHeading}>{'View details'}</Text>
              </View>
            </View>
            <View style={styles.graphContainer}>
              {financeGraphs?.expenseVsRevence ? (
                 <TwoLineGraph
                 data={financeGraphs?.expenseVsRevence}
                 firstName={'Revenue'}
                 secondName={'Expences'}
                 firstLineColor={'#8E55E9'}
                 firstGRBA={'rgba(89, 95, 213, 0.07)'}
                 secondLineColor={'#FF9F29'}
                 secondRGBA={'rgba(225, 159, 41, 0.07)'}
               />
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

          <FlatList
            data={financeGraphs?.binaryData}
            renderItem={renderItem}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{paddingHorizontal: sizeHelper.calWp(30),paddingBottom:sizeHelper.calHp(35)}}
          />
        </View>

        <View>
          {financeGraphs?.topExpenses && (
            <View style={styles.tableContainer}>
              <Text style={styles.tableHeadingText}>
                {'Top Expense Account'}
              </Text>
              {financeGraphs?.topExpenses && TableRenderHeader()}
              {financeGraphs?.topExpenses.map((item, index) =>
                TableRenderItem(item, index),
              )}
            </View>
          )}
        </View>
      </ScrollView>
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
