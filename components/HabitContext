import React, { createContext, useState } from 'react';

export const HabitContext = createContext();

export const HabitProvider = ({ children }) => {
  const [habit, setHabit] = useState([
    { id: '1', name: 'Beber água', done: false },
    { id: '2', name: 'Estudar 1h', done: false },
  ]);

  const [history, setHistory] = useState([]);

  const addHabit = (name) => {
    const newHabit = { id: Date.now().toString(), name, done: false };
    setHabit([...habit, newHabit]);
    setHistory([...history, `Adicionado: ${name}`]);
  };

  const deleteHabit = (id) => {
    const foundHabit = habit.find((h) => h.id === id);
    setHabit(habit.filter((h) => h.id !== id));
    setHistory([...history, `Excluído: ${foundHabit?.name}`]);
  };

  const toggleHabitDone = (id) => {
    const updated = habit.map((h) =>
      h.id === id ? { ...h, done: !h.done } : h
    );
    setHabit(updated);
  };

  const registerHistory = (text) => {
    setHistory([...history, text]);
  };

  const removeCompletedHabits = () => {
    setHabit(habit.filter(h => !h.done));
  };

  return (
    <HabitContext.Provider value={{
      habit,
      addHabit,
      deleteHabit,
      toggleHabitDone,
      history,
      registerHistory,
      removeCompletedHabits
    }}>
      {children}
    </HabitContext.Provider>
  );
};
