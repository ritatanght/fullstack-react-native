import Constants from "expo-constants";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, View, Modal, AsyncStorage } from "react-native";
import Feed from "./screens/Feed";
import { useEffect, useState } from "react";
import Comments from "./screens/Comments";

const ASYNC_STORAGE_COMMENTS_KEY = "ASYNC_STORAGE_COMMENTS_KEY";

export default function App() {
  const [commentsForItem, setCommentsForItem] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const loadLocalComments = async () => {
      try {
        const commentsForItem = await AsyncStorage.getItem(
          ASYNC_STORAGE_COMMENTS_KEY
        );
        setCommentsForItem(commentsForItem ? JSON.parse(commentsForItem) : {});
      } catch (e) {
        console.log("Failed to load comments");
      }
    };

    loadLocalComments();
  }, []);

  const openCommentScreen = (id) => {
    setShowModal(true);
    setSelectedItemId(id);
  };

  const closeCommentScreen = () => {
    setShowModal(false);
    setSelectedItemId(null);
  };

  const onSubmitComment = async (text) => {
    const comments = commentsForItem[selectedItemId] || [];
    const updated = {
      ...comments,
      [selectedItemId]: [...comments, text],
    };
    setCommentsForItem(updated);
    try {
      AsyncStorage.setItem(ASYNC_STORAGE_COMMENTS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.log("Failed to save comment", text, "for", selectedItemId);
    }
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
