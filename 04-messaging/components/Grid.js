import { Dimensions, FlatList, PixelRatio, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const Grid = (props) => {
  const renderGridItem = (info) => {};

  return <FlatList {...props} renderItem={renderGridItem} />;
};

Grid.propTypes = {
  renderItem: PropTypes.func.isRequired,
  numColumns: PropTypes.number,
  itemMargin: PropTypes.number,
};

Grid.defaultProps = {
  numColumns: 4,
  itemMargin: StyleSheet.hairlineWidth,
};

export default Grid;
