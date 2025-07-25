import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Input from '../Components/Input';
import Task from '../Components/Task';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Main({ id }) {
  const [tasks, setTasks] = useState([]);
  const [sortByPriority, setSortByPriority] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem(`tasks-${id}`);
      if (storedTasks !== null) {
        const parsed = JSON.parse(storedTasks);

        // Normalize priorities
        const normalized = parsed.map((task) => ({
          ...task,
          priority: normalizePriority(task.priority),
        }));

        setTasks(normalized);
      }
    } catch (e) {
      console.error('Failed to load tasks:', e);
    }
  };

  const saveTasks = async (updatedTasks) => {
    setTasks(updatedTasks);
    await AsyncStorage.setItem(`tasks-${id}`, JSON.stringify(updatedTasks));
  };

  const handleSortToggle = () => {
    setSortByPriority((prev) => !prev);
  };

  const handleDelete = async (taskId) => {
    const updated = tasks.filter((t) => t.id !== taskId);
    await saveTasks(updated);
  };

  const handleToggleComplete = async (taskId) => {
    const updated = tasks.map((t) =>
      t.id === taskId
        ? { ...t, status: t.status === 'complete' ? 'pending' : 'complete' }
        : t
    );
    await saveTasks(updated);
  };

  const normalizePriority = (priority) => {
    if (!priority) return 'Low';
    const clean = priority.trim().toLowerCase();
    if (clean === 'high') return 'High';
    if (clean === 'medium') return 'Medium';
    return 'Low';
  };

  const sortTasksByPriority = (list) => {
    const priorityOrder = { High: 1, Medium: 2, Low: 3 };
    return [...list].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  };

  const displayedTasks = sortByPriority
    ? sortTasksByPriority(tasks)
    : tasks;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.container}>
              <Input setTask={setTasks} userId={id} tasks={tasks} />

              <View style={styles.sortButton}>
                <Button
                  title={
                    sortByPriority ? 'Show Creation Order' : 'Sort by Priority'
                  }
                  onPress={handleSortToggle}
                  color="#0077b6"
                />
              </View>

              {displayedTasks.map((item) => (
                <View key={item.id} style={styles.taskWrapper}>
                  <Task
                    id={item.id}
                    task={item.title}                 // ✅ FIXED: rename title to task
                    description={item.description}
                    dueDate={item.dueDate}
                    priority={item.priority}
                    status={item.status}
                    onDelete={() => handleDelete(item.id)}
                    onToggleComplete={() => handleToggleComplete(item.id)}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 120,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  sortButton: {
    marginVertical: 10,
  },
  taskWrapper: {
    marginBottom: 12,
  },
});
