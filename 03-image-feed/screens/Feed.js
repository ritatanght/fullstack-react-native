import { ActivityIndicator, Text, SafeAreaView } from "react-native";
import { ViewPropTypes } from "deprecated-react-native-prop-types";
import PropTypes from "prop-types";

import { fetchImages } from "../utils/api";
import CardList from "../components/CardList";
import { useState, useEffect } from "react";

const Feed = ({ style }) => {
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
    <SafeAreaView>
      <CardList items={items} />
    </SafeAreaView>
  );
};

Feed.PropTypes = {
  style: ViewPropTypes.style,
};

Feed.defaultProps = {
  style: null,
};

export default Feed;
