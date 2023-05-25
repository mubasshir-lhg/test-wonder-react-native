import React, { useCallback } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
  Image,
} from 'react-native';

const TabBar = ({ onPressTab, ...rest }: any) => {
  const inputRange = rest.navigationState.routes.map((x: any, i: any) => i);

  const indicatorColor = useCallback(
    (index: number) => {
      return {
        backgroundColor:
          rest.navigationState.index === index ? 'black' : 'transparent',
      };
    },
    [rest.navigationState.index],
  );

  return (
    <View style={styles.tabBar}>
      {rest.navigationState.routes.map((route: any, i: any) => {
        const opacity = rest.position.interpolate({
          inputRange,
          outputRange: inputRange.map((inputIndex: any) =>
            inputIndex === i ? 1 : 0.5,
          ),
        });

        return (
          <TouchableOpacity
            key={i}
            style={styles.tabItem}
            onPress={() => onPressTab(i)}>
            <Image
              source={
                i === 0
                  ? require('../assets/gallery_icon.png')
                  : require('../assets/wonderself_icon.png')
              }
              resizeMode="contain"
              style={styles.tabIcon}
            />
            <Animated.Text style={{ opacity, ...styles.tabText }}>
              {route.title}
              {/* {route.icon} */}
            </Animated.Text>
            <View
              style={{
                ...styles.indicator,
                ...indicatorColor(i),
              }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 22,
    paddingVertical: 8,
    position: 'relative',
  },
  tabIcon: {
    width: 16,
    height: 16,
    borderRadius: 4,
    marginRight: 4,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '700',
  },
  indicator: {
    position: 'absolute',
    width: '100%',
    height: 3,
    bottom: 0,
    borderRadius: 5,
  },
});

export default TabBar;
