import {StyleSheet, Text, View} from 'react-native';
import React from 'react'; 
import {external} from '../../style/external.css';
import {fontSizes, windowHeight} from '../../themes/appConstant';
import appFonts from '../../themes/appFonts';
import appColors from '../../themes/appColors'; 

const InmyBegContainer = ({productlength}) => {
  return (
    <View>
      <View style={[external.mh_25,{flexDirection:'row',justifyContent:'space-between'}]}>
        <View style={{flexDirection:'row',alignItems: "center",flex:1}}>
          <Text style={styles.valueText}>
            {`Your Cart`}
          </Text>
          <Text>
            {`(${productlength || 0} products)`}
          </Text>
          </View>
           <View style={{flexDirection:'row',alignItems: "center" }}>
          <Text style={styles.semiboldText}>
            {`Shop and shipped by`}
          </Text>
          <Text style={styles.boldText}>
             {` Toolbuy`}
          </Text>
          </View>
      </View>
    </View>
  );
};

export default InmyBegContainer;

const styles = StyleSheet.create({
  container: {
    ...external.ai_center,
  },
  valueText: {
    fontSize: fontSizes.FONT19,
    fontFamily: appFonts.semiBold,
    fontWeight: '600',
    color: appColors.titleText,
    marginRight: windowHeight(8),
  },


  semiboldText: {
    color: appColors.titleText,
    fontSize: fontSizes.FONT12,
    fontFamily: appFonts.medium,
  },


  boldText: {
    color: appColors.titleText,
    fontSize: fontSizes.FONT14,
    fontFamily: appFonts.bold,
  },
});
