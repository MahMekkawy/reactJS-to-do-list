// Libraries
import { v4 as uuidv4 } from "uuid";

export default function s(currentState, action) {
  switch (action.type) {
    case "add": {
      const newTask = {
        id: uuidv4(),
        title: action.paylod.title,
        details: "",
        isCompleted: false,
      };

      const storageTodos = [...currentState, newTask];

      localStorage.setItem("todos", JSON.stringify(storageTodos));

      return storageTodos;
    }

    case "delete": {
      const updatedTodos = currentState.filter((t) => {
        return t.id != action.paylod.id;
      });

      localStorage.setItem("todos", JSON.stringify(updatedTodos));

      return updatedTodos;
    }

    case "update": {
      const editedTodo = currentState.map((t) => {
        if (t.id == action.paylod.id) {
          return {
            ...action.paylod,
            title: action.paylod.title,
            details: action.paylod.details,
          };
        } else {
          return t;
        }
      });

      localStorage.setItem("todos", JSON.stringify(editedTodo));

      return editedTodo;
    }

    case "storage": {
      const todosStorage = JSON.parse(localStorage.getItem("todos")) ?? [];
      return todosStorage;
    }

    case "complete": {
      const newTodos = currentState.map((t) => {
        if (t.id == action.payload.id) {
          const newTodo = { ...t, isCompleted: !t.isCompleted };
          return newTodo;
        }

        return t;
      });

      localStorage.setItem("todos", JSON.stringify(newTodos));

      return newTodos;
    }

    default: {
      throw Error("Wrong Action Type: " + action.type);
    }
  }
}
