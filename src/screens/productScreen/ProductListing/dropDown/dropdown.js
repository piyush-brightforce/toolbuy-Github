import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const DropdownSection = ({ title, options, selected, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleExpand}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.arrow}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {/* Dropdown Items */}
      {expanded &&
        options.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionRow}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.optionText,
                selected === item && { color: "#1E5BB8", fontWeight: "600" },
              ]}
            >
              {item.filterValue}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

export default DropdownSection;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
    paddingVertical: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color:'black'
  },
  arrow: {
    fontSize: 16,
  },
  optionRow: {
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 15,
    color: "#444",
  },
});


