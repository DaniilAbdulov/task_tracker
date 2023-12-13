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
                throw new Error("Ошибка получения списка работников");
            }
            setTimeout(() => {
                return res.status(200).json({ employeesList });
            }, 2000);
        } catch (error) {
            const e = error.message;
            return res.status(400).json({ message: e });
        }
    }
}

export default new EmployeesController();
