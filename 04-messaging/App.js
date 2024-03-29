import {
  StyleSheet,
  View,
  Alert,
  Image,
  TouchableHighlight,
  BackHandler,
} from 'react-native';

import {
  createImageMessage,
  createLocationMessage,
  createTextMessage,
} from './utils/MessageUtils';
import { useState, useEffect } from 'react';
import Status from './components/Status';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';
import ImageGrid from './components/ImageGrid';
import * as Location from 'expo-location';

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
  const [fullscreenImageId, setFullscreenImageId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  useEffect(() => {
    // only for Android device
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (fullscreenImageId) {
          dismissFullscreenImage();
          return true;
        }
        return false;
      },
    );
    return () => subscription.remove();
  }, []);

  const handlePressMessage = ({ id, type }) => {
    switch (type) {
      case 'text':
        Alert.alert(
          'Delete message',
          'Are you sure you want to permanently delete this message?',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () =>
                setMessages(messages.filter((message) => message.id !== id)),
            },
          ],
        );
        break;
      case 'image':
        setFullscreenImageId(id);
        setIsInputFocused(false); // avoid the keyboard stays up in fullscreen image
        break;
      default:
        break;
    }
  };
  const dismissFullscreenImage = () => setFullscreenImageId(null);

  const renderMessageList = () => (
    <View style={styles.content}>
      <MessageList messages={messages} onPressMessage={handlePressMessage} />
    </View>
  );
  const handlePressImage = (uri) =>
    setMessages((prev) => [createImageMessage(uri), ...prev]);

  const renderInputMethodEditor = () => (
    <View style={styles.inputMethodEditor}>
      <ImageGrid onPressImage={handlePressImage} />
    </View>
  );

  const handlePressToolbarCamera = () => {};
  const handlePressToolbarLocation = async () => {
    try {
      // get permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let position = await Location.getCurrentPositionAsync();
      const {
        coords: { latitude, longitude },
      } = position;

      setMessages((prev) => [
        createLocationMessage({ latitude, longitude }),
        ...prev,
      ]);
    } catch (error) {
      console.error('Error requesting location info:', error);
    }
  };
  const handleChangeFocus = (isFocused) => setIsInputFocused(isFocused);
  const handleSubmit = (text) => {
    setMessages((prev) => [createTextMessage(text), ...prev]);
  };

  const renderToolbar = () => (
    <View style={styles.toolbar}>
      <Toolbar
        isFocused={isInputFocused}
        onSubmit={handleSubmit}
        onChangeFocus={handleChangeFocus}
        onPressCamera={handlePressToolbarCamera}
        onPressLocation={handlePressToolbarLocation}
      />
    </View>
  );

  const renderFullscreenImage = () => {
    if (!fullscreenImageId) return null;
    const image = messages.find((message) => message.id === fullscreenImageId);
    if (!image) return null;
    const { uri } = image;
    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={dismissFullscreenImage}
      >
        <Image style={styles.fullscreenImage} source={{ uri }} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Status />
      {renderMessageList()}
      {renderToolbar()}
      {renderInputMethodEditor()}
      {renderFullscreenImage()}
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
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    zIndex: 2,
  },
  fullscreenImage: {
    flex: 1,
    resizeMode: 'contain',
  },
});
