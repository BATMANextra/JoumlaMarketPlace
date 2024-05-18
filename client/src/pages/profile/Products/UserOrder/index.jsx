import React from 'react';
import { Table, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useEffect } from 'react';
import { GetAllOrders } from '../../../../apicalls/orders';
import { setLoader } from '../../../../redux/loadersSlice';

function UserOrders() {
  const [orders, setOrders] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllOrders({
        buyer: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product',
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
      title: 'Seller Name',
      dataIndex: 'seller',
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Order date',
      dataIndex: 'createdAt',
      render: (text, record) => {
        return moment(text).format('MMMM Do YYYY, h:mm:ss a');
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="flex flex-col gap-5">
      <h1>My Orders</h1>
      <Table columns={columns} dataSource={orders}></Table>
    </div>
  );
}

export default UserOrders;
