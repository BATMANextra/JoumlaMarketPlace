import React from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { RegisterOrder } from '../../apicalls/orders';
import { GetProductById } from '../../apicalls/products';
import moment from 'moment';
const rules = [
  {
    required: true,
    message: 'required',
  },
];
const Purchase = () => {
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterOrder(values);
      navigate('/');
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div className="h-screen flex justify-center items-center">
        <div className="bg-zinc-200 p-6 rounded w-[450px]">
          <h1>
            JOUMLA <span className="text-[#F55D00]">RIGISTER</span>
          </h1>
          <img
            src={product.images[selectedImageIndex]}
            alt=""
            className="w-full h-96 object-cover rounded-md cursor-pointer"
          />
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={rules}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Address" name="address" rules={rules}>
              <Input placeholder="Address" />
            </Form.Item>
            <Form.Item label="Phone" name="phone" rules={rules}>
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={rules}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Quantity" name="quantity" rules={rules}>
              <Input type="number" placeholder="Quantity" />
            </Form.Item>

            <Button type="primary" htmlType="submit" block className="mt-2">
              Order now
            </Button>
            <div className="mt-5 text-center">
              <span className="text-[#F55D00]">
                Already have an account? <Link to="/Login">Login</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    )
  );
};

export default Purchase;
