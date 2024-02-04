import { ActivityIndicator, Text, SafeAreaView } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

import { fetchImages } from "../utils/api";
import CardList from "../components/CardList";
import { useState, useEffect } from "react";

const Feed = ({ style, commentsForItem, onPressComments }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchImages()
      .then((images) => {
        setItems(images);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) return <ActivityIndicator size="large" />;

  if (error) return <Text>Error...</Text>;
  return (
    <SafeAreaView style={style}>
      <CardList
        items={items}
        commentsForItem={commentsForItem}
        onPressComments={onPressComments}
      />
    </SafeAreaView>
  );
};

Feed.PropTypes = {
  style: ViewPropTypes.style,
  commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  onPressComments: PropTypes.func.isRequired,
};

Feed.defaultProps = {
  style: null,
};

export default Feed;
