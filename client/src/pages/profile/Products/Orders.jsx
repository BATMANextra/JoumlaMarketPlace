import React from 'react';
import { Modal, Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../redux/loadersSlice';
import { GetAllOrders } from '../../../apicalls/orders';
import moment from 'moment';
import { useEffect } from 'react';
function Orders({ showOrderModal, setShowOrderModal, selectedProudct }) {
  const [orders, setOrders] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllOrders({
        product: selectedProudct._id,
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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last',
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
      title: 'Mobile',
      dataIndex: 'mobile',
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
    if (selectedProudct) {
      getData();
    }
  }, [selectedProudct]);
  return (
    <Modal
      title="Orders"
      open={showOrderModal}
      onCancel={() => setShowOrderModal(false)}
      centered
      width={1300}
      footer={null}
    >
      <div className="flex flex-col gap-5">
      <h1 className="">Product Name : {selectedProudct.name}</h1>
      <Table columns={columns} dataSource={orders}></Table>
      </div>
    </Modal>
  );
}

export default Orders;
