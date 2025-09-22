import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    // Navigate to main app
    navigation.replace('MainTabs');
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
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
        

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>

        {/* Content Card */}
        <View style={styles.contentCard}>
          {/* Progress Indicators */}
          <View style={styles.progressContainer}>
            <View style={[styles.progressLine, styles.activeLine]} />
            <View style={styles.progressLine} />
          </View>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              <Text style={styles.titleWelcome}>Welcome to the </Text>
              <Text style={styles.titlePelaguard}>Pelaguard</Text>
            </Text>
            <Text style={styles.subtitle}>Hello there, sign up to continue</Text>
          </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            placeholderTextColor="#9CA3AF"
            value={username}
            onChangeText={setUsername}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Sign up</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.googleButton}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleButtonText}>Continue with google</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
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
    height: height * 0.4,
  },
  jellyfish1: {
    position: 'absolute',
    top: 80,
    left: 50,
    width: 70,
    height: 100,
    backgroundColor: '#4FC3F7',
    opacity: 0.8,
    borderRadius: 35,
  },
  jellyfish2: {
    position: 'absolute',
    top: 120,
    right: 80,
    width: 60,
    height: 85,
    backgroundColor: '#29B6F6',
    opacity: 0.7,
    borderRadius: 30,
  },
  jellyfish3: {
    position: 'absolute',
    top: 160,
    left: 120,
    width: 55,
    height: 80,
    backgroundColor: '#039BE5',
    opacity: 0.6,
    borderRadius: 27,
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
    borderTopLeftRadius: 58,
    borderTopRightRadius: 58,
    paddingTop: 20,
    paddingHorizontal: 30,
    paddingBottom: 50,
    minHeight: height * 0.65,
  },
  progressContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'flex-start',
    paddingHorizontal: 100,
  },
  progressLine: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    flex: 1,
    marginHorizontal: 2,
  },
  activeLine: {
    backgroundColor: '#5145E5',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  titleWelcome: {
    color: '#5145E5',
  },
  titlePelaguard: {
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'left',
  },
  formContainer: {
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  signupButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 24,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#6B7280',
  },
  loginLink: {
    fontSize: 14,
    color: '#5145E5',
    fontWeight: 'bold',
  },
});

export default SignupScreen;