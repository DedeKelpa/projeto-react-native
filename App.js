import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HabitProvider } from './components/ContextoHabito';

import TelaInicial from './screens/TelaInicial';
import AdicionarHabitoTela from './screens/AdicionarHabitoTela';
import HistoricoTela from './screens/HistoricoTela';
import PerfilTela from './screens/PerfilTela';

import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <HabitProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Início') {
                iconName = 'home-outline';
              } else if (route.name === 'Hábito') {
                iconName = 'add-circle-outline';
              } else if (route.name === 'Histórico') {
                iconName = 'time-outline';
              } else if (route.name === 'Perfil') {
                iconName = 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            headerShown: false,
          })}
        >
          <Tab.Screen name="Início" component={TelaInicial} />
          <Tab.Screen name="Hábito" component={AdicionarHabitoTela} />
          <Tab.Screen name="Histórico" component={HistoricoTela} />
          <Tab.Screen name="Perfil" component={PerfilTela} />
        </Tab.Navigator>
      </NavigationContainer>
    </HabitProvider>
  );
}
