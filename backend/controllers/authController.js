import bcrypt from "bcrypt";
import { db } from "../db/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

class UserController {
  async login(req, res) {
    try {
      const { login, password } = req.body;

      if (!login || !password) {
        return res.status(422).json({ message: "Введены некорректные данные" });
      }

      const findUser = await db("users").where("login", login).first();
      //             При неуспешной попытке авторизации отобразите на странице
      // одну из возможных ошибок: пользователя с таким логином не
      // существует
      if (!findUser) {
        return res.status(404).json({ message: "Нет такого пользователя" });
      }
      const candidate = await db("users")
        .select(
          "*",
          db.raw(
            "CONCAT(last_name, ' ', first_name, ' ', COALESCE(third_name,'')) AS full_name"
          )
        )
        .where("login", login)
        .first();
      let comparePassword = bcrypt.compareSync(password, candidate.password);
      //.., пользователь ввел неверный пароль.
      if (!comparePassword) {
        return res.status(404).json({ message: "Неверный пароль" });
      }
      const token = generateJwt(candidate.id, candidate.login, candidate.role);
      const user = {
        id: candidate.id,
        full_name: candidate.full_name,
        role: candidate.role,
      };
      return res.json({ token, user });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Непредвиденная ошибка сервера" });
    }
  }
  async check(req, res) {
    try {
      const { id } = req.user;
      if (id <= 0) {
        return res.status(422).json({ message: "Некорректные данные" });
      }
      const currentUser = await db("users")
        .select(
          "*",
          db.raw(
            "CONCAT(last_name, ' ', first_name, ' ', COALESCE(third_name,'')) AS full_name"
          )
        )
        .where("id", id)
        .first();
      if (!currentUser) {
        return res.status(400).json({
          message: "Ошибка получения данных об авторизованном пользователе",
        });
      }
      const token = generateJwt(
        currentUser.id,
        currentUser.login,
        currentUser.role
      );
      const user = {
        id: currentUser.id,
        full_name: currentUser.full_name,
        role: currentUser.role,
      };
      return res.json({ token, user });
    } catch (error) {
      return res.status(500).json({ message: "Непредвиденная ошибка сервера" });
    }
  }
}

export default new UserController();
