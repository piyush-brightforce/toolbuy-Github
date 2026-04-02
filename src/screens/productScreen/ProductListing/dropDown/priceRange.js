import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const { width } = Dimensions.get("window");

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const PriceDropdown = ({
  min = 1,
  max = 50000,
  initialMin = 1,
  initialMax = 10000,
  step = 100,
  onSelect, // 👈 return immediately
}) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState([initialMin, initialMax]);

  const toggleDropdown = () => {
    LayoutAnimation.easeInEaseOut();
    setOpen(!open);
  };

  return (
    <View style={styles.container}>
      
      {/* Header */}
       <TouchableOpacity style={styles.header} onPress={toggleDropdown}>
              <Text style={styles.title}>price</Text>
              <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
            </TouchableOpacity>
      {open && (
        <View style={styles.content}>
          
          {/* Top Combined Value */}
          <Text style={styles.rangeText}>
            ₹ {values[0]} - ₹ {values[1]}
          </Text>

          
           <View style={{justifyContent:'center',alignItems:'center'}}>
            <MultiSlider
            values={values}
            min={min}
            max={max}
            step={step}
            
            sliderLength={width - 80}
            onValuesChange={setValues}
            onValuesChangeFinish={(val) => {
              setValues(val);

              // 👇 return selected range immediately
              onSelect && onSelect({
                min: val[0],
                max: val[1],
              });

              // Optional: auto close dropdown
              // setOpen(false);
            }}
            selectedStyle={{ backgroundColor: "#1565C0" }}
            unselectedStyle={{ backgroundColor: "#D6D6D6" }}
            markerStyle={styles.marker}
            trackStyle={styles.track}
          />
          </View>

          <View style={styles.bottomRow}>
            <Text style={styles.bottomtitle}>₹ {values[0]}</Text>
            <Text style={styles.bottomtitle}>₹ {values[1]}</Text>
          </View>

        </View>
      )}
    </View>
  );
};

export default PriceDropdown;

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
    padding: 15, 
  },
  rangeText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
    color:'black'
  },
  track: {
    height: 4,
  },
  marker: {
    height: 22,
    width: 22,
    borderRadius: 11,
    backgroundColor: "#1565C0",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color:'black'
  },
  bottomtitle: {
    fontSize: 14,
    fontWeight: "500",
    color:'black'
  },
  arrow: {
    fontSize: 16,
  },
});