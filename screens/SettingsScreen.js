import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/themed';

function SettingsScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Text>Settings Screen</Text>
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

export default SettingsScreen;