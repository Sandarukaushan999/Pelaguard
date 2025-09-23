import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';

const LaunchScreen = ({ navigation }) => {
  useEffect(() => {
    // Auto navigate to next screen after 3 seconds
    const timer = setTimeout(() => {
      navigation.replace('Launch2');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0B2E" />

      {/* Background Image */}
      <ImageBackground 
        source={require('../../assets/back7.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Background to mimic the provided purple/blue gradient */}
        

        {/* Centered wordmark */}
        <View style={styles.brandContainer}>
          <View style={styles.brandRow}>
            <Text style={styles.brandPela}>Pela</Text>
            <Text style={styles.brandGuard}>guard</Text>
            <Text style={styles.brandTM}>™</Text>
          </View>
          <Text style={styles.tagline}>Defend the Sea, Sustain Life</Text>
          
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0B2E',
  },
  backgroundImage: {
    flex: 1,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  pinkGlow: {
    position: 'absolute',
    top: -140,
    left: -80,
    width: 420,
    height: 320,
    borderRadius: 320,
    backgroundColor: '#D946EF',
    opacity: 0.65,
  },
  purpleGlow: {
    position: 'absolute',
    top: -40,
    right: 80,
    width: 240,
    height: 180,
    borderRadius: 200,
    backgroundColor: '#7C3AED',
    opacity: 0.65,
  },
  blueGlow: {
    position: 'absolute',
    bottom: -80,
    right: -80,
    width: 520,
    height: 380,
    borderRadius: 380,
    backgroundColor: '#1E3A8A',
    opacity: 0.9,
  },
  vignette: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3,6,30,0.45)',
  },
  brandContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  brandPela: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '600',
    letterSpacing: 0.4,
  },
  brandGuard: {
    fontSize: 34,
    color: '#FFFFFF',
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  brandTM: {
    color: '#FFFFFF',
    fontSize: 10,
    marginLeft: 4,
    marginTop: 6,
    opacity: 0.9,
  },
  tagline: {
    marginTop: 16,
    color: '#D1D5DB',
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
});

export default LaunchScreen;