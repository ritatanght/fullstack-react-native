import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import { addEventListener, fetch } from '@react-native-community/netinfo';

const Status = () => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    // set up the event listener
    const unsubscription = addEventListener((state) => setInfo(state.type));
    // fetch the initial connection information
    fetch().then((state) => setInfo(state.type));

    return () => unsubscription();
  }, []);

  // assume that if the info is "none" then we’re disconnected
  // and anything else means we’re connected
  const isConnected = info !== 'none';
  const backgroundColor = isConnected ? 'white' : 'red';

  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents="none">
      {statusBar}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>No network connection</Text>
        </View>
      )}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }

  return messageContainer;
};

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: statusHeight + 20,
    right: 0,
    left: 0,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  text: {
    color: 'white',
  },
});

export default Status;
