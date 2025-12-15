import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/authcontext/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-[#B71B1C] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;