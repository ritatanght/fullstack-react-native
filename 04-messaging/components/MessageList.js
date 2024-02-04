import PropTypes from 'prop-types';
import { MessageShape } from '../utils/MessageUtils';
import { FlatList, StyleSheet } from 'react-native';

const MessageList = ({ messages, onPressMessage }) => {};

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  onPressMessage: PropTypes.func,
};
MessageList.defaultProps = {
  onPressMessage: () => {},
};

export default MessageList;
