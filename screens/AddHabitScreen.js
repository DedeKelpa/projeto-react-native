import React, { useState, useContext } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { HabitContext } from '../components/HabitContext';

export default function AddHabitScreen() {
  const [newHabit, setNewHabit] = useState('');
  const { habit, addHabit, deleteHabit } = useContext(HabitContext);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Hábitos</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o novo hábito"
        value={newHabit}
        onChangeText={setNewHabit}
      />

      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => {
          addHabit(newHabit);
          setNewHabit('');
        }}
      >
        <Text style={styles.botaoTexto}>Adicionar</Text>
      </TouchableOpacity>

      <FlatList
        data={habit}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.habitoItem}>
            <Text style={styles.habitoTexto}>🔹 {item.name}</Text>
            <TouchableOpacity onPress={() => deleteHabit(item.id)}>
              <Text style={styles.excluir}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 },
  botaoAdicionar: {
    backgroundColor: '#3163B0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontWeight: 'bold' },
  habitoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E8F0FE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  habitoTexto: { fontSize: 16 },
  excluir: { color: 'red', marginLeft: 10 },
});
