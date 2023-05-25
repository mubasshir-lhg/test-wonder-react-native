import React, { useEffect, useCallback, useMemo, useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Image,
  Platform,
  type StatusBarStyle,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient';
import {
  TabView,
  SceneMap,
  type SceneRendererProps,
  type NavigationState,
} from 'react-native-tab-view';
import TabBar from '../components/TabBar';
import ImageGrid from '../components/ImageGrid';
import axios from 'axios';

interface IStatusBarStyles {
  contentStyle: StatusBarStyle;
  backgroundColor: string;
}

type ITabBarProps = SceneRendererProps & {
  navigationState: NavigationState<any>;
};

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isGalleryLoading, setIsGalleryLoading] = useState(false);
  const [isWonderSelfLoading, setIsWonderSelfLoading] = useState(false);
  const [artCount, setArtCount] = useState(0);
  const [arts, setArts] = useState([]);
  const [routes] = useState([
    {
      key: 'myGallery',
      title: 'My Gallery',
      icon: '../assets/gallery_icon.png',
    },
    {
      key: 'wonderSelf',
      title: 'WonderSelf',
      icon: '../assets/gallery_icon.png',
    },
  ]);

  const MyGalleryRoute = () => (
    <ImageGrid data={arts} isLoading={isGalleryLoading} />
  );
  const WonderSelfRoute = () => (
    <ImageGrid data={arts} isLoading={isWonderSelfLoading} />
  );

  const renderScene = SceneMap({
    myGallery: MyGalleryRoute,
    wonderSelf: WonderSelfRoute,
  });

  const isDarkMode = useColorScheme() === 'dark';

  const statusBarStyles: IStatusBarStyles = useMemo(() => {
    return {
      contentStyle: isDarkMode ? 'light-content' : 'dark-content',
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
  }, [isDarkMode]);

  const getArtsCount = useCallback(async () => {
    const {
      data: { count },
    } = await axios.get('http://localhost:5000/count');
    setArtCount(count);
  }, []);

  const getArts = useCallback(async (type: string) => {
    if (type === 'gallery') {
      setIsGalleryLoading(true);
    } else {
      setIsWonderSelfLoading(true);
    }
    const { data } = await axios.get(`http://localhost:5000?type=${type}`);
    setArts(data);
    if (type === 'gallery') {
      setIsGalleryLoading(false);
    } else {
      setIsWonderSelfLoading(false);
    }
  }, []);

  const type = useMemo(() => {
    return index === 0 ? 'gallery' : 'wonderSelf';
  }, [index]);

  useEffect(() => {
    getArtsCount();
  }, [getArtsCount]);

  useEffect(() => {
    getArts(type);
  }, [type, getArts]);

  const { contentStyle, backgroundColor } = statusBarStyles;

  return (
    <View style={styles.container}>
      <StatusBar barStyle={contentStyle} backgroundColor={backgroundColor} />
      <LinearGradient
        colors={['#fff', '#B2DAF0']}
        style={styles.linearGradient}>
        <View style={styles.heading}>
          <Text style={{ ...styles.headingText, ...styles.textPrimary }}>
            Showcase
          </Text>
          <Text style={styles.headingText}>your art</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.appLogo}
            />
            <TouchableOpacity>
              <Image
                source={require('../assets/discord_icon.png')}
                style={styles.discordIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Image
              source={require('../assets/user_profile.jpeg')}
              style={styles.userProfile}
            />
            <View style={styles.userDetails}>
              <Text style={{ fontWeight: '800' }}>Jake44</Text>
              <Text
                style={{
                  marginVertical: 1,
                  color: '#808080',
                  fontWeight: '700',
                }}>
                {artCount}+ Arts
              </Text>
              <Text style={{ color: '#808080', fontWeight: '700' }}>
                Veteran AI Artist
              </Text>
            </View>
          </View>
          <TabView
            navigationState={{ index, routes }}
            renderTabBar={(props: ITabBarProps) => (
              <TabBar {...props} onPressTab={setIndex} />
            )}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: 100, height: 200 }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 0,
  },
  linearGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingVertical: 24,
    paddingBottom: 40,
  },
  heading: {
    alignItems: 'center',
  },
  headingText: {
    fontSize: 36,
    fontWeight: '700',
  },
  textPrimary: {
    color: '#47A7DE',
  },
  card: {
    width: '80%',
    flex: 1,
    marginTop: 24,
    padding: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: '#fff',
  },
  cardTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  appLogo: {
    width: 80,
    height: 30,
  },
  discordIcon: {
    width: 24,
    height: 24,
    borderRadius: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginTop: 12,
  },
  userProfile: {
    width: 60,
    height: 60,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  userDetails: {
    marginLeft: 12,
  },
});

export default Home;
