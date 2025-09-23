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

const Launch2 = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding1');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      
      {/* Background Image */}
      <ImageBackground 
        source={require('../../assets/back5.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
        imageStyle={styles.backgroundImageStyle}
      >
       
       

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Main Content */}
          <View style={styles.contentContainer}>
            <Text style={styles.titleLine1}>Save</Text>
            <Text style={styles.titleLine2}>
              <Text style={styles.titleRegular}>the </Text>
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
            <Text style={styles.startButtonText}>Start </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
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
  jellyfish1: {
    position: 'absolute',
    top: 80,
    left: 40,
    width: 60,
    height: 90,
    backgroundColor: '#4FC3F7',
    opacity: 0.8,
    borderRadius: 30,
  },
  jellyfish2: {
    position: 'absolute',
    top: 120,
    right: 60,
    width: 45,
    height: 70,
    backgroundColor: '#29B6F6',
    opacity: 0.7,
    borderRadius: 25,
  },
  jellyfish3: {
    position: 'absolute',
    top: 160,
    left: 100,
    width: 55,
    height: 80,
    backgroundColor: '#039BE5',
    opacity: 0.6,
    borderRadius: 27,
  },
  jellyfish4: {
    position: 'absolute',
    top: 200,
    right: 100,
    width: 40,
    height: 60,
    backgroundColor: '#0288D1',
    opacity: 0.9,
    borderRadius: 20,
  },
  jellyfish5: {
    position: 'absolute',
    top: 140,
    left: 200,
    width: 50,
    height: 75,
    backgroundColor: '#0277BD',
    opacity: 0.5,
    borderRadius: 25,
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
  contentContainer: {
    alignItems: 'flex-start',
    marginBottom: 40,
    marginTop: 20,
  },
  titleLine1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'left',
    marginBottom: 0,
  },
  titleLine2: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 20,
  },
  titleRegular: {
    color: '#1F2937',
  },
  titleHighlight: {
    color: '#5145E5',
  },
  keywordsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    alignSelf: 'flex-start',
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
    textAlign: 'left',
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 30,
    paddingVertical: 16,
    borderRadius: 24,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Launch2;