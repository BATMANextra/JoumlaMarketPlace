import React from 'react';
import { useSelector } from 'react-redux';

function General() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="container flex flex-col justify-center items-center border-gray-200 border border-1 border-solid w-[850px] mt-5">
        <div className='mt-5'><h1 className="text-6xl">General information</h1></div>
        <div className='mt-5'>
          <h2>Name : <label className="text-xl">{user.name}</label></h2>
        </div>
        <div className='mt-1'>
          <h2>Last Name : <label className="text-xl">{user.last}</label></h2>
        </div>
        <div className='mt-1'>
          <h2>Username: <label className="text-xl">{user.username}</label></h2>
        </div>
        <div className='mt-1'>
          <h2>Email: <label className="text-xl">{user.email}</label></h2>
        </div>
        <div className='mt-1'>
          <h2>Mobile: <label className="text-xl">{user.mobile}</label></h2>
        </div>
      </div>
    </div>
  );
}

export default General;
