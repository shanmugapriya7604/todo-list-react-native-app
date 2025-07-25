import { StyleSheet, Text, View, Pressable } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function Task({
  id,
  task,
  description,
  dueDate,
  priority,
  status,
  onDelete,
  onToggleComplete,
}) {
  const isComplete = status === 'complete';

  return (
    <View style={[styles.taskContainer, isComplete && styles.completed]}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskTitle}>{task}</Text>
        <Text style={styles.text}>Description: {description}</Text>
        <Text style={styles.text}>Due: {dueDate}</Text>
        <Text style={styles.text}>Priority: {priority}</Text>
        <Text style={styles.text}>Status: {status}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable onPress={onToggleComplete} style={styles.actionButton}>
          <AntDesign
  name={isComplete ? 'checkcircle' : 'minuscircleo'}
  size={24}
  color={isComplete ? 'green' : 'orange'}
/>

        </Pressable>

        <Pressable onPress={onDelete} style={styles.actionButton}>
          <Feather name="trash-2" size={24} color="red" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  completed: {
    backgroundColor: '#d1ffd6',
    opacity: 0.7,
  },
  taskDetails: {
    marginBottom: 10,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
});
