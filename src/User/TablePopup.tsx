import React, { useState } from "react";
import { Table, Tag, message, Button, Space, Input, Form } from "antd";
import ConfirmDelete from "./ConfirmDelete";

const { Column, ColumnGroup } = Table;

interface DataType {
  key: React.Key;
  firstName: string;
  lastName: string;
  age: number;
  address: string;
  tags: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState<React.Key | null>(null);
  const [deleteRecord, setDeleteRecord] = useState<DataType | null>(null);

  const handleAdd = (values: any) => {
    const age = Number(values.age);
    if (!Number.isInteger(age) || age < 0) {
      message.error("Tuổi phải là số nguyên không âm!");
      return;
    }

    const newData: DataType = {
      key: Date.now(),
      firstName: values.firstName,
      lastName: values.lastName,
      age,
      address: values.address,
      tags: values.tags ? values.tags.split(",").map((tag: string) => tag.trim()) : [],
    };

    setData([...data, newData]);
    form.resetFields();
    message.success("Thêm thành công!");
  };

  const handleEdit = (record: DataType) => {
    setEditingKey(record.key);
    form.setFieldsValue(record);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const age = Number(values.age);
      if (!Number.isInteger(age) || age < 0) {
        message.error("Tuổi phải là số nguyên không âm!");
        return;
      }

      setData((prevData) =>
        prevData.map((item) => (item.key === editingKey ? { ...item, ...values } : item))
      );
      setEditingKey(null);
      message.success("Cập nhật thành công!");
    } catch (error) {
      console.log("Validate Failed:", error);
    }
  };

  const handleConfirmDelete = () => {
    if (deleteRecord) {
      setData((prevData) => prevData.filter((item) => item.key !== deleteRecord.key));
      message.success(`Đã xóa ${deleteRecord.firstName} ${deleteRecord.lastName}!`);
    }
    setDeleteRecord(null);
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
        <Form.Item
          name="age"
          rules={[{ required: true, message: "Nhập Age!" }]}
        >
          <Input type="number" placeholder="Age" min={0} step={1} />
        </Form.Item>
        <Form.Item name="address" rules={[{ required: true, message: "Nhập Address!" }]}>
          <Input placeholder="Address" />
        </Form.Item>
        <Form.Item name="tags">
          <Input placeholder="Tags" />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Thêm
        </Button>
      </Form>

      {editingKey !== null && (
        <div className="mt-4">
          <h3>Chỉnh sửa</h3>
          <Form form={form} layout="inline">
            <Form.Item name="firstName">
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item name="lastName">
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item name="age">
              <Input type="number" placeholder="Age" min={0} step={1} />
            </Form.Item>
            <Form.Item name="address">
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item name="tags">
              <Input placeholder="Tags (cách nhau bằng dấu phẩy)" />
            </Form.Item>
            <Button type="primary" onClick={handleSave}>
              Lưu
            </Button>
            <Button onClick={() => setEditingKey(null)} className="ml-2">
              Hủy
            </Button>
          </Form>
        </div>
      )}

      <Table<DataType> dataSource={data} rowKey="key" className="mt-4">
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
              {tags.map((tag) => (
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
          render={(_: any, record: DataType) => (
            <Space size="middle">
              <Button onClick={() => handleEdit(record)}>Edit</Button>
              <Button danger onClick={() => setDeleteRecord(record)}>
                Delete
              </Button>
            </Space>
          )}
        />
      </Table>

      {deleteRecord && (
        <ConfirmDelete
          visible={!!deleteRecord}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteRecord(null)}
          name={`${deleteRecord.firstName} ${deleteRecord.lastName}`}
        />
      )}
    </div>
  );
};

export default App;
