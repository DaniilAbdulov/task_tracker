import { db } from "../db/db.js";
import { formattedEmployeesList } from "../functions/formattedEmployeesList.js";
class EmployeesController {
    async getEmployeesList(req, res) {
        try {
            const users = await db("users")
                .select(["id", "first_name", "last_name", "third_name"])
                // пользователь не может указать в качестве ответственного
                // задачи другого пользователя, который не является его
                // подчиненным;
                .where("role", "!=", "director");
            const employeesList = formattedEmployeesList(users);
            if (!users) {
                return res
                    .status(404)
                    .json({ message: "Список работников не найден" });
            }
            return res.status(200).json({ employeesList });
        } catch (error) {
            return res
                .status(500)
                .json({ message: "Непредвиденная ошибка сервера" });
        }
    }
}

export default new EmployeesController();
