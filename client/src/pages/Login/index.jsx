import React, { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
const rules = [
  {
    required: true,
    message: 'required',
  },
];
const Login = () => {
  const onFinish = async (values) => {
    try {
      const response = await LoginUser(values);
      if (response.success) {
        message.success(response.message);
        localStorage.setItem('token', response.data);
        window.location.href = '/';
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/';
    }
  }, []);
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-zinc-200 p-6 rounded w-[450px]">
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
          <div className="mt-5 text-center">
            <span className="text-[#F55D00]">
              Don't have an account? <Link to="/Register">Register</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
