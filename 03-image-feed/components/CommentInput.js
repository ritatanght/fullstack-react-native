import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";

const CommentInput = ({ onSubmit, placeholder }) => {};

CommentInput.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

CommentInput.defaultProps = {
  placeholder: "",
};

export default CommentInput;
