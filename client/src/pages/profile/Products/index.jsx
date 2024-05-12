import { Button, Table, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../redux/loadersSlice';
import { DeleteProduct, GetProducts } from '../../../apicalls/products';
import ProductsForm from './ProductsForm';
import { useEffect } from 'react';
import moment from 'moment';

function Products() {
  const [selectedProudct, setSelectedProudct] = React.useState(null);
  const [products, setProducts] = React.useState([]);
  const [showProductForm, setShowProductForm] = React.useState(false);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts();
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Added On',
      dataIndex: 'createdAt',
      render: (text, record) =>
        moment(record.createdAt).format('DD-MM-YYYY hh:mm:ss A'),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        return (
          <div className="flex gap-5">
            <i
              className="ri-edit-2-line cursor-pointer"
              onClick={() => {
                setSelectedProudct(record);
                setShowProductForm(true);
              }}
            ></i>
            <i
              className="ri-delete-bin-line cursor-pointer"
              onClick={() => {
                deleteProduct(record._id);
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-6">
        <Button
          type="default"
          onClick={() => {
            setSelectedProudct(null);
            setShowProductForm(true);
          }}
        >
          Add Product
        </Button>
      </div>
      <Table columns={column} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProudct={selectedProudct}
          getData={getData}
        />
      )}
    </div>
  );
}

export default Products;
