import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (username, password) => {
  const usersData = await AsyncStorage.getItem('users');
  const users = usersData ? JSON.parse(usersData) : [];
  const existing = users.find(user => user.username === username);
  if (existing) throw new Error('User already exists');
  users.push({ username, password });
  await AsyncStorage.setItem('users', JSON.stringify(users));
};

export const authenticateUser = async (username, password) => {
  const usersData = await AsyncStorage.getItem('users');
  const users = usersData ? JSON.parse(usersData) : [];
  return users.find(user => user.username === username && user.password === password);
};
