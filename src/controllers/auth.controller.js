const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { createHash, isValidPassword } = require("../utils/hash");
const configObject = require("../config/env.config");
const { generarResetToken } = require("../utils/tokenReset");
const { logger } = require("../middlewares/logger.middleware");

class AuthController {
  async register(req, res) {
    const { first_name, last_name, email, password, age } = req.body;
    try {
      const userExist = await User.findOne({ email });
      if (userExist) {
        return res.render("signup", {
          userRegisterError: "El usuario ya esta registrado",
        });
      }
      const newUser = new User({
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
      });
      await newUser.save();
      const token = jwt.sign({ user: newUser }, configObject.auth.jwt_secret, {
        expiresIn: "1h",
      });
      res.cookie(configObject.auth.cookie_token, token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      res.redirect("/home");
    } catch (error) {
      logger.error(error);
      res.render("signup", { RegisterError: "Error al registrar usuario" });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const userFound = await User.findOne({ email });
      if (!userFound) {
        return res.render("login", {
          incorrectEmail: "El email no esta asociado a ningun cuenta",
        });
      }
      const isValid = isValidPassword(password, userFound);
      if (!isValid) {
        return res.render("login", {
          incorrectPassword: "Contraseña incorrecta",
        });
      }
      const token = jwt.sign(
        { user: userFound },
        configObject.auth.jwt_secret,
        { expiresIn: "1h" }
      );
      res.cookie(configObject.auth.cookie_token, token, {
        maxAge: 3600000,
        httpOnly: true,
      });
      userFound.last_connection = new Date();
      await userFound.save();
      res.redirect("/home");
    } catch (error) {
      logger.error(error);
      res.render("login", { loginError: "Error al iniciar sesion" });
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie(configObject.auth.cookie_token);
      res.redirect("/");
    } catch (error) {
      res.redirect("/404-not-found");
    }
  }
}

module.exports = AuthController;
