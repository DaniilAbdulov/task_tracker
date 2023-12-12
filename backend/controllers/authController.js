import bcrypt from "bcrypt";
import { db } from "../db/db.js";
import jwt from "jsonwebtoken";
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
                throw new Error("Введены некорректные данные");
            }
            const findUser = await db("users").where("login", login).first();
            if (!findUser) {
                res.status(404).json({ message: "Нет такого пользователя" });
                return;
            }
            const candidate = await db("users")
                .select(
                    "*",
                    db.raw(
                        "CONCAT(first_name, ' ', last_name, ' ', COALESCE(third_name,'')) AS full_name"
                    )
                )
                .where("login", login)
                .first();
            let comparePassword = bcrypt.compareSync(
                password,
                candidate.password
            );
            if (!comparePassword) {
                res.status(404).json({ message: "Неверный пароль" });
                return;
            }
            const token = generateJwt(
                candidate.id,
                candidate.login,
                candidate.role
            );
            const user = {
                id: candidate.id,
                full_name: candidate.full_name,
                role: candidate.role,
            };
            setTimeout(() => {
                return res.json({ token, user });
            }, 2000);
        } catch (error) {
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
            return;
        }
    }
    async check(req, res) {
        try {
            const { id } = req.user;
            if (id <= 0) {
                throw new Error("Некорректные данные");
            }
            const currentUser = await db("users")
                .select(
                    "*",
                    db.raw(
                        "CONCAT(first_name, ' ', last_name, ' ', COALESCE(third_name,'')) AS full_name"
                    )
                )
                .where("id", id)
                .first();
            if (!currentUser) {
                throw new Error(
                    "Ошибка получения данных авторизованного пользователя"
                );
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
            setTimeout(() => {
                return res.json({ token, user });
            }, 2000);
        } catch (error) {
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
            return;
        }
    }
}

export default new UserController();
