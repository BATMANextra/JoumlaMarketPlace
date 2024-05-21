import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { GetAllMessages } from '../../apicalls/contact';
import { Table, message } from 'antd';

function Messages() {
  const [messages, setMessagess] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllMessages(null);
      dispatch(setLoader(false));
      if (response.success) {
        setMessagess(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Message',
      dataIndex: 'message',
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={column} dataSource={messages} />
    </div>
  );
}

export default Messages;
