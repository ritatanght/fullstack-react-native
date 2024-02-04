import { FlatList } from "react-native";
import PropTypes from "prop-types";

import { getImageFromId } from "../utils/api";
import Card from "./Card";

const keyExtractor = ({ id }) => id.toString();

const CardList = ({ items, commentsForItem, onPressComments }) => {
  const renderItem = ({ item: { id, author } }) => {
    const comments = commentsForItem[id];
    return (
      <Card
        fullname={author}
        image={{ uri: getImageFromId(id) }}
        linkText={`${comments ? comments.length : 0} Comments`}
        onPressLinkText={() => onPressComments(id)}
      />
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      extraData={commentsForItem}
    />
  );
};

CardList.PropTypes = {
  // PropTypes.array() to validate an array
  items: PropTypes.arrayOf(
    // PropTypes.shape() to validate an object
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      author: PropTypes.string.isRequired,
    })
  ).isRequired,
  commentsForItem: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  onPressComments: PropTypes.func.isRequired,
};

export default CardList;
