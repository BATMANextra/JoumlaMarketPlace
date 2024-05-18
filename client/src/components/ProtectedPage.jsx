import { Avatar, Badge, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../redux/loadersSlice';
import { setUser } from '../redux/userSlice';
import Notification from './Notification';
import {
  GetAllNotification,
  ReadAllNotification,
} from '../apicalls/notification';

function ProtectedPage({ childern }) {
  const [notifications = [], setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate('/login');
      message.error(error.message);
    }
  };

  const getNotifications = async () => {
    try {
      const response = await GetAllNotification();
      if (response.success) {
        setNotifications(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const readNotifications = async () => {
    try {
      const response = await ReadAllNotification();
      if (response.success) {
        getNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
      getNotifications();
    } else {
      navigate('/login');
    }
  }, []);

  return (
    user && (
      <div>
        <div className="flex justify-between items-center p-4 bg-[#F55D00]">
          <Link className="Link1" to={'/'}>
            <h1 className="text-4xl text-white ml-10">Joumla</h1>
          </Link>
          <div className="bg-white py-2 px-5 mr-10 rounded-full flex gap-1 items-center">
            <i className="ri-user-fill cursor-pointer"></i>
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === 'seller') {
                  navigate('/profile');
                } else {
                  navigate('/admin');
                }
              }}
            >
              {user.name}
            </span>
            <Badge
              count={
                notifications?.filter((notification) => !notification.read)
                  .length
              }
              onClick={() => {
                readNotifications();
                setShowNotifications(true);
              }}
              className=" cursor-pointer"
            >
              <Avatar
                className="bg-white text-gray-900"
                shape="circle"
                icon={<i className="ri-notification-line"></i>}
              />
            </Badge>
            <i
              className="ri-logout-box-r-fill ml-5 cursor-pointer"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
              }}
            ></i>
          </div>
        </div>
        <div className="p-5">{childern}</div>
        {
          <Notification
            notifications={notifications}
            reloadNotifications={getNotifications}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
          />
        }
      </div>
    )
  );
}

export default ProtectedPage;
