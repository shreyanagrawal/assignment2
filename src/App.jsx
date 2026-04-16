import { useState } from 'react'
import './App.css'
import Todo from './components/Todo'
import { TaskDataContext } from './context/TaskContext'

function App() {

  const [isEditing,setIsEditing] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [filter,setTaskFilter] = useState('all');
  

  return (
    <TaskDataContext.Provider value={{isEditing,setIsEditing,filter,setTaskFilter,isLoading,setIsLoading}}>
      <Todo />
    </TaskDataContext.Provider>
  )
}

export default App
