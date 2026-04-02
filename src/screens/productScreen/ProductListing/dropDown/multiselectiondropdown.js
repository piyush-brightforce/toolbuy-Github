import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const MultiSelectDropdown = ({
  title = "Select Options",
  data = [],
  onSelect,
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggleDropdown = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  const toggleItem = (item) => {
    let updated;

    if (selected.includes(item)) {
      updated = selected.filter((i) => i !== item);
    } else {
      updated = [...selected, item];
    }

    setSelected(updated);

    // 👇 return selected values immediately
    onSelect && onSelect(updated);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {/* Dropdown Content */}
      {open && (
        <View style={styles.content}>
          <FlatList
            data={data} 
            keyExtractor={(item, index) => index.toString()}
            nestedScrollEnabled={true}
            style={{ maxHeight: 250 }}
            renderItem={({ item }) => {
              const isSelected = selected.includes(item);

              return (
                <View
                  style={styles.itemRow} >
                <TouchableOpacity 
                  onPress={() => toggleItem(item)}>
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkedBox,
                    ]}
                  />
                  </TouchableOpacity>
                  <Text style={styles.itemText}>{item.filterValue}</Text>
                
                </View>
              );
            }}
          />
        </View>
      )}


    </View>
  );
};

export default MultiSelectDropdown;

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
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: { 
    paddingVertical: 10,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  checkbox: {
    height: 18,
    width: 18,
    borderWidth: 1.5,
    borderColor: "#1565C0",
    borderRadius: 4,
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#1565C0",
  },
  itemText: {
    fontSize: 15,
    color: "#444",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: 'black'
  },
});