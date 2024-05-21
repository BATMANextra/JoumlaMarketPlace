import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import Header from '../../components/Header';

const rules = [
  {
    required: true,
    message: 'required',
  },
];
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        navigate('/login');
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
      navigate('/');
    }
  }, []);
  return (
    <div className="">
      <Header />
      <div className="grid grid-cols-2 bg-zinc-100">
        <div className="mt-20 ml-8">
          <h1 className="text-gray-900 text-5xl ml-4">Register your account</h1>
          <div className="mt-5 mb-5 ml-20 flex text-center text-xl uppercase">
            <span className="text-gray-900 flex justify-center items-center font-medium">
              Already have an account?{' '}
              <Link className="text-[#F55D00] no-underline ml-3 " to="/Login">
                Login
              </Link>
            </span>
          </div>
        </div>
        <div className=" mt-5 flex justify-center items-center bg-zinc-100">
      <div className="bg-white border-solid border-5 border-gray-200 p-6 rounded w-[450px]">
       
        <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name" rules={rules}>
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item label="Last name" name="last" rules={rules}>
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item label="Username" name="username" rules={rules}>
              <Input placeholder="Username" />
            </Form.Item>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Mobile" name="mobile" rules={rules}>
              <Input type="number" placeholder="Mobile" />
            </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center ">
            <span className="text-gray-900 text-xl uppercase ">
              already have an account? <Link className='uppercase' to="/login">Login</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
      </div>
    </div>
  );
};

export default Register;
