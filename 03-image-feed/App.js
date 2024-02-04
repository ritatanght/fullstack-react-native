import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, Modal } from "react-native";
import Feed from "./screens/Feed";
import { useState } from "react";
import Comments from "./screens/Comments";

export default function App() {
  const [commentsForItem, setCommentsForItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const openCommentScreen = (id) => {
    setShowModal(true);
    setSelectedItemId(id);
  };

  const closeCommentScreen = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const onSubmitComment = (text) => {
    const comments = commentsForItem[selectedItemId] || [];

    setCommentsForItem((prevComments) => ({
      ...prevComments,
      [selectedItemId]: [...comments, text],
    }));
  };

  return (
    <View style={styles.container}>
      <Feed
        style={styles.feed}
        commentsForItem={commentsForItem}
        onPressComments={openCommentScreen}
      />
      <Modal
        visible={showModal}
        animationType="slide"
        onRequestClose={closeCommentScreen}
      >
        <Comments
          style={styles.container}
          comments={commentsForItem[selectedItemId] || []}
          onClose={closeCommentScreen}
          onSubmitComment={onSubmitComment}
        />
      </Modal>
    </View>
  );
}

const platformVersion =
  Platform.OS === "ios" ? parseInt(Platform.Version, 10) : Platform.Version;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  feed: {
    flex: 1,
    marginTop:
      Platform.OS === "android" || platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
  comments: {
    flex: 1,
    marginTop:
      Platform.OS === "ios" && platformVersion < 11
        ? Constants.statusBarHeight
        : 0,
  },
});
