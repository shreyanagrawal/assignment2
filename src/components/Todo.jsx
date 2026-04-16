//src/components/Todo.jsx
import { useState } from "react";
import { useReducer } from "react";
import { Actions, initialState, taskReducer } from "../reducer/TaskReducer";
import { useContext } from "react";
import Todocard from "./TodoCard";
import '../styles/todo.css'
import { useEffect } from "react";
import { TaskDataContext } from "../context/TaskContext";

const Todo = () => {
    const {isEditing, setIsEditing, isLoading, setIsLoading, filter, setTaskFilter} = useContext(TaskDataContext);
   
    const initialData = {
        id:null,
        title:"",
        description:"",
        priority:"medium"
    }
    const [formData,setFormData] = useState(initialData);
     useEffect(()=>{
    },[formData]);

    const handleSubmit = (e)=>{
        e.preventDefault();
        isEditing ? editTask(formData.id,formData) : addTask(formData);
        setIsEditing(false);
        setFormData(initialData);
    }

    

    const [state,dispatch] = useReducer(taskReducer,initialState)
    const addTask=(taskData)=>{
        dispatch({type:Actions.ADD_TASK,payload:taskData})
    }
    const deleteTask=(taskId)=>{
        dispatch({type:Actions.DELETE_TASK,payload:taskId})
    }
    const toggleTask=(taskId)=>{
        dispatch({type:Actions.TOGGLE_TASK,payload:taskId})
    }
    const editTask=(taskId, updates)=>{
        dispatch({type:Actions.EDIT_TASK,payload:{id:taskId, updates}})
    }
    const setFilter=(filter)=>{
        dispatch({type:Actions.SET_FILTER,payload:filter})
    }
    const setLoading=(loading)=>{
        dispatch({type:Actions.SET_LOADING,payload:loading})
    }
    const deleteAll = ()=>{
        dispatch({type:Actions.DELETE_ALL})
        dispatch({type:Actions.SET_FILTER,payload:'all'})
    }

    const filteredTasks = state.todos.filter((task)=>{
        const matchesFilter = state.filter === "all" ||
        (state.filter === "completed" && task.completed) ||
        (state.filter==="pending" && !task.completed)
        return matchesFilter 
    });

    const taskStats = {
        total:state.todos.length,
        completed:state.todos.filter(task=>task.completed).length,
        pending:state.todos.filter(task=>!task.completed).length
    }
    const value ={
        tasks: filteredTasks,
        filter:state.filter,
        isLoading:state.isLoading,
        taskStats,

        addTask, deleteTask, toggleTask, editTask, setFilter, setLoading, deleteAll
    };

    const handleEdit =(id)=>{
        setIsEditing(true);
        const filteredTodo = state.todos.find(todo=>todo.id == id);
        setFormData(prev=>({...prev, id: id, title: filteredTodo.title, description: filteredTodo.description,priority: filteredTodo.priority}))
        return false;
    }

  return (
    <>
        <div className="header">
            <h2>My To-do List</h2>
        </div>
        <div className="action-section">
            <div className="filters">
                <button onClick={()=>setFilter('all')} className={state.filter === 'all'?'active':''}>All</button>
                <button onClick={()=>setFilter('completed')} className={state.filter === 'completed'?'active':''}>Completed</button>
                <button onClick={()=>setFilter('pending')} className={state.filter === 'pending'?'active':''}>Pending</button>
            </div>
            <button className="delete-all" onClick={deleteAll} disabled={filteredTasks.length == 0}>Delete All</button>
        </div>
        <div className="stats">
            <p>Total tasks = {taskStats.total}</p>
            <p>Completed tasks = {taskStats.completed}</p>
            <p>Pending tasks = {taskStats.pending}</p>
        </div>
        <div className="todo-container">
        <div className="sidebar">
            <form onSubmit={handleSubmit}>
                <input type="text" className="title" id="title" value={formData.title} placeholder="Enter task title..." onChange={(e)=>setFormData({...formData, title:e.target.value})}/>
                <textarea className="description" id="description" value={formData.description} placeholder="Enter task description..." onChange={(e)=>setFormData({...formData, description:e.target.value})}/>
                <select id="priority" value={formData.priority} onChange={(e)=>setFormData({...formData, priority:e.target.value})}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <button type="submit" disabled={formData.title.trim()==''}>Add Task</button>
            </form>
        </div>
        <div className="main">
            
            {filteredTasks.map((todo)=>(
                <Todocard key={todo.id} id={todo.id} title={todo.title} color={todo.color} description={todo.description} completed={todo.completed} priority={todo.priority} editTask={()=>handleEdit(todo.id)} removeList={()=>deleteTask(todo.id)} toggleCheck={()=>toggleTask(todo.id)}/>
            ))}
        </div>
    </div>
    </>
    
    
  )
}

export default Todo
