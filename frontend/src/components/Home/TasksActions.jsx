import { useState } from "react";
import { TasksSort } from "./TasksSort";
import { MyDialog } from "../UI/MyDialog";
import { TaskForm } from "./TaskForm";

export const TaskActions = () => {
    const [showTaskForm, setShowTaskForm] = useState(false);
    function clickSubmit() {
        setShowTaskForm(true);
    }
    return (
        <div className="actions">
            <div className="actions__create-task">
                <button onClick={clickSubmit}>Создать задачу</button>
            </div>
            <MyDialog visible={showTaskForm} setVisible={setShowTaskForm}>
                <TaskForm setVisible={setShowTaskForm} />
            </MyDialog>
            <TasksSort className="actions__sort" />
        </div>
    );
};
