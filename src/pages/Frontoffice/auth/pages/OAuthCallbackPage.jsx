import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getToken } from '../../../../services/cookieUtils';

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const { reload } = useAuth();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      // Check if access_token cookie exists (set by backend)
      const token = getToken();
      
      if (token) {
        // Token is available, reload auth context
        await reload();
        // Small delay to ensure auth context is updated
        setTimeout(() => {
          navigate('/');
        }, 500);
      } else {
        // No token, redirect to signin
        navigate('/signin');
      }
    };

    handleOAuthCallback();
  }, [navigate, reload]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p>Authenticating...</p>
    </div>
  );
};

export default OAuthCallbackPage;
