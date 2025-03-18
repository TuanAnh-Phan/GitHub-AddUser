import React, { useState } from "react";
import { Button, Modal } from "antd";
import Popup from "./User/TablePopup";



const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <div className="w-[36rem] rounded-lg bg-gray-500 p-12 flex items-center">
          <img
            src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
            className="w-32 rounded-full border-[11px] self-start"
            alt=""
          />

          <div className="flex flex-col items-center justify-center flex-1 ml-6">
            <p className="text-white text-lg flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                />
              </svg>
              Click để thêm user
            </p>

            <Button type="primary" onClick={showModal} className="mt-4">
              Thêm User
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Danh sách User"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Popup />
      </Modal>
    </>
  );
};

export default App;
