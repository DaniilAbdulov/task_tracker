import { TaskItem } from "./TaskItem";
import { tasks } from "../../data/tasks";
import { MyDialog } from "../UI/MyDialog";
import { TaskForm } from "./TaskForm";
import { useState } from "react";
export const TasksList = () => {
    const [showTaskForm, setShowTaskForm] = useState(true);
    function clickSubmit(id) {
        console.log(id);
        setShowTaskForm(true);
    }
    return (
        <ul className="tasks__list">
            {tasks.map((task) => {
                return (
                    <li key={task.id} onClick={() => clickSubmit(task.id)}>
                        <TaskItem t={task} />
                    </li>
                );
            })}
            <MyDialog visible={showTaskForm} setVisible={setShowTaskForm}>
                <TaskForm setVisible={setShowTaskForm} />
            </MyDialog>
        </ul>
    );
};
