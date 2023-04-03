import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.textCont}>
        <Text style={styles.text}>If you read this then it works!!</Text>
      </View>
      <StatusBar style="auto" />
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
  textCont: {
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 20,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});
