//src/context/TaskContext.jsx
import { useState } from "react";
import { createContext } from "react";

export const TaskDataContext = createContext({
    isEditing: false,
    setIsEditing:()=>{},
    filter:'all',
    setTaskFilter:()=>{},
    isLoading:false,
    setIsLoading:()=>{}
});
