import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';

function GroupsScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text>Groups Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default GroupsScreen;