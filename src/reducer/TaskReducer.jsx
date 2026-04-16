//src/components/reducer/TaskReducer.jsx
export const Actions = {
    ADD_TASK:'Add_Task',
    DELETE_TASK:'Delete_Task',
    TOGGLE_TASK:'Toggle_Task',
    EDIT_TASK:'Edit_Task',
    SET_FILTER:'Set_Filter',
    SET_LOADING:'Set_Loading',
    DELETE_ALL: 'Delete_All'
};

const generateRandomPastelColor = () => {
    const hue = Math.floor(Math.random() * 361);
    const saturation = Math.floor(Math.random() * 30) + 70;
    const lightness = Math.floor(Math.random() * 10) + 85;
    return `hsl(${hue}deg, ${saturation}%, ${lightness}%)`;
};

export const initialState = {
    todos: [],
    filter: "all",
    isLoading: false
};

export const taskReducer = (state,action)=>{
    switch(action.type){
        case Actions.ADD_TASK:
            const newTodo ={
                id:Date.now(),
                title:action.payload.title,
                description:action.payload.description,
                completed:false,
                color: generateRandomPastelColor(),
                priority:action.payload.priority || 'medium',
                createdAt: new Date().toISOString()
            };
            return {
                ...state,
                todos :[...state.todos,newTodo]
            }
        case Actions.DELETE_TASK:
            return {
                ...state,
                todos:state.todos.filter(todo=>todo.id !== action.payload)
            }
        case Actions.TOGGLE_TASK:
            return {
                ...state,
                todos:state.todos.map((todo)=>(todo.id===action.payload ? {...todo, completed:!todo.completed} : todo))
            }
        case Actions.EDIT_TASK:
            return {
                ...state,
                todos:state.todos.map((todo)=>(todo.id === action.payload.id ? {...todo, ...action.payload.updates} : todo))
            }
        case Actions.SET_FILTER:
            return{
                ...state,
                filter:action.payload || "all"
            }
        case Actions.SET_LOADING:
            return{
                ...state,
                isLoading: action.payload
            }
        case Actions.DELETE_ALL:
            return{
                todos:[]
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)

    }
}


