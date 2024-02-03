import { StyleSheet, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import { useState } from "react";

const CommentInput = ({ onSubmit, placeholder }) => {
  const [text, setText] = useState("");

  const handleChangeText = (text) => setText(text);

  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit(text);
    setText("");
  };

  return (
    <TextInput
      value={text}
      onChangeText={handleChangeText}
      onSubmitEditing={handleSubmitEditing}
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
