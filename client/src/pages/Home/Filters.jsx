import React from 'react';

const categories = [
  {
    name: 'Electronics',
    value: 'electronics',
  },
  {
    name: 'Raw Materials',
    value: 'rawmaterials',
  },
  {
    name: 'Accessories',
    value: 'accessories',
  },
  {
    name: 'Classic',
    value: 'classic',
  },
  {
    name: 'Fashion',
    value: 'fashion',
  },
  {
    name: 'Books',
    value: 'books',
  },
  {
    name: 'Home',
    value: 'home',
  },
  {
    name: 'Sports',
    value: 'sports',
  },
  {
    name: 'Toys',
    value: 'toys',
  },
];

function Filters({ showFilters, setShowFilters, filters, setFilters }) {
  return (
    <div className="w-72 flex flex-col gap-6">
      <div className="flex justify-between text-sm pl-3 uppercase">
        <h1 className="text-orange-600">Filters</h1>
        <i
          className="ri-close-fill cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        ></i>
      </div>
      <div className="flex flex-col gap-1 ml-3">
        <h1 className="text-gray-900 text-xl uppercase">Categories</h1>
        <div className="flex flex-col  gap-1 pt-2">
          {categories.map((category) => {
            return (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  className="max-width "
                  checked={filters.category.includes(category.value)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFilters({
                        ...filters,
                        category: [...filters.category, category.value],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        category: filters.category.filter(
                          (item) => item !== category.value
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="category">{category.name}</label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Filters;
