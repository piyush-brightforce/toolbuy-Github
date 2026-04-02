import {  View } from 'react-native';
import React, { useEffect } from 'react';
import { external } from '../../../style/external.css';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../../App';
import H3HeadingCategory from '../../../commonComponents/headingCategory/H3HeadingCategory';  
import AccountItemContainer from '../dashboardContainer/accountContainerItem';
import DashoboardProfileItem from './dashbordprofileItem';

const DashboardProfileContainer = ({ userData}) => {

 
  const navigation = useNavigation();

 
  const {
    t,
  } = useValues();


  return (
    <View style={[external.fx_1]}>
      
      <View style={external.ph_20}>
        <H3HeadingCategory
          value={"Account Settings"}
          seeall={"Edit"}
          onpressViewall={() => navigation.navigate('EditProfile')}
        />
      </View>

      <View style={[external.pt_10]}>
        <DashoboardProfileItem userData={userData}/>
      </View>



    </View>
  );

};


export default DashboardProfileContainer;
