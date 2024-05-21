import { Avatar, Badge, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../redux/loadersSlice';
import { setUser } from '../redux/userSlice';
import { LogOut } from 'lucide-react';
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
        navigate('/');
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate('/landing');
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
      navigate('/landing');
    }
  }, []);

  return (
    user && (
      <div>
        <div className="flex justify-between items-center no-underline p-4 bg-gray-900">
          <Link className="Link1" to={'/'}>
            <h1 className="text-4xl text-white ml-10">Joumla</h1>
          </Link>
          <div className=" py-2 px-5 mr-10 rounded-full flex gap-1 items-center">
            <div className="flex mr-6 ">
              <h1 className="text-2xl " hidden={user.role !== 'user'}>
                <Link
                  className="no-underline text-[#F55D00]"
                  to="/sellerRequest"
                >
                  Be a seller
                </Link>
              </h1>
            </div>
            <i className="ri-user-fill cursor-pointer text-white"></i>
            <span
              className="underline cursor-pointer uppercase"
              onClick={() => {
                if (user.role === 'seller') {
                  navigate('/profile');
                } else if (user.role === 'user') {
                  navigate('/userprofile');
                } else {
                  navigate('/admin');
                }
              }}
            >
              <Link className="pr-5  text-white no-underline">{user.username}</Link>
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
                className="text-white bg-[#F55D00]"
                shape="square"
                icon={<i className="ri-notification-3-fill"></i>}
              />
            </Badge>
            <LogOut
              className=" ml-5 cursor-pointer bg-none text-white"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/landing');
              }}
            />
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
