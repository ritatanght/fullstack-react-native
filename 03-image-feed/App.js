import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CardList from "./components/CardList";
const items = [
  { id: 0, author: "Bob Ross" },
  { id: 1, author: "Chuck Norris" },
];
export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CardList items={items} />
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
