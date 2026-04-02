import React from "react";
import { View } from "react-native";

const TextStackView = ({
  children,
  direction = "column",
  spacing = 10,
  align = "flex-start",
  justify = "flex-start",
  style
}) => {
  const items = React.Children.map(children, (child, index) => {
    if (!child) return null;

    const marginStyle =
      direction === "row"
        ? { marginRight: index !== children.length - 1 ? spacing : 0 }
        : { marginBottom: index !== children.length - 1 ? spacing : 0 };

    return <View style={marginStyle}>{child}</View>;
  });

  return (
    <View
      style={[
        {
          flexDirection: direction,
          alignItems: align,
          justifyContent: justify
        },
        style
      ]}
    >
      {items}
    </View>
  );
};

export default TextStackView;