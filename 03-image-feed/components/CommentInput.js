import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { useState } from "react";

const CommentInput = ({ onSubmit, placeholder }) => {
  const [text, setText] = useState("");

  const handleChangeText = (text) => setText(text);

  return (
    <TextInput
      value={text}
      onChangeText={handleChangeText}
      placeholder={placeholder}
    />
  );
};

CommentInput.PropTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

CommentInput.defaultProps = {
  placeholder: "",
};

export default CommentInput;
