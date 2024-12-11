import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';
import { router } from 'expo-router';

const LandingPage = ({ navigation }: { navigation: any }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '<YOUR_GOOGLE_CLIENT_ID>',
  });

  const handleGoogleSignIn = async () => {
    await promptAsync();
        //we can navigate to homescreen because we can't perform the operation on a simulator
    router.push('/(tabs)')
    if (response?.type === 'success') {
      router.push('/(tabs)')
    }
  };

  const handleAppleSignIn = async () => {
    const credential = await AppleAuthentication.signInAsync();
    //we can navigate to homescreen because we need a valid apple account to successfully signup
    router.push('/(tabs)')
    if (credential) {
      router.push('/(tabs)')
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleGoogleSignIn}>
        <Text style={{color: 'white'}}>Sign in with Google</Text>
      </TouchableOpacity>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        style={styles.appleButton}
        onPress={handleAppleSignIn}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  button: { padding: 10, backgroundColor: 'black', marginBottom: 20, borderRadius: 10 },
  appleButton: { width: 200, height: 44, borderRadius: 10},
});

export default LandingPage;
