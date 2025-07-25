import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker'; // ✅

export default function Input({ setTask, tasks, userId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [dueDate, setDueDate] = useState(new Date()); // ✅
  const [showDatePicker, setShowDatePicker] = useState(false); // ✅

  const handleAddTask = () => {
    if (!title.trim()) return;

    const newTask = {
      id: uuid.v4(),
      title: title.trim(),
      description: description.trim(),
      dueDate: dueDate.toISOString(), // ✅
      priority,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const updatedTasks = [...tasks, newTask];
    setTask(updatedTasks);

    setTitle('');
    setDescription('');
    setPriority('Low');
    setDueDate(new Date()); // ✅
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter task title"
        placeholderTextColor="#aaa"
        editable
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter task description"
        placeholderTextColor="#aaa"
        multiline
        editable
      />

      {/* ✅ Due Date Field */}
      <Text style={styles.label}>Due Date</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.dateButton}>
        <Text style={styles.dateText}>{dueDate.toDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Priority</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
        </Picker>
      </View>

      <Button title="Add Task" onPress={handleAddTask} color="#0077b6" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 10,
  },
  dateText: {
    color: '#333',
  },
});
