import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';
import { useAppContext } from '@/context/AppContext';
import { appleleUser, googleUser } from '@/mock/user';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const LandingPage = () => {
  const { storeUser } = useAppContext();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '<YOUR_GOOGLE_CLIENT_ID>',
  });

  const handleGoogleSignIn = async () => {
    try {
      await promptAsync();
      // Simulated user flow for testing without real authentication
      storeUser(googleUser);
      router.push('/(tabs)');
    } catch (error) {
      console.error('Google sign-in failed:', error);
    }
  };

  const handleAppleSignIn = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync();
      // Simulated user flow for testing without real authentication
      storeUser(appleleUser);
      router.push('/(tabs)');
    } catch (error) {
      console.error('Apple sign-in failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.titleText}>
          Welcome to Dr Home Aesthetics
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Text style={styles.buttonText}>Sign up with Google</Text>
        </TouchableOpacity>
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          style={styles.appleButton}
          onPress={handleAppleSignIn}
        />
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  headerContainer: {
    marginTop: '20%',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    top: '20%'
  },
  buttonContainer: {
    marginTop: '60%',
    alignItems: 'center',
  },
  googleButton: {
    padding: 10,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 20,
    width: 200,
    height: 40,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  appleButton: {
    width: 200,
    height: 40,
    borderRadius: 10,
  },
});

export default LandingPage;
