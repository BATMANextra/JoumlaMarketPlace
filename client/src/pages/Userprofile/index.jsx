import { Tabs } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import UserOrders from '../profile/Products/UserOrder';
import moment from 'moment';
import General from '../profile/Products/General';

function Userprofile() {
  const { user } = useSelector((state) => state.users);
  return (
    <div className="px-5">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="My Orders" key="1">
          <UserOrders />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="2">
        <General />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Userprofile;
