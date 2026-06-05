const { Router } = require("express");
const todosController = require("../controllers/todosController");

const todosRoutes = Router();

todosRoutes.get("/list", todosController.getTodos);
todosRoutes.post("/add", todosController.addTodo);
todosRoutes.delete("/delete", todosController.deleteTodo);
todosRoutes.patch("/update", todosController.updateTodo);

module.exports = todosRoutes;
