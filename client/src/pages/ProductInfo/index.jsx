import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { GetProductById } from '../../apicalls/products';
import { Button, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import Divider from '../../components/Divider';
import moment from 'moment';
import OrderModel from './OrderModel';
import { GetAllOrders } from '../../apicalls/orders';

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [newOrder, setNewOrder] = React.useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [product, setProduct] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProductById(id);
      dispatch(setLoader(false));
      if (response.success) {
        const ordersResponse = await GetAllOrders({ product: id });
        setProduct({
          ...response.data,
          orders: ordersResponse.data,
        });
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    product && (
      <div className="pl-5">
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-96 object-cover rounded-md cursor-pointer"
            />
            <div className="flex gap-5 cursor-pointer">
              {product.images.map((image, index) => {
                return (
                  <img
                    className={
                      'w-20 h-20 object-cover rounded-md cursor-pointer' +
                      (selectedImageIndex === index
                        ? 'border-0.5 border-orange-600 border-double p-2'
                        : '')
                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                );
              })}
            </div>

            <Divider />
            <div>
              <div>
                <h1 className="text-sm text-gray-800">Added On</h1>
                <span className="pb-2 text-sm">
                  {moment(product.createdAt).format('MMM DD YYYY')}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
              <span>{product.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">Product Details</h1>
              <div className="flex justify-between mt-2 mr-5">
                <span>Price</span>
                <span>{product.price}</span>
              </div>
              <div className="flex justify-between mt-2 mr-5">
                <span>Quantity</span>
                <span>{product.quantity}</span>
              </div>
              <div className="flex justify-between mt-2 mr-5">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2 mr-5">
                <span>Bill Available</span>
                <span>{product.billAvailabel ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between mt-2 mr-5">
                <span>Delivery Available</span>
                <span>{product.deliveryAvailabel ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex justify-between mt-2 mr-5">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailabel ? 'Yes' : 'No'}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold">Seller Details</h1>
              <div className="flex justify-between mt-2 mr-5">
                <span>Name</span>
                <span>{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2 mr-5">
                <span>Email</span>
                <span className="uppercase">{product.seller.email}</span>
              </div>
            </div>
            <Divider />
            <div className="flex flex-col mr-4">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Sell</h1>
                <Button
                  onClick={() => setNewOrder(!newOrder)}
                  type="primary"
                  disabled={user._id === product.seller._id}
                >
                  Purchase now
                </Button>
              </div>
            </div>
          </div>
        </div>
        {newOrder && (
          <OrderModel
            product={product}
            reloadData={getData}
            newOrder={newOrder}
            setNewOrder={setNewOrder}
          />
        )}
      </div>
    )
  );
}

export default ProductInfo;
