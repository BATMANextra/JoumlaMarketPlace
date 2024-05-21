import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../redux/loadersSlice';
import { RegisterMessage } from '../apicalls/contact';

const rules = [
  {
    required: true,
    message: 'required',
  },
];
function Footer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterMessage(values);
      dispatch(setLoader(false));
      if (response.success) {
        setTimeout();
        navigate('/landing');
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
        <p className="mb-4">Have questions? Reach out to us at any time.</p>
        <Form
          className="max-w-lg mx-auto"
          layout="vertical"
          onFinish={onFinish}
        >
          <Form.Item name="name" rules={rules}>
            <Input
              placeholder="Your Name"
              className="w-full p-2 mb-4 rounded-full"
            />
          </Form.Item>
          <Form.Item name="email" rules={rules}>
            <Input
              placeholder="Your Email"
              className="w-full p-2 mb-4 rounded-full"
            />
          </Form.Item>
          <Form.Item name="message" rules={rules}>
            <Input.TextArea
              placeholder="Your Message"
              className="w-full p-2 mb-4 rounded-full"
              rows="40"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className=" py-2 px-4 rounded"
          >
            Send Message
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Footer;
