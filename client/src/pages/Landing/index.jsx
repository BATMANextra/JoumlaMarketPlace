import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { RegisterMessage } from '../../apicalls/contact';
import Footer from '../../components/Footer';

const rules = [
  {
    required: true,
    message: 'required',
  },
];
function Landing() {
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
    <div>
      <header className="bg-gray-900 p-4 text-white">
        <div className=" mx-auto flex justify-between items-center">
          <h1 className="text-4xl font-bold ml-10">
            <Link to={'/landing'} className="no-underline text-white">
              Joumla
            </Link>
          </h1>
          <nav className="flex gap-3">
            <Button
              type="link"
              className="text-xl text-white border-none font-bold rounded-full "
            >
              <Link to={'/login'} className="px-2 text-lg no-underline">
                Login
              </Link>
            </Button>
            <Button
              type="default"
              className="text-xl text-white bg-[#F55D00] border-none font-bold rounded-full "
            >
              <Link to={'/register'} className="px-2 text-lg no-underline">
                Register
              </Link>
            </Button>
          </nav>
        </div>
      </header>
      <div>
        <div
          style={{ backgroundImage: `url(78.png)` }}
          className=" text-white p-20 text-center bg-cover"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-950">
            Welcome to joumla Marketplace
          </h2>
          <p className="text-xl text-gray-900">
            your best place to start growing your business.
          </p>
          <Button className="mt-6 bg-[#F55D00] border-none rounded-full text-white py-2 px-4">
            <Link
              to={'/login'}
              className="px-2 text-xl font-medium no-underline"
            >
              Get Start
            </Link>
          </Button>
        </div>
      </div>
      <div>
        <div id="features" className="py-20 bg-gray-100">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded shadow">
                <h3 className="text-xl font-bold mb-4">Wide Selection</h3>
                <p>Access a wide range of products from various vendors.</p>
              </div>
              <div className="p-6 bg-white rounded shadow">
                <h3 className="text-xl font-bold mb-4">Secure Payments</h3>
                <p>
                Payment on delivery
                </p>
              </div>
              <div className="p-6 bg-white rounded shadow">
                <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
                <p>Our support team is available 24/7 to assist you.</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="vendors" className="py-20 bg-white">
            <div className="container mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Vendors</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-100 rounded shadow">
                  <h3 className="text-xl font-bold mb-4">Vendor 1</h3>
                  <p>High-quality products from Vendor 1.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <h3 className="text-xl font-bold mb-4">Vendor 2</h3>
                  <p>Great deals from Vendor 2.</p>
                </div>
                <div className="p-6 bg-gray-100 rounded shadow">
                  <h3 className="text-xl font-bold mb-4">Vendor 3</h3>
                  <p>Exclusive items from Vendor 3.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div id="contact" className="py-20 bg-gray-900 text-white">
              <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                <p className="mb-4">
                  Have questions? Reach out to us at any time.
                </p>
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
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
