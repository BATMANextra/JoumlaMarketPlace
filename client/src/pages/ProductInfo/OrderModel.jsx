import { Form, Input, Modal, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { RegisterOrder } from '../../apicalls/orders';
import { AddNotification } from '../../apicalls/notification';

function OrderModel({ newOrder, setNewOrder, product, reloadData }) {
  const { user } = useSelector((state) => state.users);
  const formRef = React.useRef(null);
  const rules = [{ required: true, message: 'Required' }];
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterOrder({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(setLoader(false));
      if (response.success) {
        message.success('Order added successfully');
        // sent a notification to seller
        await AddNotification({
          title: 'New Order',
          order: `A new order has been placed on your product ${product.name} by ${user.name}`,
          user: product.seller._id,
          onClick: `/profile`,
          read: false,
        });
        reloadData();
        setNewOrder(false);
      } else {
        new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoader(false));
    }
  };
  return (
    <Modal
      onCancel={() => setNewOrder(false)}
      open={newOrder}
      centered
      width={1000}
      okText="Order now"
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-center">Place your Order</h1>
        <Form
          layout="vertical"
          className="grid grid-cols-2 gap-3"
          ref={formRef}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Last name" name="last" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Wilaya" name="wilaya" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Adress" name="address" rules={rules}>
            <Input />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
          <Form.Item label="Quantity" name="quantity" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default OrderModel;
