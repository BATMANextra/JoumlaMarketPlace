import React from 'react';
import { Tabs } from 'antd';
import Products from './Products';
import Users from './Users';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Requests from './Requests';
import Messages from './Messages';
function Admin() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  useEffect(() => {
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, []);
  return (
    <div className="ml-3 pr-3">
      <Tabs>
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Users" key="2">
          <Users />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Requests" key="3">
          <Requests />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Messages" key="4">
          <Messages />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Admin;
