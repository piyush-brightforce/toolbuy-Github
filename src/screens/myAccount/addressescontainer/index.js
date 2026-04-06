import { Image, Pressable, Text, View, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { external } from '../../../style/external.css'; 
import { useValues } from '../../../../App';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory'; 
import { FlatList } from 'react-native-gesture-handler';  
import AddressItemContainer from './addressListItem';

const DashboardAddressListContainer = ({ addressesData, oncallReturnAddressTag = () => {} ,oncallReturnDefaultAddressTag = () => {} }) => {


  const handleSendTagData = (tag, item) => { 
     const payload = {
      tag: tag, 
      item: item,
    };

    oncallReturnAddressTag(payload);
  };


  const handleSendDefaultTagData = (tag, item) => { 
     const payload = {
      tag: tag, 
      item: item,
    };

    oncallReturnDefaultAddressTag(payload);
  };
  const {
    bgFullStyle,
    t,
  } = useValues();


  return (
    <View style={[external.fx_1]}>
      <View style={[external.mh_20]}> 
        <H3HeadingCategory
        value={"Addresses"} 
      />
      </View>


      <View style={[[external.mt_10]]}>
         <FlatList 
         
         data={addressesData} 
         keyExtractor={(item) => item.addressID.toString()}
         renderItem={(item)=> <AddressItemContainer addressData={item}  onSendAddressTag={(val) => {
         
          if(val.tag === "Edit"){
            handleSendTagData( val.tag,  val.item);
          }else{
            handleSendTagData(  val.tag,  val.item);
          }
          
         }}  onSendDefaultTag={(val) => {
         
            handleSendDefaultTagData(val.tag, val.item);
          
         }}/>} scrollEnabled={false}/>
      </View>
 

    </View>
  );

};


export default DashboardAddressListContainer;
