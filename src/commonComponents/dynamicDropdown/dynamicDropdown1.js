import React, { useState, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Dimensions,
    Modal,
    TouchableWithoutFeedback
} from "react-native";
import { external } from "../../style/external.css";
import { windowHeight } from "../../themes/appConstant";

const DynamicDropdown1 = ({
    data = [],
    labelKey = "label",
    valueKey = "value",
    placeholder = "Select...",
    onSelect,
    onToggle
}) => {

    const [expanded, setExpanded] = useState(false);
    const [selected, setSelected] = useState(null);
    const buttonRef = useRef();

    const [dropdownLayout, setDropdownLayout] = useState({
        top: 0,
        left: 0,
        width: 0,
    });

    const toggleDropdown = () => {
        buttonRef.current.measureInWindow((x, y, width, height) => {
            // ✅ FIXED (x, y correct order)
            setDropdownLayout({
                top: y + height,
                left: x,
                width: width,
            });

            const newState = !expanded;
            setExpanded(newState);
            onToggle && onToggle(newState);
        });
    };

    const handleSelect = (item) => {
        setSelected(item);
        setExpanded(false);
        onSelect && onSelect(item);
        onToggle && onToggle(false);
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <TouchableOpacity
                ref={buttonRef}
                style={styles.header}
                onPress={() => {
                    if (data && data?.length > 0) {
                        toggleDropdown()
                    }
                }}
            >
                <Text style={styles.text}>
                    {selected ? selected[labelKey] : placeholder}
                </Text>
                <Text style={styles.arrow}>{expanded ? "▲" : "▼"}</Text>
            </TouchableOpacity>

            {/* Dropdown */}
            <Modal transparent animationType="fade" visible={expanded}>

                {/* Dropdown Box */}
                <View
                    style={[
                        styles.dropdown,
                        {
                            top: dropdownLayout.top,
                            left: dropdownLayout.left,
                            width: dropdownLayout.width,
                        },
                    ]}
                >
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) =>
                            item[valueKey]?.toString() || index.toString()
                        }
                        showsVerticalScrollIndicator={true}
                        style={{ maxHeight: 250 }}
                        keyboardShouldPersistTaps="handled"
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[
                                    styles.optionRow,
                                    selected?.[valueKey] === item[valueKey] && styles.selectedItem
                                ]}
                                onPress={() => handleSelect(item)}
                            >
                                <Text style={styles.optionText}>
                                    {item[labelKey]}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
                {/* Click Outside Close */}
                <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default DynamicDropdown1;

const styles = StyleSheet.create({
    text: {
        color: "#333",
    },
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
        paddingHorizontal: 16,
        borderRadius: windowHeight(5),
        borderWidth: 1,
        borderColor: "#ccc"
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
        backgroundColor: "white",
        borderRadius: 6,
        elevation: 5,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
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