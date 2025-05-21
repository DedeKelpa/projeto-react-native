import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { HabitContext } from '../components/HabitContext';
import { AuthContext } from '../components/AuthContext';

export default function ProfileScreen() {
  const { habit, history } = useContext(HabitContext);
  const { logout } = useContext(AuthContext);  // ✅ adiciona logout
  const [image, setImage] = useState(null);

  const totalHabits = habit.length;
  const historyCount = history.length;

  const fraseMotivacional = "Continue assim! Você está criando bons hábitos!";

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Precisamos de permissão para acessar sua galeria.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={image ? { uri: image } : require('../assets/avatar.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      <Text style={styles.titulo}>Perfil</Text>

      <View style={styles.stats}>
        <Text style={styles.statItem}>✅ Total de hábitos: {totalHabits}</Text>
        <Text style={styles.statItem}>📜 Ações no histórico: {historyCount}</Text>
      </View>

      <Text style={styles.frase}>{fraseMotivacional}</Text>

      <Button title="Sair" color="#FF6B6B" onPress={logout} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, alignItems: 'center', backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  stats: { marginBottom: 20 },
  statItem: { fontSize: 16, marginBottom: 10 },
  frase: { fontStyle: 'italic', fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 20 }
});
