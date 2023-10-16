import React, { useState, useEffect } from 'react';
import { AppUI } from './AppUI';
import { useLocalStorage } from './useLocalStorage';
import './App.css';


// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el Curso de Introcción a React.js', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 'LALA', completed: true },
//   { text: "el filtro de todos || completados || faltan", completed : false },
//   { text: 'reto - diga felicidades ya terminaste todo', completed: false },
//   { text: 'las leyendas e instrucciones', completed: false },
// ];
// localStorage.setItem('TODOS_V1', JSON.stringify(defaultTodos));

// localStorage, que va a servir pero para otras partes no para los TODOs



const frasesMotivacionales = [
  "Cree en ti, todo es posible.",
  "El éxito es la suma de esfuerzos.",
  "La perseverancia lleva a la victoria.",
  "Si puedes soñarlo, puedes lograrlo.",
  "El cambio comienza con una decisión.",
  "Crea, rompe, aprende, repite, evoluciona, persiste.",
  "Cada día es una nueva oportunidad.",
  "Persiste con fuerza, la meta te espera.",
  "Si puedes imaginarlo, puedes crearlo.",
  'Código limpio: como arte, simple y efectivo.',
  "Debuggear es el arte de ser paciente.",
  "La mejor documentación es un código claro.",
  "Programar es como resolver un rompecabezas.",
  "No reinventes la rueda, a menos que aprendas.",
  "Códigos buenos son poesía, no aburridos prosa.",
  "Siempre hay espacio para mejorar tu código.",
  "Piensa antes de programar, después hazlo simple.",
  "Escribe código que otros amen leer.",
];


function App() {

  //TodoCounter P1 has completado N de N TODOs
  const {
         item: todos,
         saveItem: saveTodos,
         loading,
         error
        } = useLocalStorage('TODOS_V1', []);


  //TodoSearch input
  const [searchValue, setSearchValue] = React.useState(''); 

  
  const completedTodos = todos.filter(
    todo=> !!todo.completed 
    ).length;

    const totalTodos = todos.length;

    //TodoList
    const searchedTodos = todos.filter(

      (todo) => {
        const todoText = todo.text.toLowerCase();
        const searchText = searchValue.toLocaleLowerCase();
        return todoText.includes(searchText)
      }
    );

    //TodoList delete & check
    const completeTodo = (text) => {
      
      const todoIndex = todos.findIndex( 
      (todo) => todo.text === text
      );

      const newTodos = [...todos]; 

      newTodos[todoIndex].completed = !newTodos[todoIndex].completed; 
      saveTodos(newTodos); 
    };

   const deleteTodo = (text) => { 
      const newTodos = [...todos];
      const todoIndex = newTodos.findIndex( 
        (todo) => todo.text === text 
      );
      newTodos.splice(todoIndex, 1);
      saveTodos(newTodos); 
    }

  //TodoCounter P2 Frases random
  const [motivationalPhrase, setMotivationalPhrase] = React.useState(''); 
  const generateRandomMotivationalPhrase = () => {
    const randomPhrase = frasesMotivacionales[Math.floor(Math.random() * frasesMotivacionales.length)];
    setMotivationalPhrase(randomPhrase);
  };
  useEffect(() => {
    generateRandomMotivationalPhrase();
  }, []); 
 

  return(
    <AppUI 
      loading={loading}
      error={error}
      completedTodos={completedTodos}
      totalTodos={totalTodos}
      motivationalPhrase={motivationalPhrase}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchedTodos={searchedTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  );
}



export default App;

//:0