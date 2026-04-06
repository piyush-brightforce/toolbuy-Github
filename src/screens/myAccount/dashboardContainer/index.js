import { Image, Pressable, Text, View, Modal, TouchableOpacity } from 'react-native';
import React  from 'react';
import { external } from '../../../style/external.css';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../../App';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';
import OrderHistoryItemContainer from './orderhisrtoryitem';
import { FlatList } from 'react-native-gesture-handler';
import AccountItemContainer from './accountContainerItem';
import appColors from '../../../themes/appColors';

const DashboardContainer = ({ orderHistoryData, userData, addressData,
  onTapViewAllOrder = () => { }, oncallDefaultAddress = () => { } }) => {


  const navigation = useNavigation();
  const {
    t,
  } = useValues();

  const sendViewAllData = () => {
    onTapViewAllOrder("ViewAll");
  };

  return (
    <View style={[external.fx_1]}>
      <View style={[external.mh_20]}>
        <H3HeadingCategory
          value={"Recent Orders"}
          seeall={t('transData.seeAll')}
          onpressViewall={() => {
            sendViewAllData();
          }}
        />
      </View>

      <View style={[[external.mt_10]]}>
        <FlatList data={orderHistoryData.slice(0, 2)} renderItem={(item) => <OrderHistoryItemContainer data={item} />} />
      </View>

      <View style={external.ph_20}>
        <H3HeadingCategory
          value={"Account Settings"}
          seeall={"Edit"}
          onpressViewall={() => navigation.navigate('EditProfile')}
        />
      </View>

      <View style={[external.pt_10]}>
        <AccountItemContainer userData={userData} addressData={addressData} oncallDefaultAddress={(val) => oncallDefaultAddress(val)} />
      </View>

    </View>
  );

};


export default DashboardContainer;
