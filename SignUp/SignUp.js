import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = ({ setPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const login = () => {
    setPage('login');
  };

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      const userExists = users.find((user) => user.username === username);
      if (userExists) {
        setErrorMessage('Username already exists');
        return;
      }

      const newUser = {
        id: Date.now().toString(),  // 🔑 Unique ID
        username,
        password,
        photo: null,                // 📷 Placeholder for future profile image
      };

      const updatedUsers = [...users, newUser];
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));

      Alert.alert('Success', 'Registration successful!');
      setPage('login');
    } catch (err) {
      console.error('Error saving user:', err);
      setErrorMessage('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <FontAwesome5 name="user-alt" size={20} color="#444" />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.input}>
        <FontAwesome5 name="lock" size={20} color="#444" />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{ flex: 1 }}
        />
      </View>
      <View style={styles.input}>
        <FontAwesome5 name="lock" size={20} color="#444" />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={{ flex: 1 }}
        />
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={handleRegister} style={styles.register}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={login}>
        <Text>Already have an account? LogIn</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 60,
    gap: 15,
  },
  input: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    height: 50,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  register: {
    backgroundColor: '#0245D1',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
});
