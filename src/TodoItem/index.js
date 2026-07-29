import './TodoItem.css'
import { BsFillDashCircleFill, BsCheckSquareFill, BsPencilSquare } from "react-icons/bs";

function TodoItem(props) {
    return (
      <li className="TodoItem">

        <span 
        className={`Icon Icon-check ${props.completed && 'Icon-check--active'}`}
        onClick={props.onComplete}
        >
        <BsCheckSquareFill/>
        </span> 

        <p className={`TodoItem-p ${props.completed && 'TodoItem-p--complete'}`}>{props.text}</p>

        <span 
        className="Icon Icon-edit"
        onClick={props.onEdit}
        aria-label="Editar tarea"
        >
        <BsPencilSquare/>
        </span>

        <span 
        className="Icon Icon-delete"
        onClick={props.onDelete}
        ><BsFillDashCircleFill/></span>
      </li>
    );
  }

export { TodoItem };
