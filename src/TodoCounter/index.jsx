import React from 'react';
import "./TodoCounter.css"
import { TodoContext } from '../TodoContext';

function TodoCounter(){

    const { totalTodos, completedTodos, motivationalPhrase } = React.useContext(TodoContext);

    return(
        <div className="TodoCounter">
            <h3 className="fs-5 fw-medium mb-2">
              Has completado <span>{completedTodos}</span> de <span>{totalTodos}</span> tareas
            </h3>
            <p className="TodoCounter-phrase">{motivationalPhrase}</p>
        </div>
    );
}


export { TodoCounter };