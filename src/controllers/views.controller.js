class ViewsManager {
  async home(req, res) {
    try {
      res.render("home");
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error al renderizar la pagina principal",
      });
    }
  }

  async login(req, res) {
    try {
      res.render("login");
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error al renderizar la pagina de inicio de sesion",
      });
    }
  }

  async register(req, res) {
    try {
      res.render("signup");
    } catch (error) {
      res.status(500).json({
        status: false,
        message: "Error al renderizar la pagina de registro",
      });
    }
  }
}

module.exports = ViewsManager;
