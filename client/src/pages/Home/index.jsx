import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { GetProducts } from '../../apicalls/products';
import { message } from 'antd';
import Divider from '../../components/Divider';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';
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
    <div className="flex gap-5 ml-1">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full mr-2 ">
        <div className="flex gap-5 items-center ml-5">
          {!showFilters && (
            <i
              className="ri-filter-3-fill text-9xl w-2 h-8 py-2 cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
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
                <img src={product.images[0]} alt="" className="w-full h-64" />

                <div className="px-3 flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm">{product.description}</p>
                  <Divider />
                  <span className="text-xl font-semibold text-orange-500">
                    {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
