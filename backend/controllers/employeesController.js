import { employeesList } from "../data/employeesList.js";
class EmployeesController {
    async getEmployeesList(req, res) {
        try {
            setTimeout(() => {
                return res.status(200).json({ employeesList });
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
}

export default new EmployeesController();
