import React from "react";
import {  Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from "antd";
import { MailOutlined } from "@ant-design/icons";
import TablePopup from "./User/TablePopup";
import Product from "./Product/Product";

const App: React.FC = () => {
  return (
    <>
      <MainLayout />
      <Routes>
        <Route path="/TablePopup" element={<TablePopup />} />
        <Route path="/Product" element={<Product />} />
      </Routes>
    </>
    
  );
};

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const onClick = (e: any) => {
    console.log("click", e);
    navigate(e.key); 
  };

  const items = [
    {
      key: "sub1",
      icon: <MailOutlined />,
      label: "Menu",
      children: [
        { key: "/TablePopup", label: "User" },
        { key: "/Product", label: "Product" },
      ],
    },
  ];

  return (
    <div style={{ width: 256 }}>
      <Menu onClick={onClick} mode="vertical" items={items} />
    </div>
  );
};

export default App;
