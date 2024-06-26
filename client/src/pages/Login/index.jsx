import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import Header from '../../components/Header';
const rules = [
  {
    required: true,
    message: 'required',
  },
];
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await LoginUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        window.location.href = '/';
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
    <div>
      <Header />
      <div className="h-screen flex flex-col justify-center items-center bg-zinc-100">
      <div className='mb-12'>
      <h1 className="text-gray-900 text-5xl ml-4">Login with your account</h1>
      </div>
      <div className="bg-white border-solid border-5 border-gray-200 p-6 rounded w-[450px]">
        <h1>
          JOUMLA <span className="text-[#F55D00]">LOGIN</span>
        </h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Login
          </Button>
          <div className="mt-5 text-center ">
            <span className="text-gray-900 text-xl">
              Don't have an account? <Link className='uppercase' to="/Register">Register</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
    </div>
  );
};

export default Login;
