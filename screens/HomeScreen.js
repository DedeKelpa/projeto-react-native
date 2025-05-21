import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Vibration } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { HabitContext } from '../components/HabitContext';

const frases = [
  "Você é mais forte do que imagina!",
  "Cada hábito conta!",
  "Pequenos passos geram grandes mudanças.",
  "Confie no processo.",
  "A sua consistência define o seu sucesso."
];

const imagens = [
  require('../assets/sol.png'),
  require('../assets/montanha.png'),
  require('../assets/lago.png'),
  require('../assets/floresta.png'),
  require('../assets/lua.png')
];

export default function HomeScreen() {
  const { habit, toggleHabitDone, registerHistory, removeCompletedHabits } = useContext(HabitContext);
  const [fraseAtual, setFraseAtual] = useState('');
  const [imagemAtual, setImagemAtual] = useState(null);

  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  useFocusEffect(
    useCallback(() => {
      const novaFrase = frases[Math.floor(Math.random() * frases.length)];
      const novaImagem = imagens[Math.floor(Math.random() * imagens.length)];
      setFraseAtual(novaFrase);
      setImagemAtual(novaImagem);
    }, [])
  );

  const handleMarcar = (id, name) => {
    toggleHabitDone(id);
    registerHistory(`Você marcou: ${name}`);
  };

const handleConcluir = async () => {
  const concluidos = habit.filter(h => h.done);

  if (concluidos.length > 0) {
    const nomes = concluidos.map(h => h.name).join(', ');
    registerHistory(`Você concluiu: ${nomes}`);
  }

  removeCompletedHabits();
  Vibration.vibrate();

  const { sound } = await Audio.Sound.createAsync(
    require('../assets/sucesso.mp3')
  );
  await sound.playAsync();
};
  const algumMarcado = habit.some(h => h.done);

  return (
    <View style={styles.container}>
      {imagemAtual && (
        <Image source={imagemAtual} style={styles.imagem} />
      )}

      <Text style={styles.frase}>{fraseAtual}</Text>

      <Text style={styles.titulo}>
        {dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1)}
      </Text>

      {habit.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.habitoItem, item.done && styles.habitoConcluido]}
          onPress={() => handleMarcar(item.id, item.name)}
        >
          <Text style={styles.habitoTexto}>
            {item.done ? '✅' : '⬜️'} {item.name}
          </Text>
        </TouchableOpacity>
      ))}

      {algumMarcado && (
        <Button title="Concluir" onPress={handleConcluir} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  imagem: { width: 150, height: 150, alignSelf: 'center', marginBottom: 10 },
  frase: { fontStyle: 'italic', fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  habitoItem: {
    backgroundColor: '#E8F0FE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  habitoConcluido: { backgroundColor: '#D4EDDA' },
  habitoTexto: { fontSize: 16 }
});
