import { Modal } from "antd";

const ModalWindow = ({ visible, setVisible, children }) => {
    return (
        <div className="modal-window">
            <Modal
                title=""
                footer={null}
                open={visible}
                onCancel={() => setVisible(false)}
            >
                {children}
            </Modal>
        </div>
    );
};
export default ModalWindow;
