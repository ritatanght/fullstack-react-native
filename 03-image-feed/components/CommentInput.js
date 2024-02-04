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
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
        placeholder={placeholder}
        underlineColorAndroid="transparent"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
    paddingHorizontal: 20,
    height: 60,
  },
  input: {
    flex: 1,
  },
});

CommentInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

CommentInput.defaultProps = {
  placeholder: "",
};

export default CommentInput;
