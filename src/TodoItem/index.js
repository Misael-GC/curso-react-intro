import './TodoItem.css'
import { BsFillDashCircleFill, BsCheckSquareFill, BsPencilSquare, BsBullseye } from "react-icons/bs";

function TodoItem(props) {
    return (
      <li className={`TodoItem ${props.isFocused ? 'TodoItem--focused' : ''}`}>

        <span 
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete}
        >
        <BsCheckSquareFill/>
        </span> 

        <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>

        <span 
        className={`Icon Icon-focus ${props.isFocused ? 'Icon-focus--active' : ''}`}
        onClick={props.onFocus}
        aria-label="Enfocar tarea"
        title="Enfocar tarea"
        >
        <BsBullseye/>
        </span>

        <span 
        className="Icon Icon-edit"
        onClick={props.onEdit}
        aria-label="Editar tarea"
        title="Editar tarea"
        >
        <BsPencilSquare/>
        </span>

        <span 
        className="Icon Icon-delete"
        onClick={props.onDelete}
        title="Eliminar tarea"
        ><BsFillDashCircleFill/></span>
      </li>
    );
  }

export { TodoItem };
