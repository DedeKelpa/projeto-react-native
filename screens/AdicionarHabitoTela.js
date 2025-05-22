import React, { useContext, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { HabitContext } from '../components/ContextoHabito';

export default function TelaAdicionarHabito() {
  const { habitos, adicionarHabito, excluirHabito } = useContext(HabitContext);
  const [novoHabito, setNovoHabito] = useState('');

  const aoAdicionar = () => {
    adicionarHabito(novoHabito);
    setNovoHabito('');
  };

  const aoExcluir = (id) => {
    excluirHabito(id);
  };

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Adicionar Hábito</Text>

      <TextInput
        placeholder="Novo hábito"
        value={novoHabito}
        onChangeText={setNovoHabito}
        style={estilos.input}
      />

      <Button title="Adicionar" onPress={aoAdicionar} />

      <Text style={estilos.subtitulo}>Meus Hábitos</Text>

      {habitos.map((item) => (
        <View key={item.id} style={estilos.itemHabito}>
          <Text style={estilos.textoHabito}>{item.nome}</Text>
          <TouchableOpacity
            style={estilos.botaoExcluir}
            onPress={() => aoExcluir(item.id)}
          >
            <Text style={estilos.textoExcluir}>Excluir</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const estilos = StyleSheet.create({
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
  itemHabito: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E8F0FE',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  textoHabito: {
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
