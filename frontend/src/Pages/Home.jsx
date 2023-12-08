import { TaskActions } from "../components/Home/TasksActions";
import { TasksList } from "../components/Home/TasksList";

export const Home = () => {
    return (
        <>
            <TaskActions />
            <TasksList />
        </>
    );
};
