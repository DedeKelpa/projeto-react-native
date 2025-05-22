import React, { createContext, useState, useEffect } from 'react';
import { database } from '../config/firebase';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habitos, setHabits] = useState([]);
  const [historico, setHistory] = useState([]);
  const [perfil, setProfile] = useState({
    nome: 'Usuário',
    idade: '25',
    meta: 'Beber mais água'
  });

  const userId = 'defaultUser';

  useEffect(() => {
    const habitosRef = database.ref('habitos/' + userId);
    const historicoRef = database.ref('historico/' + userId);
    const perfilRef = database.ref('perfil/' + userId);

    habitosRef.on('value', snap => {
      const data = snap.val();
      setHabits(Object.values(data || {}));
    });

    historicoRef.on('value', snap => {
      const data = snap.val();
      setHistory(Object.values(data || {}));
    });

    perfilRef.on('value', snap => {
      const data = snap.val();
      setProfile(data || {});
    });

    return () => {
      habitosRef.off();
      historicoRef.off();
      perfilRef.off();
    };
  }, []);

  const addHistory = (texto) => {
    database.ref('historico/' + userId).push({ texto });
  };

  const adicionarHabito = (nome) => {
    const ref = database.ref('habitos/' + userId).push();
    ref.set({ id: ref.key, nome: nome, feito: false });
    addHistory('Adicionou: ' + nome);
  };

  const excluirHabito = (id) => {
    const habit = habitos.find(h => h.id === id);
    database.ref('habitos/' + userId + '/' + id).remove();
    addHistory('Removeu hábito: ' + habit.nome);
  };

  const alternarHabito = (id) => {
    const habit = habitos.find(h => h.id === id);
    database.ref('habitos/' + userId + '/' + id).update({ feito: !habit.feito });
    addHistory((habit.feito ? 'Desmarcou: ' : 'Concluiu: ') + habit.nome);
  };

  const atualizarPerfil = (campo, valor) => {
    const obj = {};
    obj[campo] = valor;
    database.ref('perfil/' + userId).update(obj);
    addHistory('Atualizou ' + campo + ': ' + valor);
  };

  return (
    <HabitContext.Provider value={{
      habitos,
      historico,
      perfil,
      adicionarHabito,
      excluirHabito,
      alternarHabito,
      atualizarPerfil
    }}>
      {children}
    </HabitContext.Provider>
  );
};
