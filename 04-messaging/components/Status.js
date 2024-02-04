import Constants from 'expo-constants';
import { useState } from 'react';
import {
  NetInfo,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Status = () => {
  const [info, setInfo] = useState('null');

  // assume that if the info is "none" then we’re disconnected
  // and anything else means we’re connected
  const isConnected = info !== 'none';
  const backgroundColor = isConnected ? 'white' : 'red';

  if (Platform === 'ios') {
    return <View style={[styles.status, { backgroundColor }]}></View>;
  }

  return null;
};

const statusHeight = Platform.OS === 'ios' ? Constants.statusBarHeight : 0;

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: statusHeight,
  },
});

export default Status;
