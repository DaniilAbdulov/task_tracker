import { Modal } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { tasks } from "../store/tasks";

const ModalWindow = observer(({ visible, setVisible, children }) => {
    const formHasEdited = tasks.successMessage || tasks.errorMessage;
    //если форма была изменена то закрываем окно
    useEffect(() => {
        if (formHasEdited) {
            setVisible(false);
        }
    }, [formHasEdited, setVisible]);
    return (
        <div className="modal-window">
            <Modal
                closeIcon={false}
                centered
                width={600}
                title=""
                footer={null}
                open={visible}
                onCancel={() => setVisible(false)}
            >
                {children}
            </Modal>
        </div>
    );
});
export default ModalWindow;
