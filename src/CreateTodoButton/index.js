import React from 'react'
import './CreateTodoButton.css'
import { TodoContext } from '../TodoContext';
import { AiFillPlusCircle } from  "react-icons/ai";


function CreateTodoButton(){
    const { setOpenModal, setEditingTodo } = React.useContext(TodoContext);
    return(
        <button
         className="CreateTodoButton"
         onClick={
            () =>{
                setEditingTodo(null);
                setOpenModal((abrirModal) => !abrirModal);
            }
         }
         >
         <AiFillPlusCircle/>
         </button>
    );
}

export {CreateTodoButton};