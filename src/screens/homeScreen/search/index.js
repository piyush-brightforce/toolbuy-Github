import { TextInput, View, Keyboard, Pressable } from 'react-native';
import React, { useState, useRef, useCallback } from 'react';
import { SearchIconG, ChevronLeft, Drawer } from '../../../utils/icon';
import styles from './style.css';
import appColors from '../../../themes/appColors';
import SearhcResultResponse from '../../../models/searchAutoComplete/searchResult';
import axios from 'axios';
import API_URL from '../../../config/apiConfig';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useValues } from '../../../../App';
import SearchingListingContainer from '../../../components/homeScreen/searchListing';
import { commonStyles } from '../../../style/commonStyle.css';
import { external } from '../../../style/external.css';
import IconBackground from '../../../commonComponents/iconBackGround';
import { iconColorStyle } from '../../../style/darkStyle';
import { windowHeight } from '../../../themes/appConstant';
import { useFocusEffect } from '@react-navigation/native';

const SearchingScreen = ({ route }) => {

    const { isFrom } = route?.params || {};
    const inputRef = useRef(null);
    useFocusEffect(
        useCallback(() => {
            // ✅ When screen comes into focus
            setTimeout(() => {
                inputRef.current?.focus();
            }, 200);

            return () => {
                // ✅ When screen goes out of focus (pop / navigate back)
                inputRef.current?.blur();
                Keyboard.dismiss();
            };
        }, [])
    );


    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const [loading, setLoading] = useState(false);
    const { linearColorStyle, linearColorStyleTwo, textRTLStyle, viewRTLStyle, imageRTLStyle, t, iconColorStyle } =
        useValues();


    const [searchingResult, setSearchingResult] = useState();


    const searchingapiData = async () => { 
        try {

            setLoading(true);
            const response = await axios.post(`${API_URL.SEARCHAUTOCOMPLETE}`, {
                Keyword: searchText
            });
            const data = response.data;
            const searchResult = new SearhcResultResponse(data); // convert JSON → model
            setSearchingResult(searchResult);
            setLoading(false);

        } catch (error) {
            setLoading(false);
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (text) => { 
        searchingapiData();
    };

    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>

            <View style={commonStyles.Header}>
                <View style={[styles.container]}>
                    <View style={[external.fd_row, external.ai_center]}>
                        {isFrom && <IconBackground value={<ChevronLeft height={28} width={28} color={"white"} />} onPress={() => navigation.goBack('')} />}
                        <View style={[styles.menuItemContent, { marginLeft: isFrom ? 0 : windowHeight(16) }]}>


                            <View style={[styles.searchContainer]}>
                               <TextInput
                                        ref={inputRef}
                                        placeholder={t("transData.SEARCH_PLACEHOLDER")}
                                        placeholderTextColor={appColors.subtitle}
                                        style={[
                                            styles.searchText,
                                            { textAlign: textRTLStyle },
                                        ]}
                                        autoFocus={true}
                                        value={searchText}
                                        onChangeText={(text) => {
                                            setSearchText(text);
                                            // sendDataBack(text ?? "");
                                            handleSearch(text ?? "");
                                        }}

                                        onSubmitEditing={handleSearch}  // 👈 press keyboard search
                                        returnKeyType="search"
                                    />
                            </View>

                            <View style={styles.containerView}>
                                <View style={styles.searchIconStyle}>
                                    <SearchIconG />
                                </View>
                            </View>
                        </View>
                    </View>

                </View>
            </View>

            <ScrollView contentContainerStyle={[external.Pb_80]}
                style={[{ backgroundColor: 'white' }]}
                showsVerticalScrollIndicator={false}>
                {searchingResult && searchText !== "" && <SearchingListingContainer data={searchingResult} />}
            </ScrollView>


        </View>

    );
};

export default SearchingScreen;
