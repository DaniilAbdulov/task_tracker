import { Modal } from "antd";
const ModalWindow = ({ visible, setVisible }) => {
    const handleOk = () => {
        setVisible(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    console.log(visible);
    return (
        <div className="modal-window">
            <Modal
                title="Basic Modal"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Modal</p>
            </Modal>
        </div>
    );
};
export default ModalWindow;
