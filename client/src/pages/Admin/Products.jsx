import { Table, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { GetProducts, UpdateProductStatus } from '../../apicalls/products';
import { useEffect } from 'react';
import moment from 'moment';

function Products() {
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(null);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateProductStatus(id, status);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const column = [
    {
      title: 'Product',
      dataIndex: 'image',
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ''}
            alt=""
            className="w-20 h-20 object-cover rounded"
          />
        );
      },
    },
    {
      title: 'Product',
      dataIndex: 'name',
    },
    {
      title: 'Seller',
      dataIndex: 'name',
      render: (text, record) => {
        return record.seller.name;
      },
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
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => {
        return record.status.toUpperCase();
      },
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
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === 'pending' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'approved')}
              >
                Approve
              </span>
            )}
            {status === 'pending' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'rejected')}
              >
                Reject
              </span>
            )}
            {status === 'approved' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'blocked')}
              >
                Block
              </span>
            )}
            {status === 'blocked' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'approved')}
              >
                Unblock
              </span>
            )}
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
      <Table columns={column} dataSource={products} />
    </div>
  );
}

export default Products;
