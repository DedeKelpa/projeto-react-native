import React, { useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Vibration, Platform } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Audio } from 'expo-av';
import { HabitContext } from '../components/ContextoHabito';

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
  const { habitos, alternarHabito } = useContext(HabitContext);
  const [fraseAtual, setFraseAtual] = useState('');
  const [imagemAtual, setImagemAtual] = useState(null);

  const dataHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });

  useFocusEffect(
    useCallback(() => {
      const novaFrase = frases[Math.floor(Math.random() * frases.length)];
      const novaImagem = imagens[Math.floor(Math.random() * imagens.length)];
      setFraseAtual(novaFrase);
      setImagemAtual(novaImagem);
    }, [])
  );

  const lidarComMarcar = async (id, feito) => {
    if (Platform.OS !== 'web') {
      Vibration.vibrate();
    }

    if (!feito) {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: false,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false
      });

      const { sound } = await Audio.Sound.createAsync(
        require('../assets/sucesso.mp3')
      );
      await sound.playAsync();
    }

    alternarHabito(id);
  };

  const total = habitos.length;
  const concluidos = habitos.filter(h => h.feito).length;
  const progresso = total > 0 ? concluidos / total : 0;

  return (
    <View style={styles.container}>
      {imagemAtual && <Image source={imagemAtual} style={styles.imagem} />}
      <Text style={styles.frase}>{fraseAtual}</Text>

      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: (progresso * 100) + '%' }]} />
      </View>

      <Text style={styles.titulo}>
        {dataHoje.charAt(0).toUpperCase() + dataHoje.slice(1)}
      </Text>

      {habitos.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={[styles.habitoItem, item.feito && styles.habitoConcluido]}
          onPress={() => lidarComMarcar(item.id, item.feito)}
        >
          <Text style={styles.habitoTexto}>
            {item.feito ? '✅' : '⬜️'} {item.nome}
          </Text>
        </TouchableOpacity>
      ))}
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
  imagem: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20
  },
  frase: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10
  },
  progressBarContainer: {
    height: 20,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 10
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  habitoItem: {
    backgroundColor: '#E8F0FE',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  habitoConcluido: {
    backgroundColor: '#D4EDDA'
  },
  habitoTexto: {
    fontSize: 16
  }
});
