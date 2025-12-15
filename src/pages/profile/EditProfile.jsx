import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/authcontext/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const EditProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [formData, setFormData] = useState({
        name: '', // Changed from full_name to match backend
        email: '',
        phone: '',
        bio: ''
    });

    // Fetch current user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                if (!user) {
                    navigate('/login');
                    return;
                }

                // Get user activities to find the latest registration
                const response = await axiosSecure.get(`/users/activities/${user.uid}`);

                if (response.data.success && response.data.data.length > 0) {
                    // Find registration activity (if any)
                    const registration = response.data.data.find(
                        activity => activity.activity_type === 'register'
                    );

                    // Or use the latest activity
                    const latestActivity = response.data.data[0];

                    setFormData({
                        name: registration?.name || latestActivity?.name || user.displayName || '',
                        email: user.email || '',
                        phone: registration?.phone || latestActivity?.phone || '',
                        bio: ''
                    });
                } else {
                    // If no user data found, use Firebase data
                    setFormData({
                        name: user.displayName || '',
                        email: user.email || '',
                        phone: '',
                        bio: ''
                    });
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user, axiosSecure, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            // First, get the user's activities to find their record ID
            const activitiesResponse = await axiosSecure.get(`/users/activities/${user.uid}`);

            if (!activitiesResponse.data.success || activitiesResponse.data.data.length === 0) {
                setError('User record not found. Please contact support.');
                setSaving(false);
                return;
            }

            // Find the user's MAIN record (usually the first registration)
            let userRecord = null;

            // Try to find a registration record first
            const registrationRecord = activitiesResponse.data.data.find(
                activity => activity.activity_type === 'register'
            );

            if (registrationRecord) {
                userRecord = registrationRecord;
            } else {
                // Fallback to the first record
                userRecord = activitiesResponse.data.data[0];
            }

            // Update the user record
            const updateResponse = await axiosSecure.put(`/users/${userRecord.id}`, {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            });

            if (updateResponse.data.success) {
                setSuccess('Profile updated successfully!');

                // Redirect to profile page after 2 seconds
                setTimeout(() => {
                    navigate('/profile');
                }, 2000);
            } else {
                setError('Failed to update profile: ' + updateResponse.data.message);
            }

        } catch (error) {
            console.error('Error updating profile:', error);
            setError(error.response?.data?.message || 'Failed to update profile. Please try again.');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate('/profile');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#B71B1C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading profile data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <button
                        onClick={handleCancel}
                        className="flex items-center text-gray-600 hover:text-[#B71B1C] mb-4"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Profile
                    </button>

                    <div className="w-20 h-20 bg-[#B71B1C] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                        {formData.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Profile</h1>
                    <p className="text-gray-600">Update your personal information</p>
                </div>

                {/* Error/Success Messages */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">{success}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Form */}
                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-colors"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>

                            {/* Email (Read-only) */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Email cannot be changed
                                </p>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-colors"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Bio/About */}
                            <div>
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                                    Bio/About Me
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-colors"
                                    placeholder="Tell us something about yourself..."
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                                    disabled={saving}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 bg-[#B71B1C] text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {saving ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-2 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Saving...
                                        </span>
                                    ) : 'Save Changes'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Danger Zone - Optional */}
                <div className="bg-white rounded-2xl shadow-xl p-6 mt-6 border-2 border-red-100">
                    <h3 className="text-xl font-semibold text-red-700 mb-4">Danger Zone</h3>
                    <p className="text-gray-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                        type="button"
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                        onClick={() => navigate('/delete-account')}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;