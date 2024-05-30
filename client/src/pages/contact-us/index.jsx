import { Button, Form, Input, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoader } from '../../redux/loadersSlice';
import { RegisterMessage } from '../../apicalls/contact';

const rules = [
  {
    required: true,
    message: 'required',
  },
];
function Contact() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterMessage(values);
      dispatch(setLoader(false));
      if (response.success) {
        navigate('/');
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
    <div className='flex justify-center items-center'>
      <div className="py-20 bg-gray-100  w-[650px] text-white">
        <div className="container mx-auto text-center justify-center items-center ">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Us</h2>
          <p className="mb-4 text-gray-900">Have questions? Reach out to us at any time.</p>
          <Form
            className="max-w-lg mx-auto"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item name="name" rules={rules}>
              <Input
                placeholder="Your Name"
                className="w-full p-2 mb-4 rounded-full focus-within:bg-gray-100 placeholder:text-gray-800 focus-within:placeholder:text-gray-400"
              />
            </Form.Item>
            <Form.Item name="email" rules={rules}>
              <Input
                placeholder="Your Email"
                className="w-full p-2 mb-4 rounded-full focus-within:bg-gray-100 placeholder:text-gray-800 focus-within:placeholder:text-gray-400"
              />
            </Form.Item>
            <Form.Item name="message" rules={rules}>
              <Input.TextArea
                placeholder="Your Message"
                className="w-full p-2 mb-4 rounded-full focus-within:bg-gray-100 placeholder:text-gray-800 focus-within:placeholder:text-gray-400"
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
    </div>
  );
}

export default Contact;
