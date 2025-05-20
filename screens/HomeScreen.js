import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const mockHabits = [
  { id: '1', nome: 'Beber água', concluido: false },
  { id: '2', nome: 'Estudar 1h', concluido: false },
  { id: '3', nome: 'Fazer exercício', concluido: false },
  { id: '4', nome: 'Ler 10 páginas', concluido: false },
];

export default function HomeScreen() {
  const [habitos, setHabitos] = useState(mockHabits);

  const toggleHabito = (id) => {
    const novosHabitos = habitos.map((h) =>
      h.id === id ? { ...h, concluido: !h.concluido } : h
    );
    setHabitos(novosHabitos);
  };

  const habitosConcluidos = habitos.filter((h) => h.concluido).length;
  const progresso = (habitosConcluidos / habitos.length) * 100;

  const fraseMotivacional = () => {
    if (progresso === 0) return 'Vamos começar!';
    if (progresso < 50) return 'Você está indo bem!';
    if (progresso < 100) return 'Quase lá!';
    return 'Parabéns! Você concluiu tudo! 🎉';
  };

  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1)}</Text>
      
      <FlatList
        data={habitos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.habitoItem, item.concluido && styles.habitoConcluido]}
            onPress={() => toggleHabito(item.id)}
          >
            <Text style={styles.habitoTexto}>
              {item.concluido ? '✅' : '⬜️'} {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.progresso}>
        <Text>Progresso: {progresso.toFixed(0)}%</Text>
      </View>

      <Text style={styles.frase}>{fraseMotivacional()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  habitoItem: {
    backgroundColor: '#E8F0FE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  habitoConcluido: {
    backgroundColor: '#D4EDDA',
  },
  habitoTexto: {
    fontSize: 16,
  },
  progresso: {
    marginTop: 20,
    alignItems: 'center',
  },
  frase: {
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
});
