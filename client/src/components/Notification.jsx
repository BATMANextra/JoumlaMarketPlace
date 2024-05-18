import { Modal, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { DeleteNotification } from '../apicalls/notification';
import { useDispatch } from 'react-redux';
import { setLoader } from '../redux/loadersSlice';
function Notification({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteNotifications = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteNotification(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  return (
    <Modal
      title="Notification"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      footer={null}
      centered
      width={800}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            className="flex flex-col gap-1 border border-solid p-2 border-gray-200 rounded-md cursor-pointer"
            key={notification._id}
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h1 className="font-medium text-lg">{notification.title}</h1>
                <span>{notification.order}</span>
                <h1 className="font-light text-xs">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <div>
                <i
                  className="ri-delete-bin-line cursor-pointer"
                  onClick={() => {
                    deleteNotifications(notification._id);
                  }}
                ></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notification;
