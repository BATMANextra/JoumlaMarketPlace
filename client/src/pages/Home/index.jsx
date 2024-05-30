import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { GetProducts } from '../../apicalls/products';
import { message } from 'antd';
import Divider from '../../components/Divider';
import { Link, useNavigate } from 'react-router-dom';
import Filters from './Filters';
import moment from 'moment';
import { ListFilter } from 'lucide-react';
function Home() {
  const [showFilters, setShowFilters] = React.useState(true);
  const dispatch = useDispatch();
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: 'approved',
    category: [],
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(filters);
      dispatch(setLoader(false));
      setProducts(response.data);
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex  gap-5 ml-1">
        {showFilters && (
          <Filters
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filters={filters}
            setFilters={setFilters}
          />
        )}
        <div className="flex flex-col">
          <div className="flex flex-col gap-5 w-full mr-2 ">
            <div className="flex gap-5 items-center ml-5">
              {!showFilters && (
                <ListFilter
                  className="ri-filter-3-fill text-9xl h-12 w-16 text-gray-900  py-2 cursor-pointer"
                  onClick={() => setShowFilters(!showFilters)}
                ></ListFilter>
              )}
              <input
                type="search"
                placeholder="Search Product"
                className=" ml-1 border border-gray-300 rounded-full border-solid w-full px-2 p-2 h-24"
              />
            </div>
            <div
              className={`grid gap-5 ${
                showFilters ? 'grid-cols-4' : 'grid-cols-5'
              }`}
            >
              {products.map((product) => {
                return (
                  <div
                    className="border border-solid border-gray-400 rounded flex flex-col gap-5 pb-2 cursor-pointer ml-5 mr-5"
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    <img
                      src={product.images[0]}
                      alt=""
                      className="w-full h-64"
                    />

                    <div className="px-3 flex flex-col gap-1">
                      <h1 className="text-xl font-semibold ">{product.name}</h1>
                      <h2 className="text-xl font-extralight">
                        Available {product.quantity} piece
                      </h2>
                      <p className="text-sm text-orange-600">
                        Added on{' '}
                        {moment()
                          .subtract(product.createdAt, 'years')
                          .format('YYYY MM DD')}
                      </p>
                      <Divider />
                      <span className="text-xl font-semibold text-orange-600">
                        {product.price}{' '}
                        <span className="text-gray-950">DZD</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-42 bg-gray-900 mt-5">
        <div className="flex justify-center mt-5">
          <h1 className="bg-white w-[180px] h-12 rounded-full flex justify-center items-center ">
            <Link
              className="text-gray-900 cursor-pointer no-underline"
              to={'/about-us'}
            >
              About us
            </Link>
          </h1>
        </div>
        <p className='text-lg mt-5 font-light text-white flex justify-center'>© Copyright all rights are reserved</p>
        <p className='text-xs mt- ml-2 font-extralight text-white'>Version 1.0</p>
      </div>
    </div>
  );
}

export default Home;
