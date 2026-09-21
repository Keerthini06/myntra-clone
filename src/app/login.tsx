import React, { useState } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Details', 'Please enter your email and password.');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Invalid Password',
        'Password must contain at least 6 characters.'
      );
      return;
    }

    router.replace('/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>MYNTRA</Text>

        <Text style={styles.heading}>Welcome Back!</Text>

        <Text style={styles.subheading}>
          Login to continue shopping with us
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Email or Mobile Number"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOGIN</Text>
        </Pressable>

        <Text style={styles.demoText}>
          Demo login: Enter any email and a password with 6 or more characters.
        </Text>

        <Text style={styles.footerText}>
          By continuing, you agree to our Terms and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },

  logo: {
    fontSize: 34,
    fontWeight: '900',
    letterSpacing: 2,
    color: '#ff3f6c',
    textAlign: 'center',
    marginBottom: 35,
  },

  heading: {
    fontSize: 27,
    fontWeight: '700',
    color: '#222222',
    textAlign: 'center',
    marginBottom: 8,
  },

  subheading: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 30,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: '#dddddd',
    borderRadius: 6,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 16,
    color: '#222222',
    backgroundColor: '#fafafa',
  },

  loginButton: {
    height: 52,
    backgroundColor: '#ff3f6c',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },

  demoText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 18,
  },

  footerText: {
    position: 'absolute',
    bottom: 25,
    left: 28,
    right: 28,
    textAlign: 'center',
    fontSize: 11,
    color: '#999999',
  },
});