import bcrypt from "bcrypt";
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
            // const findUser = await pool.query(
            //     "SELECT * FROM users WHERE nickname = $1",
            //     [nickName]
            // );
            // if (!findUser.rowCount) {
            //     res.status(404).json({ message: "Нет такого пользователя" });
            //     return;
            // }
            // const user = findUser.rows[0];
            // let comparePassword = bcrypt.compareSync(password, user.password);
            // if (!comparePassword) {
            //     res.status(404).json({ message: "Неверный пароль" });
            //     return;
            // }
            // const token = generateJwt(user.id, user.email, user.role);
            const user = {
                id: 1,
                full_name: "Хусаинов Ильдар Борисович",
                role: "director",
            };

            const token = generateJwt(user.id, login, user.role);
            setTimeout(() => {
                // return res.status(404).json({ message: "Неверный логин" });
                return res.json({ token, user });
            }, 2000);
        } catch (error) {
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
            return;
        }
    }
    async check(req, res) {
        const { login, role } = req.user;
        // const findUser = await pool.query("SELECT * FROM users WHERE id = $1", [
        //     req.user.id,
        // ]);
        // if (!findUser.rowCount) {
        //     return res.status(404).json({ message: "Проблема с токеном" });
        // }
        // const user = findUser.rows[0];
        const user = {
            id: 1,
            full_name: "Хусаинов Ильдар Борисович",
            role: "employee",
        };

        const token = generateJwt(user.id, login, user.role);
        setTimeout(() => {
            return res.json({ token, user });
        }, 2000);
    }
}

export default new UserController();
