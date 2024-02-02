import { View, Text, StyleSheet } from "react-native";
import { ColorPropType } from "deprecated-react-native-prop-types";
import { PropTypes } from "prop-types";

const Avatar = ({ size, backgroundColor, initials }) => {
  const style = {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor,
  };
  return <View style={[styles.container, style]}></View>;
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});

Avatar.propTypes = {
  initials: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  backgroundColor: ColorPropType.isRequired,
};
