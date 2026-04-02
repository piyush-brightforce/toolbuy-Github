import { TextInput, Text, View, Image } from 'react-native';
import React from 'react';
import { external } from '../../../style/external.css';
import IconBackground from '../../../commonComponents/iconBackGround';
import { SearchIconG,  ChevronLeft } from '../../../utils/icon';
import { useNavigation } from '@react-navigation/native';
import styles from './style.css';
import appColors from '../../../themes/appColors';
import images from '../../../utils/images';
import CartIconWithBadge from '../../../commonComponents/cartIconWithbadge';
import { useValues } from '../../../../App';

const BackIcon = ({ onPress }) => (
    <IconBackground
        value={<ChevronLeft height={28} width={28} color={appColors.textColorWhite} />}
        onPress={onPress}
    />
);

const HeaderRightIcons = ({ showSearch = true, navigation }) => (
    <View style={[external.fd_row, external.ai_center]}>
        {showSearch && (
            <IconBackground
                onPress={() => navigation.navigate('SearchScreen',{
						isFrom: "Home",
					})}
                value={<SearchIconG color={appColors.textColorWhite} />}
            />
        )}
        <CartIconWithBadge/>
    </View>
);

const AddressHeaderContainer = ({ onPress, title = "", type = "", righticon = true, searhcPlaceHolder  }) => {
    const navigation = useNavigation();
    const { linearColorStyle, linearColorStyleTwo, textRTLStyle, viewRTLStyle, imageRTLStyle, t, iconColorStyle } =
            useValues();
     
    return (
        <View style={[styles.Header, styles.container, external.ai_center]}>
            {type === `title` && (
                <>
                    <View style={[external.fd_row, external.ai_center, external.fx_1]}>
                        {onPress && <BackIcon onPress={onPress} />}
                        <View style={[external.ml_5]}>
                             <Image
                                    source={images.logo}
                                    style={{ height:40,width:150}}
                                    resizeMode="contain"
                                />

                        </View>
                        <View style={[external.ml_5]}>
                            <Text style={[styles.title]}>{title}</Text>
                        </View>
                    </View>

                   {righticon &&  <HeaderRightIcons navigation={navigation} showSearch={false} />}
                </>
            )}

            {type === `search` && (
                <>

                    <View style={[external.fd_row, external.ai_center]}>
                        <BackIcon onPress={onPress} />
                        <View style={[styles.searchContent]}>
                            <View style={[styles.searchContainer]}>
                                <TextInput
                                    placeholder={searhcPlaceHolder || t("transData.SEARCH_PLACEHOLDER")}
                                    placeholderTextColor={appColors.subtitle}
                                    style={styles.searchText}
                                    aria-label='center'
                                    editable={false}
                                />
                            </View>
                            <View style={styles.containerView}>
                                <View style={styles.searchIconStyle}>
                                    <SearchIconG />
                                </View>
                            </View>
                        </View>

                        {righticon && <HeaderRightIcons showSearch={false} navigation={navigation} />}
                    </View>

                </>
            )}
        </View>
    );
};

export default AddressHeaderContainer;