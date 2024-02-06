import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import * as MediaLibrary from 'expo-media-library';
//import { CameraRoll } from '@react-native-camera-roll/camera-roll';

import Grid from './Grid';
const keyExtractor = ({ uri }) => uri;

const ImageGrid = ({ onPressImage }) => {
  const [images, setImages] = useState([
    { uri: 'https://picsum.photos/600/600?image=10' },
    { uri: 'https://picsum.photos/600/600?image=20' },
    { uri: 'https://picsum.photos/600/600?image=30' },
    { uri: 'https://picsum.photos/600/600?image=40' },
  ]);
  const [loading, setLoading] = useState(false);
  const [cursor, setCursor] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async (after) => {
    setLoading(true);
    // const { status } = await MediaLibrary.requestPermissionsAsync();
    // if (status !== 'granted') {
    //   console.log('Permission denied');
    //   return;
    // }
    // There's problem with the CameraRoll from @react-native-camera-roll/camera-roll
    // try {
    //   const results = await CameraRoll.getPhotos({
    //     first: 20,
    //     after;
    //   });
    // const {
    //   edges,
    //   page_info: { has_next_page, end_cursor },
    // } = results;
    // const loadedImages = edges.map((item) => item.node.image);
    // setImages(loadedImages);
    setLoading(false);
    // setCursor(has_next_page ? end_cursor : null);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const renderItem = ({ item: { uri }, size, marginTop, marginLeft }) => {
    const style = { width: size, height: size, marginLeft, marginTop };
    return (
      <TouchableOpacity
        key={uri}
        activeOpacity={0.75}
        onPress={() => onPressImage(uri)}
        style={style}
      >
        <Image source={{ uri }} style={styles.image} />
      </TouchableOpacity>
    );
  };

  const getNextImages = () => {
    if (!cursor) return;

    getImages(cursor);
  };

  return (
    <Grid
      data={images}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={getNextImages}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});

ImageGrid.propTypes = {
  onPressImage: PropTypes.func,
};

Image.defaultProps = {
  onPressImage: () => {},
};

export default ImageGrid;
