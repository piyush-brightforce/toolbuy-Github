import React from "react";
import {   Modal } from "react-native";
import LoaderScreen from "../../screens/loaderScreen";

const CustomLoader = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <Modal visible={visible} transparent={true}>
      <LoaderScreen />
    </Modal>
  );
};

export default CustomLoader;
 