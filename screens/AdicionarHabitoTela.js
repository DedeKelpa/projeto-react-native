import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { HabitContext } from '../components/ContextoHabito';

export default function AddHabitScreen() {
  const { habitos, adicionarHabito, excluirHabito } = useContext(HabitContext);
  const [novoHabito, setNovoHabito] = useState('');

  const handleAdicionar = () => {
    adicionarHabito(novoHabito);
    setNovoHabito('');
  };

  const handleExcluir = (id) => {
    excluirHabito(id);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adicionar Hábito</Text>

      <TextInput
        placeholder="Novo hábito"
        value={novoHabito}
        onChangeText={setNovoHabito}
        style={styles.input}
      />

      <Button title="Adicionar" onPress={handleAdicionar} />

      <Text style={styles.subtitulo}>Meus Hábitos</Text>

      {habitos.map((item) => (
        <View key={item.id} style={styles.habitoItem}>
          <Text style={styles.habitoTexto}>{item.nome}</Text>
          <TouchableOpacity
            style={styles.botaoExcluir}
            onPress={() => handleExcluir(item.id)}
          >
            <Text style={styles.textoExcluir}>Excluir</Text>
          </TouchableOpacity>
        </View>
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
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20
  },
  habitoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  habitoTexto: {
    fontSize: 16
  },
  botaoExcluir: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  textoExcluir: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
