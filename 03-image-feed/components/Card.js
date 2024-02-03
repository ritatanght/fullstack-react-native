import { Image, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import AuthorRow from "./AuthorRow";

const Card = ({ fullname, image, linkText, onPressLinkText }) => {
  return (
    <View>
      <AuthorRow
        fullname={fullname}
        linkText={linkText}
        onPressLinkText={onPressLinkText}
      />
      <Image style={styles.image} source={image} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    backgroundColor: "rgba(0,0,0,0.02)",
  },
});

Card.PropTypes = {
  fullname: PropTypes.string.isRequired,
  // image: Image.propTypes.source.isRequired,
  linkText: PropTypes.string,
  onPressLinkText: PropTypes.func,
};

Card.defaultProps = {
  linkText: "",
  onPressLinkText: () => {},
};

export default Card;
