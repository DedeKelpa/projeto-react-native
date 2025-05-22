import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import { HabitContext } from '../components/ContextoHabito';

export default function TelaPerfil() {
  const { habitos, historico, perfil, atualizarPerfil } = useContext(HabitContext);

  const [novoNome, setNovoNome] = useState(perfil.nome);
  const [novaIdade, setNovaIdade] = useState(perfil.idade);
  const [novaMeta, setNovaMeta] = useState(perfil.meta);

  useEffect(() => {
    setNovoNome(perfil.nome);
    setNovaIdade(perfil.idade);
    setNovaMeta(perfil.meta);
  }, [perfil]);

  const confirmarEdicao = () => {
    atualizarPerfil('nome', novoNome);
    atualizarPerfil('idade', novaIdade);
    atualizarPerfil('meta', novaMeta);
  };

  return (
    <View style={estilos.container}>
      <Image source={require('../assets/montanha.png')} style={estilos.avatar} />

      <Text style={estilos.titulo}>{perfil.nome}</Text>

      <Text style={estilos.info}>✅ Total de hábitos: {habitos.length}</Text>
      <Text style={estilos.info}>📝 Ações no histórico: {historico.length}</Text>
      <Text style={estilos.info}>🎯 Meta: {perfil.meta}</Text>
      <Text style={estilos.info}>👤 Idade: {perfil.idade}</Text>

      <View style={estilos.containerInput}>
        <Text>Meta:</Text>
        <TextInput
          value={novaMeta}
          onChangeText={setNovaMeta}
          style={estilos.input}
        />

        <Text>Idade:</Text>
        <TextInput
          value={novaIdade}
          onChangeText={setNovaIdade}
          style={estilos.input}
        />

        <Text>Nome:</Text>
        <TextInput
          value={novoNome}
          onChangeText={setNovoNome}
          style={estilos.input}
        />
      </View>

      <Button title="OK" onPress={confirmarEdicao} />

      <Text style={estilos.mensagem}>
        Continue assim! Você está criando bons hábitos!
      </Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 10, textAlign: 'center' },
  containerInput: { marginTop: 20, width: '80%' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 10, padding: 10, marginBottom: 10 },
  mensagem: { fontStyle: 'italic', color: '#555', marginTop: 20, textAlign: 'center' },
});
