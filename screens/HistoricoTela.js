import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { HabitContext } from '../components/ContextoHabito';

export default function TelaHistorico() {
  const { historico } = useContext(HabitContext);

  return (
    <View style={estilos.container}>
      <Text style={estilos.titulo}>Histórico</Text>
      <ScrollView>
        {historico && historico.map((item, indice) => (
          <Text key={indice} style={estilos.item}>
            {item.texto}
          </Text>
        ))}
      </ScrollView>
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
  item: {
    fontSize: 16,
    marginBottom: 10
  }
});
