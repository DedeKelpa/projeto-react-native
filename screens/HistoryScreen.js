import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { HabitContext } from '../components/HabitContext';

export default function HistoryScreen() {
  const { history } = useContext(HabitContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Histórico de Ações</Text>
      <FlatList
        data={history}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>{item}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { fontSize: 16, marginBottom: 10, color: '#333' },
});
