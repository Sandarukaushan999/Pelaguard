import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const LaunchIntroScreen = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('Onboarding1');
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Ocean Background Effect */}
      <View style={styles.backgroundEffect}>
        <View style={styles.jellyfish1} />
        <View style={styles.jellyfish2} />
        <View style={styles.jellyfish3} />
        <View style={styles.jellyfish4} />
      </View>

      {/* Content Card */}
      <View style={styles.contentCard}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            <Text style={styles.titleRegular}>Your </Text>
            <Text style={styles.titleHighlight}>Impact</Text>
          </Text>
          <Text style={styles.titleRegular}>Matters</Text>
          
          <Text style={styles.subtitle}>
            Small actions create massive waves of change
          </Text>
          
          <Text style={styles.description}>
            Every reusable bottle, every cleanup, every conscious choice saves marine life
          </Text>
        </View>

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next ></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  backgroundEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.6,
  },
  jellyfish1: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: 40,
    height: 40,
    backgroundColor: '#60A5FA',
    opacity: 0.6,
    borderRadius: 20,
  },
  jellyfish2: {
    position: 'absolute',
    top: 150,
    right: 80,
    width: 30,
    height: 30,
    backgroundColor: '#3B82F6',
    opacity: 0.5,
    borderRadius: 15,
  },
  jellyfish3: {
    position: 'absolute',
    top: 200,
    left: 120,
    width: 35,
    height: 35,
    backgroundColor: '#2563EB',
    opacity: 0.4,
    borderRadius: 17.5,
  },
  jellyfish4: {
    position: 'absolute',
    top: 80,
    right: 40,
    width: 25,
    height: 25,
    backgroundColor: '#1D4ED8',
    opacity: 0.7,
    borderRadius: 12.5,
  },
  contentCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 50,
    minHeight: height * 0.45,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#8B5CF6',
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  contentContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleRegular: {
    color: '#1F2937',
  },
  titleHighlight: {
    color: '#8B5CF6',
  },
  subtitle: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  nextButton: {
    alignSelf: 'flex-end',
  },
  nextButtonText: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
});

export default LaunchIntroScreen;