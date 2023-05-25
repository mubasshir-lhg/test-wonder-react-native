import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const ImageGrid = ({ data, isLoading }: any) => {
  return (
    <View
      style={{
        ...styles.container,
        ...(isLoading ? { justifyContent: 'center' } : {}),
      }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#47A7DE" />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item: { imgUrl, title } }) => {
            return (
              <TouchableOpacity style={styles.artContainer}>
                <Image style={styles.artImage} source={{ uri: imgUrl }} />
                <Text style={styles.artTitle}>{title}</Text>
              </TouchableOpacity>
            );
          }}
          numColumns={3}
          keyExtractor={({ _id }) => _id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 85,
    flexDirection: 'column',
    alignItems: 'center',
    margin: 5,
  },
  artImage: {
    width: '100%',
    height: 140,
    borderRadius: 12,
  },
  artTitle: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: '600',
    color: '#525050',
  },
});

export default ImageGrid;
