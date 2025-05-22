import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import TelaInicial from '../screens/TelaInicial';
import TelaAdicionarHabito from '../screens/AdicionarHabitoTela';
import TelaHistorico from '../screens/HistoricoTela';
import TelaPerfil from '../screens/PerfilTela';

const Abas = createBottomTabNavigator();

export default function NavegadorAbas() {
  return (
    <Abas.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Início') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'Hábito') {
            return <MaterialCommunityIcons name="playlist-plus" size={size} color={color} />;
          } else if (route.name === 'Histórico') {
            return <Ionicons name="time" size={size} color={color} />;
          } else if (route.name === 'Perfil') {
            return <Ionicons name="person" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Abas.Screen name="Início" component={TelaInicial} />
      <Abas.Screen name="Hábito" component={TelaAdicionarHabito} />
      <Abas.Screen name="Histórico" component={TelaHistorico} />
      <Abas.Screen name="Perfil" component={TelaPerfil} />
    </Abas.Navigator>
  );
}
