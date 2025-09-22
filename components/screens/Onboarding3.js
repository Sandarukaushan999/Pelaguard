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

const Onboarding3 = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('SignupScreen');
  };

  const handleBack = () => {
    navigation.goBack();
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
        <View style={styles.jellyfish5} />
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>‹</Text>
      </TouchableOpacity>

      {/* Content Card */}
      <View style={styles.contentCard}>
        {/* Progress Indicators */}
        <View style={styles.progressContainer}>
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
          <View style={[styles.progressDot, styles.activeDot]} />
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            <Text style={styles.titleRegular}>Save the </Text>
            <Text style={styles.titleHighlight}>sea</Text>
          </Text>
          
          <View style={styles.keywordsContainer}>
            <Text style={styles.keyword}>Protect</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.keyword}>Act</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.keyword}>Inspire</Text>
          </View>
          
          <Text style={styles.description}>
            Be an ocean hero, learn, act, and inspire others to reduce waste and protect marine life
          </Text>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleGetStarted}>
          <Text style={styles.startButtonText}>Start ></Text>
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
    top: 80,
    left: 40,
    width: 35,
    height: 35,
    backgroundColor: '#60A5FA',
    opacity: 0.6,
    borderRadius: 17.5,
  },
  jellyfish2: {
    position: 'absolute',
    top: 120,
    right: 60,
    width: 28,
    height: 28,
    backgroundColor: '#3B82F6',
    opacity: 0.5,
    borderRadius: 14,
  },
  jellyfish3: {
    position: 'absolute',
    top: 160,
    left: 100,
    width: 32,
    height: 32,
    backgroundColor: '#2563EB',
    opacity: 0.4,
    borderRadius: 16,
  },
  jellyfish4: {
    position: 'absolute',
    top: 200,
    right: 100,
    width: 25,
    height: 25,
    backgroundColor: '#1D4ED8',
    opacity: 0.7,
    borderRadius: 12.5,
  },
  jellyfish5: {
    position: 'absolute',
    top: 140,
    left: 200,
    width: 30,
    height: 30,
    backgroundColor: '#1E40AF',
    opacity: 0.3,
    borderRadius: 15,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
    backgroundColor: '#3B82F6',
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
    marginBottom: 20,
  },
  titleRegular: {
    color: '#1F2937',
  },
  titleHighlight: {
    color: '#3B82F6',
  },
  keywordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  keyword: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  separator: {
    fontSize: 16,
    color: '#D1D5DB',
    marginHorizontal: 12,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Onboarding3;