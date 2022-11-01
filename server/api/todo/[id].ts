import { db } from "~~/server/db";
import { sendError } from "h3";

export default defineEventHandler((event) => {
  const method = event.req.method;
  const context = event.context;
  const { id } = context.params;

  const findTodoById = (todoId) => {
    let index;
    const todo = db.todos.find((todo, todoIndex) => {
      if (todo.id == todoId) {
        index = todoIndex;
        return true;
      }
      return false;
    });

    if (!todo) {
      const TodoNotFoundError = createError({
        statusCode: 404,
        statusMessage: "Todo not found",
        data: {},
      });
      sendError(event, TodoNotFoundError);
    }
    return { todo, index };
  };
  if (method === "PUT") {
    const { todo, index } = findTodoById(id);
    const updateTodo = {
      ...todo,
      completed: !todo.completed,
    };
    db.todos[index] = updateTodo;
    return updateTodo;
  }

  if (method === "DELETE") {
    const { todo, index } = findTodoById(id);
    db.todos.splice(index, 1);
    return { message: "item deleted" };
  }
});
