import { FlatList } from "react-native";
import PropTypes from "prop-types";

import { getImageFromId } from "../utils/api";
import Card from "./Card";

const keyExtractor = ({ id }) => id.toString();

const CardList = ({ items }) => {
  const renderItem = ({ item: { id, author } }) => (
    <Card fullname={author} image={{ uri: getImageFromId(id) }} />
  );
  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
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
};

export default CardList;
