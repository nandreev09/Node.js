const TodosModel = require("../models/TodosModels");

class TodosController {
  async getTodos(req, res) {
    try {
      const result = await TodosModel.find({}, "title");

      return res.status(200).json({
        todos: result,
      });
    } catch (e) {
      return res.status(400).json({
        message: "Произошла ошибка при получении",
      });
    }
  }

  async addTodo(req, res) {
    try {
      if (!req.body.title) {
        return res
          .status(400)
          .json({ message: "Пожалуйста, добавьте заголовок" });
      }

      const todoModel = new TodosModel({ title: req.body.title });

      await todoModel.save();

      return res.status(200).json({ message: "Элемент успешно добавлен" });
    } catch (e) {
      return res
        .status(400)
        .json({ message: "Произошла ошибка при добавлении" });
    }
  }

  async deleteTodo(req, res) {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({
          message: "Необходимо передать id",
        });
      }

      const deletedTodo = await TodosModel.findByIdAndDelete(id);

      if (!deletedTodo) {
        return res.status(404).json({
          message: "Задача не найдена",
        });
      }

      return res.status(200).json({
        message: "Элемент успешно удален",
      });
    } catch (e) {
      return res.status(500).json({
        message: "Произошла ошибка при удалении",
      });
    }
  }

  async updateTodo(req, res) {
    try {
      const { id, title } = req.body;

      if (!id || !title) {
        return res.status(400).json({
          message: "Необходимо передать id и title",
        });
      }

      const updatedTodo = await TodosModel.findByIdAndUpdate(
        id,
        { title },
        { new: true }
      );

      if (!updatedTodo) {
        return res.status(404).json({
          message: "Задача не найдена",
        });
      }

      return res.status(200).json({
        message: "Элемент успешно отредактирован",
        todo: updatedTodo,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Произошла ошибка при редактировании",
      });
    }
  }
}

module.exports = new TodosController();
