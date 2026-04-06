


import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Modal
} from "react-native";
import { external } from "../../../style/external.css";
import { windowHeight } from "../../../themes/appConstant";
import appColors from "../../../themes/appColors";
import LinearGradient from 'react-native-linear-gradient';
import { useValues } from "../../../../App";
import { commonStyles } from "../../../style/commonStyle.css";

const screenHeight = Dimensions.get("window").height;

const DropdownSectionState = ({ title, options, selected, onSelect, onToggle }) => {

  const [expanded, setExpanded] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const colors = isDark
    ? ['#808184', '#2E3036']
    : [appColors.screenBg, appColors.screenBg];
  const buttonRef = useRef();

  const { isDark, textColorStyle, linearColorStyle, textRTLStyle, viewRTLStyle } =
    useValues();
  const [dropdownLayout, setDropdownLayout] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const toggleDropdown = () => {

    buttonRef.current.measureInWindow((x, y, width, height) => {
      setDropdownLayout({
        top: y + height, // 👈 BELOW button
        left: x,
        width: width,
      });

      const newState = !expanded;
      setExpanded(newState);
      onToggle && onToggle(newState);
    });
  };

  return (
    <View style={styles1.container}>

      {/* Dropdown Button */}
      <LinearGradient
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        colors={colors}
        style={[
          styles1.withoutShow,
          { shadowColor: appColors.shadowColor },
          { borderColor: '#ccc' }, // 👈 ADD THIS
          { borderWidth: 1 },
        ]}>
        <LinearGradient
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
          colors={linearColorStyle}
          style={[
            styles1.menuItemContent,
            { shadowColor: appColors.shadowColor },
            { paddingHorizontal: windowHeight(8) },
          ]}>
          <TouchableOpacity
            ref={buttonRef}
            style={styles1.header}
            onPress={toggleDropdown}
          >
            <Text style={styles1.title}>{title}</Text>
            <Text style={styles1.arrow}>{expanded ? "  ▲" : "  ▼"}</Text>
          </TouchableOpacity>
        </LinearGradient>

      </LinearGradient>

      {/* Floating Dropdown */}
      {expanded && (

        <Modal transparent animationType="fade">
          <View
            style={[styles1.dropdown,
            {
              top: dropdownLayout.top,
              left: dropdownLayout.left,
              width: dropdownLayout.width,
            },
            ]}
          >

            <FlatList
              data={options}
              keyExtractor={(item, index) => index.toString()}
              nestedScrollEnabled={true}   // ✅ IMPORTANT

              keyboardShouldPersistTaps="handled" // ✅ IMPORTANT
              showsVerticalScrollIndicator={true}
              style={{ maxHeight: 250 }}   // ✅ REQUIRED
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={styles1.optionRow}
                  onPress={() => {
                    onSelect(index); 
                    setExpanded(false);
                    onToggle && onToggle(false);
                  }}
                >
                  <Text
                    style={[
                      styles1.optionText,
                      selected === item && {
                        color: "#101112",
                        fontWeight: "600"
                      }
                    ]}
                  >
                    {options[index]}
                  </Text>
                </TouchableOpacity>
              )}
            />

          </View>
        </Modal>
      )}

    </View>
  );
};

export default DropdownSectionState;

const styles1 = StyleSheet.create({
  withoutShow: {
    height: windowHeight(40),
    marginTop: windowHeight(4),
    borderRadius: windowHeight(5),
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 1,
  },
  textInputView: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    marginTop: windowHeight(6),
    borderRadius: windowHeight(5),
    ...external.fd_row,
    ...external.ai_center,
    ...external.js_space,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderWidth: 0.5,
  },
  menuItemContent: {
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: 0,
    position: 'relative',  // ✅ REQUIRED
    zIndex: 999,           // ✅ IMPORTANT
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: "#ddd"
  },

  title: {
    fontSize: 16,
    color: "black",
    flex: 1
  },

  arrow: {
    fontSize: 14,
    textAlign: 'center'
  },

  dropdown: {
    position: "absolute",
    left: 20,
    right: 20,
    maxHeight: 250,
    backgroundColor:  appColors.textColorWhite,
    borderRadius: 6,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 250,
    zIndex: 9999,     // ✅ REQUIRED
    elevation: 10,    // ✅ Android fix
  },

  optionRow: {
    padding: 14,
    borderBottomWidth: 0.5,
    borderColor: "#eee"
  },

  optionText: {
    fontSize: 15,
    color: "#444"
  }

});