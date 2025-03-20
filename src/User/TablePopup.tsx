import React from "react";
import { Table, Tag, message, Button, Space, Input, Form, Modal } from "antd";
import useUserStore from "../store/user.store";
import { User } from "../models/user.model";

const { Column, ColumnGroup } = Table;

const TablePopup: React.FC = () => {
  const { 
    users, 
    addUser, 
    editUser, 
    deleteUser, 
    editingUser, 
    deletingUser, 
    setEditingUser, 
    setDeletingUser 
  } = useUserStore();
  
  const [form] = Form.useForm(); 


  const handleAdd = (values: Omit<User, "key">) => {
    if (typeof values.tags === "string") {
      values.tags = values.tags.split(",").map(tag => tag.trim());
    }
    addUser(values);
    form.resetFields();
    message.success("Thêm thành công!");
  };


  const handleEdit = (record: User) => {
    setEditingUser(record);
    form.setFieldsValue(record);
  };

 
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (typeof values.tags === "string") {
        values.tags = values.tags.split(",").map(tag => tag.trim());
      }
      if (editingUser) {
        editUser(editingUser.key, values);
        message.success("Cập nhật thành công!");
      }
      setEditingUser(null);
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };


  const handleDelete = (record: User) => {
    setDeletingUser(record);
  };


  const handleConfirmDelete = () => {
    if (deletingUser) {
      deleteUser(deletingUser.key);
      message.success(`Đã xóa ${deletingUser.firstName} ${deletingUser.lastName}!`);
    }
    setDeletingUser(null);
  };

  return (
    <div className="p-4">
     
      <Form form={form} layout="inline" onFinish={handleAdd}>
        <Form.Item name="firstName" rules={[{ required: true, message: "Nhập First Name!" }]}>
          <Input placeholder="First Name" />
        </Form.Item>
        <Form.Item name="lastName" rules={[{ required: true, message: "Nhập Last Name!" }]}>
          <Input placeholder="Last Name" />
        </Form.Item>
        <Form.Item name="age" rules={[{ required: true, message: "Nhập Age!" }]}>
          <Input type="number" placeholder="Age" min={0} step={1} />
        </Form.Item>
        <Form.Item name="address" rules={[{ required: true, message: "Nhập Address!" }]}>
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item name="tags">
          <Input placeholder="Tags (cách nhau bằng dấu phẩy)" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>


      <Table<User> dataSource={users} rowKey="key" className="mt-4">
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags: string[]) => (
            <>
              {Array.isArray(tags) &&
                tags.map((tag) => (
                  <Tag color={tag.length > 5 ? "geekblue" : "green"} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                ))}
            </>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: User) => (
            <Space size="middle">
              <Button onClick={() => handleEdit(record)}>Edit</Button>
              <Button danger onClick={() => handleDelete(record)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>


      {editingUser && (
        <Modal
          title="Chỉnh sửa người dùng"
          open={!!editingUser}
          onOk={handleSave}
          onCancel={() => setEditingUser(null)}
          okText="Lưu"
          cancelText="Hủy"
        >
          <Form form={form} layout="vertical">
            <Form.Item name="firstName" label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name="age" label="Age">
              <Input type="number" min={0} step={1} />
            </Form.Item>
            <Form.Item name="address" label="Address">
              <Input />
            </Form.Item>
            <Form.Item name="tags" label="Tags">
              <Input placeholder="Tags (cách nhau bằng dấu phẩy)" />
            </Form.Item>
          </Form>
        </Modal>
      )}


      {deletingUser && (
        <Modal
          title="Xác nhận xóa"
          open={!!deletingUser}
          onOk={handleConfirmDelete}
          onCancel={() => setDeletingUser(null)}
          okText="Xóa"
          cancelText="Hủy"
          okType="danger"
        >
          <p>Bạn có chắc chắn muốn xóa {deletingUser.firstName} {deletingUser.lastName} không?</p>
        </Modal>
      )}
    </div>
  );
};

export default TablePopup;
