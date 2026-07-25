import React from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import './TodoSearch.css';
import { TodoContext } from '../TodoContext';

function TodoSearch() {
  const { searchValue, setSearchValue } = React.useContext(TodoContext);

  return (
    <div className="search-container">
      <input 
        className="TodoSearch" 
        type="search" 
        placeholder="Buscar tarea..." 
        aria-label="Buscar tarea"
        value={searchValue}
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
      />
      <AiOutlineSearch className="search-icon" />
    </div>
  );
}

export { TodoSearch };