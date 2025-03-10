import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import Popup from './User/TablePopup';

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
      <div className='h-screen flex justify-center items-center'>
        <div className='w-[36rem] rounded-lg bg-gray-500 p-12 flex '>
        <img 
      src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" 
      className="w-32 rounded-full border-[11px] self-start"
      alt="" />

      <div>
        <p>< svg xmlns="http://www.w3.org/2000/svg"
         fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
          stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" 
         d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
        </svg>
        Click de them user</p>
      </div>

      <div className=' flex-wrap'>
      <Button type="primary" onClick={showModal}>
        Them User 
      </Button>
      </div> 
        </div>
      </div>
      <Modal title="Danh sach User" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Popup/>
      </Modal>
    </>
  );
};

export default App;