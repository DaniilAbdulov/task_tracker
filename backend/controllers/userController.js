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
            console.log(req.body);
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
                login,
                password,
                role: "employee",
            };
            res.status(404).json({ message: "Неверный пароль" });
            return;
            const token = generateJwt(1, login, "employee");
            setTimeout(() => {
                return res.json({ token, user });
            }, 2000);
        } catch (error) {
            res.status(500).json({ message: "Внутренняя ошибка сервера" });
            return;
        }
    }
    async check(req, res) {
        console.log("here");
        // const findUser = await pool.query("SELECT * FROM users WHERE id = $1", [
        //     req.user.id,
        // ]);
        // if (!findUser.rowCount) {
        //     return res.status(404).json({ message: "Проблема с токеном" });
        // }
        // const user = findUser.rows[0];
        // const token = generateJwt(user.id, user.email, user.role);
        // setTimeout(() => {
        //     return res.json({ token, user });
        // }, 1000);
    }
}

export default new UserController();
