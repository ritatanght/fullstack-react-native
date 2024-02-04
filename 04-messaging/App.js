import { StyleSheet, View, Text } from 'react-native';
import Status from './components/Status';
import MessageList from './components/MessageList';
import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './util\
s/MessageUtils';
import { useState } from 'react';

export default function App() {
  const [messages, setMessages] = useState([
    createImageMessage('https://unsplash.it/300/300'),
    createTextMessage('World'),
    createTextMessage('Hello'),
    createLocationMessage({
      latitude: 37.78825,
      longitude: -122.4324,
    }),
  ]);

  const handlePressMessage = () => {};

  const renderMessageList = () => (
    <View style={styles.content}>
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
    </View>
  );

  const renderInputMethodEditor = () => (
    <View style={styles.inputMethodEditor}></View>
  );

  const renderToolbar = () => <View style={styles.toolbar}></View>;

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: '#fff',
  },
});
