import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HabitContext } from '../components/ContextoHabito';


export default function HistoryScreen() {
  const { historico } = useContext(HabitContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico</Text>
      <ScrollView>
        {historico.map((item, index) => (
          <Text key={index} style={styles.item}>
            {item.text}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    fontSize: 16,
    marginBottom: 10
  }
});
