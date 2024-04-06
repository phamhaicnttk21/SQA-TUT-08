import { StyleSheet, View } from 'react-native';
import PizzaOrder from './screens/PizzaOrder';
export default function App() {
  return (
    <View style={styles.container}>
      <PizzaOrder></PizzaOrder>
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
