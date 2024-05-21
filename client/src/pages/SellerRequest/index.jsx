import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loadersSlice';
import { RegisterRequest } from '../../apicalls/requests';
import { Button, Input, message, Form } from 'antd';

const rules = [
  {
    required: true,
    message: 'required',
  },
];
function SellerRequest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterRequest(values);
      dispatch(setLoader(false));
      if (response.success) {
        navigate('/thank-you-page');
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
    }
  }, []);
  return (
    <div className="">
      <div className="grid grid-cols-2 bg-zinc-100">
        <div className="mt-20 ml-8">
          <h1 className="text-gray-900 text-4xl">
            Complete your business information
          </h1>
          <p className="mt-5 mb-5 text-xl">
            Welcome to joumla marketplace marketplace! Signing up as a Seller is
            simple and will allow you to reach a broader audience for your
            products. Follow the steps to get started:
          </p>
          <p className="mt-5 mb-5 text-xl">
            By signing up, you will gain access to a host of features designed
            to help you manage and grow your business. Our platform offers
            robust tools for listing products, managing orders, and engaging
            with customers. We are excited to have you on board and look forward
            to helping your business thrive!
          </p>
          <div className="mt-5 mb-5 ml-20 flex text-center text-xl uppercase">
            <span className="text-gray-900 flex justify-center items-center font-medium">
              We look forward to working with{' '}
              <span className="text-[#F55D00] flex justify-center items-center font-medium ml-1">
                {' '}
                you
              </span>
            </span>
          </div>
        </div>
        <div className=" mt-5 flex justify-center items-center bg-zinc-100">
          <div className="bg-white border-solid border-5 border-gray-200 p-6 rounded w-[450px]">
            <Form
              layout="vertical"
              onFinish={onFinish}
              className="grid grid-cols-2 gap-4"
            >
              <Form.Item label="Name" name="name" rules={rules}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item label="Last name" name="last" rules={rules}>
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item label="Username" name="username" rules={rules}>
                <Input placeholder="Username" />
              </Form.Item>
              <Form.Item label="Wilaya" name="wilaya" rules={rules}>
                <Input placeholder="Wilaya" />
              </Form.Item>
              <Form.Item label="Address" name="address" rules={rules}>
                <Input placeholder="Address" />
              </Form.Item>
              <Form.Item label="Business" name="business" rules={rules}>
                <Input placeholder="Business" />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={rules}>
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item label="Mobile" name="mobile" rules={rules}>
                <Input type="number" placeholder="Mobile" />
              </Form.Item>
              <Button type="primary" htmlType="submit" block className="mt-2">
                Register
              </Button>
              <div className="mt-5 text-center ">
                <span className="text-gray-900 text-sm  ">
                  All your rights reserved
                </span>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerRequest;
