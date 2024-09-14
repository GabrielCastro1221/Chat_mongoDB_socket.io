const userModel = require("../models/user.model");

class UserController {
  getUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      if (!users) {
        res
          .status(404)
          .json({ status: false, message: "Usuarios no encontrados" });
      }
      res.status(200).json({ status: true, usuarios: users });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Error al obtener los usuarios" });
    }
  };

  getUser = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.uid);
      if (!user) {
        res
          .status(404)
          .json({ status: false, message: "usuario no encontrado" });
      }
      res.status(200).json({ status: true, user: user });
    } catch (err) {
      res
        .status(500)
        .json({ status: false, message: "Error al obtener el usuario" });
    }
  };

  updateUser = async (req, res) => {
    try {
      const id = req.params.uid;
      const userUpdate = req.body;
      const update = await userModel.findByIdAndUpdate(id, userUpdate);
      if (!update) {
        res
          .status(404)
          .json({ status: false, message: "Usuario no encontrado" });
      }
      res.status(200).json({ status: true, usuario_actualizado: update });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error al actualizar el usuario" });
    }
  };

  deleteUser = async (req, res) => {
    const userId = req.params.uid;
    try {
      let user = await userModel.findByIdAndDelete(userId);
      if (!user) {
        res
          .status(404)
          .json({ status: false, message: "Usuario no encontrado" });
      }
      res.status(200).json({ status: true, Usuario_eliminado: user });
    } catch (error) {
      res
        .status(500)
        .json({ status: false, message: "Error al eliminar el usuario" });
    }
  };
}

module.exports = UserController;
