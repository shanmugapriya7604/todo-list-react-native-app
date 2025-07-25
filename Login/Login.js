import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const signUp = () => {
    props.setPage('signUp');
  };

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setErrorMessage('All fields are required');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password should be at least 6 characters');
      return;
    }

    try {
      const storedUsers = await AsyncStorage.getItem('users');
      const parsedUsers = storedUsers ? JSON.parse(storedUsers) : [];

      const matchedUser = parsedUsers.find(
        (user) => user.username === username && user.password === password
      );

      if (matchedUser) {
        await AsyncStorage.setItem('loggedInUser', JSON.stringify(matchedUser));
        props.setUser(username);
        props.setId(matchedUser.id);
        props.setImage(matchedUser.photo || null);
        props.setPage('profile');
      } else {
        setErrorMessage('Wrong username or password!');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.input, errorMessage ? styles.validation : null]}>
        <FontAwesome5 name="user-alt" size={20} color="#444" />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          keyboardType="default"
          autoCapitalize="none"
          style={{ flex: 1 }}
        />
      </View>

      <View style={[styles.input, errorMessage ? styles.validation : null]}>
        <FontAwesome5 name="lock" size={20} color="#444" />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={{ flex: 1 }}
        />
      </View>

      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

      <TouchableOpacity onPress={handleLogin} style={styles.login}>
        <Text style={{ color: '#fff' }}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signUp}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

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
    gap: 15,
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
  login: {
    backgroundColor: '#0245D1',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
    elevation: 2,
  },
  link: {
    marginTop: 10,
    color: '#0245D1',
    fontWeight: 'bold',
  },
  validation: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default Login;
