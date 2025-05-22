import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import TelaInicial from '../screens/TelaInicial';
import AdicionarHabitoTela from '../screens/AdicionarHabitoTela';
import HistoricoTela from '../screens/HistoricoTela';
import PerfilTela from '../screens/PerfilTela';

const Tab = createBottomTabNavigator();

export default function NavegadorAbas() {
  return (
    <Tab.Navigator
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
      <Tab.Screen name="Início" component={TelaInicial} />
      <Tab.Screen name="Hábito" component={AdicionarHabitoTela} />
      <Tab.Screen name="Histórico" component={HistoricoTela} />
      <Tab.Screen name="Perfil" component={PerfilTela} />
    </Tab.Navigator>
  );
}
