import React from 'react';
import { Tabs } from 'antd';
import Products from './Products';
import UserOrders from './Products/UserOrder';
import { useSelector } from 'react-redux';
import moment from 'moment';

function Profile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="px-5">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Orders" key="2">
          <UserOrders />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col">
            <h1>Name : {user.name}</h1>
            <h1>Email : {user.email}</h1>
            <span>
              Created At :{' '}
              <b>{moment(user.createdAt).format('MMM D , YYYY:hh:mm A')}</b>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Profile;
