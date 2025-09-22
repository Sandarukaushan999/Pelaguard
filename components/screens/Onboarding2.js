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

const Onboarding2 = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Ocean Background Effect */}
      <View style={styles.backgroundEffect}>
        <View style={styles.shark} />
        <View style={styles.plankton1} />
        <View style={styles.plankton2} />
        <View style={styles.plankton3} />
        <View style={styles.plankton4} />
        <View style={styles.plankton5} />
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>‹</Text>
      </TouchableOpacity>

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
            <Text style={styles.titleRegular}>Ocean </Text>
            <Text style={styles.titleHighlight}>Crisis</Text>
            <Text style={styles.titleRegular}> Alert</Text>
          </Text>
          
          <Text style={styles.statistic}>
            8 million tons of plastic enter our oceans every year
          </Text>
          
          <Text style={styles.description}>
            That's equivalent to dumping a garbage truck of plastic into the ocean every minute
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
  shark: {
    position: 'absolute',
    top: 150,
    left: 80,
    width: 60,
    height: 30,
    backgroundColor: '#60A5FA',
    borderRadius: 15,
  },
  plankton1: {
    position: 'absolute',
    top: 100,
    left: 50,
    width: 4,
    height: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
    borderRadius: 2,
  },
  plankton2: {
    position: 'absolute',
    top: 120,
    right: 80,
    width: 3,
    height: 3,
    backgroundColor: '#FFFFFF',
    opacity: 0.6,
    borderRadius: 1.5,
  },
  plankton3: {
    position: 'absolute',
    top: 180,
    left: 120,
    width: 5,
    height: 5,
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
    borderRadius: 2.5,
  },
  plankton4: {
    position: 'absolute',
    top: 200,
    right: 60,
    width: 4,
    height: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
    borderRadius: 2,
  },
  plankton5: {
    position: 'absolute',
    top: 140,
    left: 200,
    width: 3,
    height: 3,
    backgroundColor: '#FFFFFF',
    opacity: 0.9,
    borderRadius: 1.5,
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
    backgroundColor: '#1E3A8A',
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
    color: '#8B5CF6',
  },
  statistic: {
    fontSize: 18,
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
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
    color: '#6B7280',
    fontWeight: '600',
  },
});

export default Onboarding2;