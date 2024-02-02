import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Avatar from "./components/Avatar";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Avatar backgroundColor={"teal"} initials="TT" size={35} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#fff",
  },
});
