import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const Onboarding1 = ({ navigation }) => {
  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1E3A8A" />
      
      {/* Background Image */}
      <ImageBackground 
        source={require('../../assets/back1.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={styles.backgroundImageStyle}
      >
        {/* Ocean Background Effect */}
        <View style={styles.backgroundEffect}>
          <View style={styles.diver} />
          <View style={styles.fish1} />
          <View style={styles.fish2} />
          <View style={styles.fish3} />
          <View style={styles.fish4} />
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
          <View style={[styles.progressDot, styles.activeDot]} />
          <View style={styles.progressDot} />
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>
            <Text style={styles.titleRegular}>Join the </Text>
            <Text style={styles.titleHighlight}>Movement</Text>
          </Text>
          
          <Text style={styles.subtitle}>
            Together, we can restore our blue planet
          </Text>
          
          <Text style={styles.description}>
            Connect with ocean warriors worldwide and track your environmental impact
          </Text>
        </View>

        {/* Join Button */}
        <TouchableOpacity style={styles.joinButton} onPress={handleNext}>
          <Text style={styles.joinButtonText}>Join Us ›</Text>
        </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E3A8A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    alignSelf: 'flex-start',
  },
  backgroundEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.6,
  },
  diver: {
    position: 'absolute',
    top: 120,
    left: 60,
    width: 30,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 15,
  },
  fish1: {
    position: 'absolute',
    top: 100,
    right: 80,
    width: 20,
    height: 15,
    backgroundColor: '#F59E0B',
    borderRadius: 10,
  },
  fish2: {
    position: 'absolute',
    top: 150,
    left: 100,
    width: 18,
    height: 12,
    backgroundColor: '#10B981',
    borderRadius: 9,
  },
  fish3: {
    position: 'absolute',
    top: 180,
    right: 120,
    width: 22,
    height: 16,
    backgroundColor: '#EF4444',
    borderRadius: 11,
  },
  fish4: {
    position: 'absolute',
    top: 200,
    left: 40,
    width: 16,
    height: 10,
    backgroundColor: '#8B5CF6',
    borderRadius: 8,
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
    backgroundColor: '#8B5CF6',
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  contentContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 16,
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
    textAlign: 'left',
    marginBottom: 16,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'left',
    lineHeight: 20,
  },
  joinButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  joinButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Onboarding1;