import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../store/auth";
import { tasks } from "../../store/tasks";

export const Message = observer(() => {
    const successMessage = auth.successMessage || tasks.successMessage;
    const errorMessage = auth.errorMessage || tasks.errorMessage;
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
        } else if (errorMessage) {
            toast.error(errorMessage);
        }
        if (tasks.successMessage) {
            tasks.getTasksList(1, 10);
        }
        auth.clearMessage();
        tasks.clearMessage();
    }, [successMessage, errorMessage]);
    return (
        <ToastContainer
            position="bottom-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    );
});
