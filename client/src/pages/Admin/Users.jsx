import { Table, message } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { useEffect } from 'react';
import moment from 'moment';
import {
  GetAllUsers,
  UpdateUserRole,
  UpdateUserStatus,
} from '../../apicalls/users';

function Users() {
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllUsers(null);
      dispatch(setLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const onRolesUpdate = async (id, role) => {
    try {
      dispatch(setLoader(true));
      const response = await UpdateUserRole(id, role);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const column = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (text, record) => {
        return record.role.toUpperCase();
      },
    },
    {
      title: 'Role change',
      dataIndex: 'action',
      render: (text , record) => {
        const { role, _id } = record;
        return (
          <div className="flex gap-3">
            {role === 'user' && (
              <span
                className="underline cursor-pointer uppercase"
                onClick={() => onRolesUpdate(_id, 'seller')}
              >
                user
              </span>
            )}
            {role === 'seller' && (
              <span
                className="underline cursor-pointer uppercase"
                onClick={() => onRolesUpdate(_id, 'user')}
              >
                seller
              </span>
            )}
            {role === 'admin' && <span>admin</span>}
          </div>
        );
      }
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      render: (text, record) =>
        moment(record.createdAt).format('DD-MM-YY hh:mm A'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === 'active' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'blocked')}
              >
                Block
              </span>
            )}
            {status === 'blocked' && (
              <span
                className="underline cursor-pointer"
                onClick={() => onStatusUpdate(_id, 'active')}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={column} dataSource={users} />
    </div>
  );
}

export default Users;
