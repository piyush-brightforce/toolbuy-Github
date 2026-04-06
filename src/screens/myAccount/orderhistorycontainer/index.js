import { Image, Pressable, Text, View, Modal, TouchableOpacity } from 'react-native';
import React from 'react';
import { external } from '../../../style/external.css'; 
import { useValues } from '../../../../App';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory'; 
import { FlatList } from 'react-native-gesture-handler'; 
import OrderHistoryItemContainer from '../dashboardContainer/orderhisrtoryitem';

const OrderHistoryContainer = ({ orderHistoryData}) => {

 
  const {
    bgFullStyle,
    t,
  } = useValues();


  return (
    <View style={[external.fx_1]}>
      <View style={[external.mh_20]}> 
        <H3HeadingCategory
        value={t('transData.RECENT_HISTORY')}
      />
      </View>


      <View style={[[external.mt_10]]}>
         <FlatList data={orderHistoryData} renderItem={(item)=> <OrderHistoryItemContainer data={item}/>} scrollEnabled={false} />
      </View>
 

    </View>
  );

};


export default OrderHistoryContainer;
