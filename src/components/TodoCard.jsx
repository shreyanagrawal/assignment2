//src/components/TodoCard.jsx

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons' 
function Todocard({ title, color, completed, description, priority, removeList, editTask, toggleCheck }) {


  const priorityColors = {
    high:"#ff4757",
    low: "#26de81",
    medium:"#ffa502"
  }

  return (
    <blockquote className={`note ${completed ? "checked" : ""}`} style={{ backgroundColor: color }}><span className="edit" onClick={editTask}><FontAwesomeIcon icon={faPen}/></span><span className="close" onClick={removeList}>×</span>
      <p onClick={toggleCheck} style={{marginBottom: "0px", marginTop:"0px"}}>
        <span className="title">{title}</span>
        <span className="description">{description}</span>
        <small className="priority" style={{backgroundColor: priorityColors[priority] || "#ddd"}}>{priority}</small>
      </p>
      
    </blockquote>
  );
}

export default Todocard;
