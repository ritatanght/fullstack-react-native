import PropTypes from 'prop-types';
import { MessageShape } from '../utils/MessageUtils';
import { FlatList, StyleSheet } from 'react-native';

const keyExtractor = (item) => item.id.toString();
const MessageList = ({ messages, onPressMessage }) => {
  const renderMessageItem = ({ item }) => {};
  return (
    <FlatList
      style={styles.container}
      inverted
      data={message}
      renderItem={renderMessageItem}
      keyExtractor={keyExtractor}
      keyboardShouldPersistTaps={'handled'}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible', // prevents clipping on resize
  },
});

MessageList.propTypes = {
  messages: PropTypes.arrayOf(MessageShape).isRequired,
  onPressMessage: PropTypes.func,
};
MessageList.defaultProps = {
  onPressMessage: () => {},
};

export default MessageList;
