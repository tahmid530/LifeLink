import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authcontext/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);

    // Fetch user data from backend
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                if (!user) {
                    setError('Please log in to view your profile');
                    setLoading(false);
                    return;
                }

                // Get all user activities first
                const activitiesResponse = await axiosSecure.get(`/users/activities/${user.uid}`);

                if (activitiesResponse.data.success && activitiesResponse.data.data.length > 0) {
                    // Find the user's MAIN record
                    let userRecord = null;

                    // Try to find a registration record first (has name)
                    const registrationRecord = activitiesResponse.data.data.find(
                        activity => activity.activity_type === 'register' && activity.name
                    );

                    if (registrationRecord) {
                        userRecord = registrationRecord;
                    } else {
                        // Try to find any record with a name
                        const recordWithName = activitiesResponse.data.data.find(
                            activity => activity.name
                        );

                        if (recordWithName) {
                            userRecord = recordWithName;
                        } else {
                            // Fallback to the first record
                            userRecord = activitiesResponse.data.data[0];
                        }
                    }

                    // Now get the specific user record by ID to ensure we have latest data
                    const userResponse = await axiosSecure.get(`/users/${userRecord.id}`);

                    if (userResponse.data.success) {
                        setUserData(userResponse.data.data);
                    } else {
                        setError('User profile not found');
                    }
                } else {
                    setError('User profile not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, axiosSecure]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#B71B1C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Profile Error</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-[#B71B1C] text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-semibold"
                    >
                        Go to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-[#B71B1C] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                        {userData?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {userData?.name || user?.displayName || 'User'}
                    </h1>
                    <p className="text-gray-600">{user?.email}</p>
                    <div className="flex gap-2 justify-center mt-4">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Member since {new Date(userData?.created_at).getFullYear()}
                        </span>
                    </div>
                </div>

                {/* User Information */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Account Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoField label="Email" value={user?.email} />
                        <InfoField label="User ID" value={user?.uid} />
                        <InfoField label="Account Created" value={formatDate(userData?.created_at)} />
                        <InfoField label="Last Login" value={formatDate(userData?.last_login)} />
                        <InfoField label="Login Method" value={userData?.login_method || 'Email'} />
                        <InfoField label="Total Logins" value={userData?.login_count || '1'} />
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                        <div className="text-2xl font-bold text-[#B71B1C]">{userData?.login_count || 1}</div>
                        <div className="text-sm text-gray-600">Total Logins</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                        <div className="text-2xl font-bold text-[#B71B1C]">
                            {userData?.is_donor ? 'Yes' : 'No'}
                        </div>
                        <div className="text-sm text-gray-600">Blood Donor</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                        <div className="text-2xl font-bold text-[#B71B1C]">
                            {userData?.status || 'Active'}
                        </div>
                        <div className="text-sm text-gray-600">Status</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 text-center shadow-lg">
                        <div className="text-2xl font-bold text-[#B71B1C]">100%</div>
                        <div className="text-sm text-gray-600">Profile Complete</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {!userData?.is_donor && (
                        <button
                            onClick={() => navigate('/donor_form')}
                            className="bg-[#B71B1C] text-white p-4 rounded-xl shadow-lg hover:bg-red-800 transition-colors text-center font-semibold"
                        >
                            Become a Blood Donor
                        </button>
                    )}
                    <button
                        onClick={() => navigate('/edit-profile')}
                        className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-center border-2 border-[#B71B1C] text-[#B71B1C] font-semibold"
                    >
                        Edit Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

// Helper component for info fields
const InfoField = ({ label, value, className = '' }) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <div className="px-3 py-2 bg-gray-50 rounded-lg text-gray-900 font-medium">
            {value || 'Not available'}
        </div>
    </div>
);

// Format date for display
const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export default Profile;