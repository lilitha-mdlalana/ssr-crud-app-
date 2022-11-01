import { db } from "~~/server/db";
import { v4 as uuid } from "uuid";
import { sendError } from "h3";



export default defineEventHandler(async (event) => {
  const method = event.req.method;
  if (method === "GET") {
    return db.todos;
  }

  if (method === "POST") {
    const body = await useBody(event);
    if (!body.item) {
      const TodoNotFoundError = createError({
        statusCode: 400,
        statusMessage: "No item provided",
        data: {},
      });
      sendError(event, TodoNotFoundError);
    }
    const newTodo: Todo = {
      id: uuid(),
      item: body.item,
      completed: false,
    };

    db.todos.push(newTodo);
    return newTodo;
  }
});
