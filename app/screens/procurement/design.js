import React from 'react';
import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Modal,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Header from '../../components/Header';
import styles from './style';
import NavigationHeader from '../../components/NavigationHeader';
import Loading from '../../components/Loading';
import sizeHelper from '../../helpers/sizeHelper';
import {
  blue,
  blue2,
  blue3,
  gray,
  gray1,
  gray2,
  red,
  yellow,
} from '../../constants/colors';
import ToolTip from '../../components/ToolTip';
import TwoLineGraph from '../../components/TwoLineGraph';
import TopSoldProductComponent from '../../components/TopSoldProductComponent';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const Design = ({
  items,
  moveToProfile,
  TabsNavigations,
  modalVisible,
  isLoading,
  dashBoardData,
  openModal,
  closeModal,
  closeModalbtn,
  onGoDownListItemPress,
  value,
  valueMonth,
  open,
  itemsMonths,
  setOpen,
  setItems,
  setValueMonth,
  moveToPurchesVsSale,
  moveToPayableVsReceivables
}) => {
  const modalData = [
    {id: 1, label: 'Product A '},
    {id: 2, label: 'Service B '},
    {id: 3, label: 'Event C '},
    {id: 4, label: 'Item D '},
    {id: 5, label: 'Deal E '},
    {
      id: 6,
      label: 'Product F',
    },
    {id: 7, label: 'Solution G '},
    {id: 8, label: 'Feature H '},
    {id: 9, label: 'Offer I '},
    {id: 10, label: 'Package J '},
  ];
  const TableRenderHeader = ({firstHeading, secondHeading, thirdHeading}) => {
    return (
      <View style={styles.TableHeaderContainer}>
        <Text style={styles.vendorNameText}>{firstHeading}</Text>
        <Text style={[styles.TableHeaderAmount]} numberOfLines={1}>
          {secondHeading}
        </Text>
        <Text style={[styles.TableHeaderAmount]} numberOfLines={1}>
          {thirdHeading}
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
        <View
          style={[
            styles.rowContainer,
            {
              borderBottomWidth:
                dashBoardData?.topBuyers.length !== index + 1 ? 1 : 0,
              borderColor: gray1,
              paddingVertical: 5,
            },
          ]}>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.itemText}>{item.StringText}</Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.nameText} numberOfLines={1}>
              {item?.Field4}
            </Text>
          </View>

          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.amountText} numberOfLines={1}>
              {item?.Value?.toFixed(2)}
            </Text>
          </View>
        </View>
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

      <ScrollView
      nestedScrollEnabled={true}>
        <View style={styles.row}>
          <Text style={styles.textGo}>GoDowns</Text>
          <TouchableOpacity
            style={styles.textContainerWrap}
            onPress={openModal}>
            <Text style={styles.text}>{value ? value : 'All'}</Text>
            <Icon
              name="chevron-down"
              size={sizeHelper.calHp(30)}
              color="black"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.containerStyle}>
          <View style={styles.rowComponents}>
            <View style={styles.textContainer}>
              <Text style={styles.headingTxt}>{'Sale Vs Purchase'}</Text>
              <Text style={styles.subHeading}>{'Sales details'}</Text>
            </View>
            {/* <View
              style={{
                width: '85%',
                flexDirection: 'row',
                alignItems: 'center',
                gap:sizeHelper.calWp(20),
                alignSelf:'center',
              }}> */}
              {/* <DropDownPicker
                containerProps={{
                  // width: '80%',
                  alignSelf: 'center',
                }}
                style={{
                  width: '100%',
                  // height: '5%',
                  borderRadius:sizeHelper.calHp(10),
                  backgroundColor: '#F8F8F9',
                  borderColor: '#E3E6E9',
                  minHeight: sizeHelper.calHp(75),
                }}
                open={open}
                value={valueMonth}
                items={itemsMonths}
                setOpen={setOpen}
                setValue={setValueMonth}
                setItems={setItems}
                dropDownContainerStyle={{
                  width: '100%',
                  borderWidth: 0,
                  elevation: 1,
                  backgroundColor: '#F8F8F9',
                }}
                textStyle={{
                  fontSize: sizeHelper.calHp(28),
                  fontFamily: 'InterMedium',
                  color: '#000000',
                }}
              /> */}
              <TouchableOpacity  style={styles.fileIcon} onPress={moveToPurchesVsSale}>
                <Icon1
                  name="file-eye"
                  size={sizeHelper.calHp(45)}
                  color={"grey"}
                />
              </TouchableOpacity>
            {/* </View> */}
          </View>
          <View style={styles.graphContainer}>
            {!modalVisible && (
              <TwoLineGraph
                data={dashBoardData?.purchaseVSSaleGraph}
                firstName={'Purchase'}
                secondName={' Sale'}
                firstLineColor={blue2}
                firstGRBA={'rgba(89, 95, 213, 0.1)'}
                secondLineColor={red}
                secondRGBA={'rgba(230, 0, 35, 0.1)'}
              />
            )}
          </View>
        </View>
        <View style={styles.containerStyle}>
          <View style={styles.rowComponents}>
            <View style={styles.textContainer}>
              <Text style={styles.headingTxt}>{'Receivable Vs Payables'}</Text>
              <Text style={styles.subHeading}>{'View details'}</Text>
            </View>
            <TouchableOpacity  style={styles.fileIcon} onPress={moveToPayableVsReceivables}>
                <Icon1
                  name="file-eye"
                  size={sizeHelper.calHp(45)}
                  color={"grey"}
                />
              </TouchableOpacity>
          </View>

          <View style={styles.graphContainer}>
            {!modalVisible && (
              <TwoLineGraph
                data={dashBoardData?.reportingOfCreditBills}
                firstName={'Payables'}
                secondName={'Receivable'}
                firstLineColor={blue}
                firstGRBA={'rgba(0, 68, 169, 0.1)'}
                secondLineColor={yellow}
                secondRGBA={'rgba(243, 167, 38, 0.1)'}
              />
            )}
          </View>
        </View>

        <View style={styles.containerStyle}>
          <View style={styles.rowComponents}>
            <View style={styles.textContainer}>
              <Text style={styles.headingTxt}>{'Top Sold Products'}</Text>
              <Text style={styles.subHeading}>{'View details'}</Text>
            </View>
          </View>

          <View
            style={[
              styles.TableContainer,
              {
                borderWidth: 1,
                borderColor: gray,
                borderRadius: sizeHelper.calHp(10),
              },
            ]}>
            {console.log('object', dashBoardData?.productData)}
            {dashBoardData?.productData ? (
              <FlatList
                data={dashBoardData?.productData}
                renderItem={({item, index}) => {
                  return (
                    <TopSoldProductComponent
                      text={item.name}
                      numberText={item.percentage + ' %'}
                      backgroundColor={item.color}
                      width={item.percentage + '%'}
                      borderBottomWidth={
                        dashBoardData?.topBuyers.length !== index + 1 ? 1 : 0
                      }
                    />
                  );
                }}
              />
            ) : (
              <Text style={{textAlign: 'center', selfAlign: 'center'}}>
                No Record Found
              </Text>
            )}
          </View>
        </View>

        <View style={[styles.containerStyle, {padding: 0}]}>
          <View style={styles.rowComponents}>
            <View style={styles.textContainer}>
              <Text style={styles.headingTxt}>{'Top Five Vendor'}</Text>
            </View>
          </View>

          <View style={[styles.TableContainer]}>
            {dashBoardData?.topVendors && (
              <TableRenderHeader
                firstHeading={'Vender Code'}
                secondHeading={'Vendor Name'}
                thirdHeading={'Amount'}
              />
            )}
            {dashBoardData?.topVendors.map((item, index) =>
              TableRenderItem(item, index),
            )}
          </View>
        </View>

        <View style={[styles.containerStyle, {padding: 0}]}>
          <View style={styles.rowComponents}>
            <View style={styles.textContainer}>
              <Text style={styles.headingTxt}>{'Top Five Buyer'}</Text>
            </View>
          </View>

          <View style={styles.TableContainer}>
            {dashBoardData?.topBuyers && (
              <TableRenderHeader
                firstHeading={'Buyer Code'}
                secondHeading={'Buyer Name'}
                thirdHeading={'Amount'}
              />
            )}
            {dashBoardData?.topBuyers.map((item, index) =>
              TableRenderItem(item, index),
            )}
          </View>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainerr}>
          <View style={styles.modalContentt}>
            <View style={styles.headerRowModal}>
              <TouchableOpacity
                onPress={closeModalbtn}
                style={styles.closeButton}>
                <Icon name="x" size={30} color="black" />
              </TouchableOpacity>
              <Text style={styles.modalText}>GoDowns List</Text>
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={items}
              keyExtractor={item => item.Field4.toString()}
              renderItem={({item, index}) => (
                <TouchableOpacity onPress={() => onGoDownListItemPress(item)}>
                  <Text style={styles.itemText}>{item.StringText}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
      {isLoading && <Loading />}
    </View>
  );
};

export default Design;
