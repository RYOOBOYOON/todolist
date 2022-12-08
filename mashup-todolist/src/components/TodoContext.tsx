import React, { useReducer, createContext, useContext, useRef } from "react";

// reducer
const initialTodos = [
  {
    id: 1,
    text: "프로젝트 생성하기",
    done: true,
  },
  {
    id: 2,
    text: "컴포넌트 스타일링하기",
    done: true,
  },
  {
    id: 3,
    text: "Context 만들기",
    done: false,
  },
  {
    id: 4,
    text: "기능 구현하기",
    done: false,
  },
];
function todoReducer(state: any, action: any) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo: any) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    case "REMOVE":
      return state.filter((todo: any) => todo.id !== action.id);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// Context API
const TodoStateContext = createContext<any>(null);
const TodoDispatchContext = createContext<any>(null);
const TodoNextIdContext = createContext<any>(null);
export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

// custom hooks
export function useTodoState() {
  const context = useContext(TodoStateContext);
  //error
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  //error
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  //error
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
