import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emitter from '../../utils/eventEmitter';

const LogoutListener = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      navigate('/login');
    };

    // Listen for the 'logout' event
    emitter.on('logout', handleLogout);

    // Cleanup the event listener on component unmount
    return () => {
      emitter.off('logout', handleLogout);
    };
  }, [navigate]);

  return null; // This component doesn't render anything
};

export default LogoutListener;
