import React from "react";
import { Modal } from "antd";

interface ConfirmDeleteProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  name: string;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({ visible, onConfirm, onCancel, name }) => {
  return (
    <Modal
      title="Xác nhận xóa"
      open={visible}
      onOk={onConfirm}
      onCancel={onCancel}
      okText="Xóa"
      cancelText="Hủy"
      okType="danger"
    >
      <p>Bạn có chắc chắn muốn xóa {name} không?</p>
    </Modal>
  );
};

export default ConfirmDelete;
