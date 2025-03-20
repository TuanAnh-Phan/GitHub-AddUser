import React from "react";
import {  MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu, Button, Space } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "sub1",
    icon: <MailOutlined />,
    label: "Menu",
    children: [
      {
        key: "1-1",
        label: "Item 1",
        type: "group",
        children: [
          { key: "1", label: "User" },
          { key: "2", label: "Product" },
        ],
      },
    ],
  },
];

const onClick: MenuProps["onClick"] = (e) => {
  console.log("click", e);
};

const App: React.FC = () => (
  <div style={{ width: 256 }}>
    {/* Thêm hai button */}
    <Space style={{ marginBottom: 16 }}>
      <Button type="primary">User</Button>
      <Button type="default">Product</Button>
    </Space>

    {/* Menu */}
    <Menu onClick={onClick} mode="vertical" items={items} />
  </div>
);

export default App;
