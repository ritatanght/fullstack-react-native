import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const Toolbar = ({
  isFocused,
  onChangeFocus,
  onSubmit,
  onPressCamera,
  onPressLocation,
}) => {
  const [text, setText] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [isFocused]);

  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit(text);
    setText('');
  };

  return (
    <View style={styles.toolbar}>
      <ToolbarButton title={'📷'} onPress={onPressCamera} />
      <ToolbarButton title={'📍'} onPress={onPressLocation} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type something"
          underlineColorAndroid={'transparent'}
          blurOnSubmit={false} // common in messaging app
          value={text}
          onChangeText={(text) => setText(text)}
          onSubmitEditing={handleSubmitEditing}
          ref={inputRef}
          // use onChangeFocus to notify parent of the changes to the focus state
          onFocus={() => onChangeFocus(true)}
          onBlur={() => onChangeFocus(false)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingLeft: 16,
    backgroundColor: 'white',
  },
  button: {
    top: -2,
    marginRight: 12,
    fontSize: 20,
    color: 'grey',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.04)',
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});

Toolbar.propTypes = {
  isFocused: PropTypes.bool.isRequired,
  onChangeFocus: PropTypes.func,
  onSubmit: PropTypes.func,
  onPressCamera: PropTypes.func,
  onPressLocation: PropTypes.func,
};

Toolbar.defaultProps = {
  onChangeFocus: () => {},
  onSubmit: () => {},
  onPressCamera: () => {},
  onPressLocation: () => {},
};

export default Toolbar;
