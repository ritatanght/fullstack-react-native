import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";

const NavigationBar = ({ title, leftText, onPressLeftText }) => {};

export default NavigationBar;

NavigationBar.propTypes = {
  title: PropTypes.string,
  leftText: PropTypes.string,
  onPressLeftText: PropTypes.func,
};

NavigationBar.defaultProps = {
  title: "",
  leftText: "",
  onPressLeftText: () => {},
};
