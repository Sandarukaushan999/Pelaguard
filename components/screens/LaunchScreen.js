import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from 'react-native';

const LaunchScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const dot1 = useRef(new Animated.Value(0.2)).current;
  const dot2 = useRef(new Animated.Value(0.2)).current;
  const dot3 = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();

    const startDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0.2,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startDot(dot1, 0);
    startDot(dot2, 250);
    startDot(dot3, 500);

    const timer = setTimeout(() => {
      navigation.replace('MainTabs');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, slideAnim, pulseAnim, dot1, dot2, dot3]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0B2E" />

      <ImageBackground
        source={require('../../assets/back7.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <View style={styles.glowTop} />
        <View style={styles.glowBottom} />

        <View style={styles.content}>
          <Animated.View
            style={[
              styles.logoWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }, { scale: pulseAnim }],
              },
            ]}
          >
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Image
                  source={require('../../assets/Logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <View style={styles.logoInnerGlow} />
              </View>
            </View>
          </Animated.View>

          <Animated.View
            style={[
              styles.brandWrapper,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            <Text style={styles.mainBrand}>LAKSHAN</Text>
            <View style={styles.brandDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.brandType}>DISTRIBUTION SUITE</Text>
              <View style={styles.dividerLine} />
            </View>
            <Text style={styles.slogan}>Allocate • Deliver • Collect</Text>
            <Text style={styles.subSlogan}>Smart routes and clean sales tracking</Text>
          </Animated.View>

          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Preparing your workspace</Text>
            <View style={styles.loadingDots}>
              <Animated.View style={[styles.dot, { opacity: dot1 }]} />
              <Animated.View style={[styles.dot, { opacity: dot2 }]} />
              <Animated.View style={[styles.dot, { opacity: dot3 }]} />
            </View>
            <View style={styles.loadingBar}>
              <Animated.View
                style={[
                  styles.loadingProgress,
                  {
                    transform: [
                      {
                        translateX: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: ['-100%', '0%'],
                        }),
                      },
                    ],
                  },
                ]}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(8, 10, 28, 0.88)',
  },
  glowTop: {
    position: 'absolute',
    top: -120,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
  },
  glowBottom: {
    position: 'absolute',
    bottom: -160,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: 'rgba(16, 185, 129, 0.18)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoWrapper: {
    marginBottom: 24,
  },
  logoContainer: {
    position: 'relative',
  },
  logoCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.18)',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 30,
    elevation: 20,
  },
  logoImage: {
    width: 140,
    height: 140,
    opacity: 0.85,
    tintColor: '#FFFFFF',
  },
  logoInnerGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  brandWrapper: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 15,
    elevation: 10,
  },
  mainBrand: {
    fontSize: 34,
    fontWeight: '900',
    color: '#0F172A',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  brandDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  dividerLine: {
    width: 26,
    height: 2,
    backgroundColor: '#2563EB',
    borderRadius: 1,
  },
  brandType: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1F2937',
    letterSpacing: 2,
    marginHorizontal: 10,
    textTransform: 'uppercase',
  },
  slogan: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  subSlogan: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 4,
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 60,
    width: '80%',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 12,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  loadingDots: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  loadingBar: {
    width: '100%',
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 1.5,
    overflow: 'hidden',
  },
  loadingProgress: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
});

export default LaunchScreen;
