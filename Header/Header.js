import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ProfileInfo from '../ProfileInfo/ProfileInfo';

export default function Header(props) {
  if (props.page === 'profile') {
    return (
      <View style={styles.header}>
        <ProfileInfo
          setPage={props.setPage}
          user={props.user}
          image={props.image}
          userId={props.userId}
        />
      </View>
    );
  }

  if (props.page === 'task') {
    return (
      <View style={styles.taskHeader}>
        <View style={styles.topRow}>
          <View style={styles.profileSection}>
            <FontAwesome name="user-circle-o" size={40} color="#fff" />
            <Text style={styles.emailText}>
              {props.user?.email || 'user@example.com'}
            </Text>
          </View>

          <TouchableOpacity onPress={() => props.setPage('login')}>
            <View style={styles.logoutIconContainer}>
              <MaterialIcons name="logout" size={24} color="#fff" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Default for login, signup, etc.
  return (
    <View style={styles.defaultHeader}>
      <FontAwesome name="user-circle-o" size={120} color="#fff" style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  // Default header for login/signup
  defaultHeader: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    height: '38%',
    backgroundColor: '#0245D1',
    borderBottomRightRadius: 60,
    borderBottomLeftRadius: 60,
    elevation: 4,
  },
  logo: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: -60,
    backgroundColor: '#0245D1',
    padding: 10,
    borderRadius: 100,
  },

  // Task page header
  taskHeader: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#0245D1',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    elevation: 4,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 10,
  },
  logoutIconContainer: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 20,
  },
});
