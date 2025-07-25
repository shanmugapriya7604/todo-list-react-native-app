import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ Default avatar
import defaultAvatar from '../assets/profile.png';

const ProfileInfo = (props) => {
  const [image, setImage] = useState(props.image);

  const pickImage = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert('Permission Denied', 'Please allow access to the photo library');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        const selectedImage = result.assets[0].uri;
        setImage(selectedImage);
        props.setImage(selectedImage);

        const storedUsers = await AsyncStorage.getItem('users');
        const users = storedUsers ? JSON.parse(storedUsers) : [];

        const updatedUsers = users.map(user => {
          if (user.username === props.user) {
            return { ...user, photo: selectedImage };
          }
          return user;
        });

        await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
      Alert.alert('Error', 'Could not pick an image');
    }
  };

  const logOut = () => {
    props.setPage('login');
  };

  return (
    <View style={styles.profile}>
      <TouchableOpacity style={styles.logout} onPress={logOut}>
        <View style={styles.logoutBackground}>
          <MaterialIcons name="logout" size={28} color="#fff" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={pickImage}>
        <Image source={image ? { uri: image } : defaultAvatar} style={styles.img} />
        <Entypo name="edit" size={20} color="#444" style={styles.edit} />
      </TouchableOpacity>

      {/* ✅ Show Email Below Profile Picture */}
      <Text style={styles.emailText}>
        {props.user || 'user@example.com'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },
  img: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  logout: {
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  logoutBackground: {
    backgroundColor: '#000', // Dark background for logout icon
    padding: 6,
    borderRadius: 50,
  },
  edit: {
    position: 'absolute',
    right: 35,
    bottom: -8,
    backgroundColor: '#fff',
    borderRadius: 100,
    padding: 5,
    shadowColor: '#003049',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
    verticalAlign: 'middle',
    textAlign: 'center',
  },
  emailText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ProfileInfo;
