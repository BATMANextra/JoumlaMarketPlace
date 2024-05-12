import React from 'react';
import { Form, Modal, Tabs, Input, Row, Col, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../../redux/loadersSlice';
import { AddProduct, EditProduct } from '../../../apicalls/products';
import { useEffect } from 'react';
import Images from './Images';

const additionalThings = [
  {
    label: 'Bill Availabel ',
    name: 'billAvailabel',
  },
  {
    label: 'Warranty Availabel ',
    name: 'warrantyAvailabel',
  },
  {
    label: 'Accessories Availabel ',
    name: 'accessoriesAvailabel',
  },
  {
    label: 'Box Availabel ',
    name: 'boxAvailabel',
  },
];

const rules = [
  {
    required: true,
    message: 'Required',
  },
];

function ProductsForm({
  showProductForm,
  setShowProductForm,
  selectedProudct,
  getData,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      let response = null;
      if (selectedProudct) {
        response = await EditProduct(selectedProudct._id, values);
      } else {
        values.seller = user._id;
        values.status = 'pending';
        response = await AddProduct(values);
      }

      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        dispatch(setLoader(false));
        message.error(response.error);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const formRef = React.useRef(null);

  useEffect(() => {
    if (selectedProudct) {
      formRef.current.setFieldsValue(selectedProudct);
    }
  }, [selectedProudct]);
  return (
    <Modal
      title=""
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      centered
      width={1000}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <h1 className="text-primary text-xl text-center uppercase">
          {selectedProudct ? 'Edit Product' : 'Add Product'}
        </h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="General" key="1">
            <Form layout="vertical" ref={formRef} onFinish={onFinish}>
              <Form.Item label="Name" name="name" rules={rules}>
                <Input type="text" />
              </Form.Item>
              <Form.Item label="Description" name="description" rules={rules}>
                <TextArea type="text" />
              </Form.Item>
              <Row gutter={(16, 16)}>
                <Col span={8}>
                  <Form.Item label="Price" name="price" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category" rules={rules}>
                    <select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                      <option value="toys">Toys</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Age" name="age" rules={rules}>
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                {additionalThings.map((item) => {
                  return (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      valuePropName="checked"
                    >
                      <Input
                        type="checkbox"
                        value={item.name}
                        onChange={(e) => {
                          formRef.current.setFieldsValue({
                            [item.name]: e.target.checked,
                          });
                        }}
                        checked={formRef.current?.getFieldValue(item.name)}
                      />
                    </Form.Item>
                  );
                })}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2" disabled={!selectedProudct}>
            <Images
              selectedProudct={selectedProudct}
              getData={getData}
              setShowProductForm={setShowProductForm}
            />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
}

export default ProductsForm;
