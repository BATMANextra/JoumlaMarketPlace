import { message } from 'antd';
import React, { useEffect } from 'react';
import { GetCurrentUser } from '../apicalls/users';
import { useNavigate } from 'react-router-dom';

const ProtectedPage = ({ childern }) => {
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();
  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate('/login');
        message.error(response.message);
      }
    } catch (error) {
      navigate('/login');
      message.error(error.message);
    }
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      validateToken();
    } else {
      navigate('/login');
      message.error('please login to continue');
    }
  }, []);
  return (
    <div>
      {user && (
        <div className="p-5">
          {user.name}
          {childern}
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
