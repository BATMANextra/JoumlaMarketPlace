import { Table, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { useEffect } from 'react';
import moment from 'moment';
import { GetAllRequests } from '../../apicalls/requests';

function Requests() {
  const [requests, setRequests] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllRequests(null);
      dispatch(setLoader(false));
      if (response.success) {
        setRequests(response.data);
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
      title: 'Last',
      dataIndex: 'last',
    },
    {
      title: 'Username',
      dataIndex: 'username',
    },
    {
      title: 'Wilaya',
      dataIndex: 'wilaya',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Business',
      dataIndex: 'business',
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text, record) =>
        moment(record.createdAt).format('DD-MM-YY hh:mm A'),
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={column} dataSource={requests} />
    </div>
  );
}

export default Requests;
