import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTint, FaVenusMars, FaCalendarAlt, FaSearch, FaTimes } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { NavLink } from 'react-router';

const SearchDonor = () => {
    const [donors, setDonors] = useState([]);
    const [filteredDonors, setFilteredDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBloodType, setSelectedBloodType] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedDonor, setSelectedDonor] = useState(null);
    const [showContactModal, setShowContactModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const axiosSecure = useAxiosSecure();

    const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    const districts = [
        "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
        "Brahmanbaria", "Chandpur", "Chapainawabganj", "Chattogram", "Chuadanga", "Cox's Bazar",
        "Cumilla", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha",
        "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati",
        "Jhenaidah", "Joypurhat", "Khagrachhari", "Khulna", "Kishoreganj", "Kurigram",
        "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur", "Magura", "Manikganj",
        "Meherpur", "Moulvibazar", "Munshiganj", "Mymensingh", "Naogaon", "Narail",
        "Narayanganj", "Narsingdi", "Natore", "Netrokona", "Nilphamari", "Noakhali",
        "Pabna", "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi",
        "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj",
        "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
    ];

    useEffect(() => {
        const fetchDonors = async () => {
            try {
                setLoading(true);
                const response = await axiosSecure.get('/donors');
                if (response.data.success) {
                    setDonors(response.data.data);
                    setFilteredDonors(response.data.data);
                } else {
                    setError('Failed to fetch donor data');
                }
            } catch (error) {
                console.error('Error fetching donors:', error);
                setError('Failed to load donor data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchDonors();
    }, [axiosSecure]);

    // Filter donors based on search criteria
    useEffect(() => {
        let results = donors;

        // Filter by search term (name, email, phone)
        if (searchTerm) {
            results = results.filter(donor =>
                donor.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                donor.phone?.includes(searchTerm)
            );
        }

        // Filter by blood type
        if (selectedBloodType) {
            results = results.filter(donor => donor.blood_type === selectedBloodType);
        }

        // Filter by district
        if (selectedDistrict) {
            results = results.filter(donor => donor.district === selectedDistrict);
        }

        // Filter by gender
        if (selectedGender) {
            results = results.filter(donor => donor.gender === selectedGender);
        }

        setFilteredDonors(results);
    }, [searchTerm, selectedBloodType, selectedDistrict, selectedGender, donors]);

    // Clear all filters
    const clearFilters = () => {
        setSearchTerm('');
        setSelectedBloodType('');
        setSelectedDistrict('');
        setSelectedGender('');
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return 'N/A';
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const ContactModal = ({ donor, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">Contact {donor.full_name}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaPhone className="w-5 h-5 text-[#B71B1C]" />
                        <div>
                            <p className="font-semibold">{donor.phone}</p>
                            <p className="text-sm text-gray-600">Mobile Number</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <FaEnvelope className="w-5 h-5 text-[#B71B1C]" />
                        <div>
                            <p className="font-semibold">{donor.email}</p>
                            <p className="text-sm text-gray-600">Email Address</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <a
                        href={`tel:${donor.phone}`}
                        className="flex-1 bg-[#B71B1C] text-white py-2 rounded-lg text-center font-semibold hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaPhone className="w-4 h-4" />
                        Call Now
                    </a>
                    <button
                        onClick={onClose}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );

    const DetailsModal = ({ donor, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-200">
                    <div className="w-16 h-16 bg-[#B71B1C] rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {donor.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-800">{donor.full_name}</h3>
                        <p className="text-gray-600 capitalize">{donor.gender} • {calculateAge(donor.date_of_birth)} years</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                {/* Grid Layout for Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Contact Information */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-[#B71B1C] border-b pb-2 flex items-center gap-2">
                            <FaPhone className="w-4 h-4" />
                            Contact Information
                        </h4>
                        <DetailItem icon={FaPhone} label="Phone" value={donor.phone} />
                        <DetailItem icon={FaEnvelope} label="Email" value={donor.email} />
                        <DetailItem icon={FaPhone} label="Emergency Contact" value={donor.emergency_contact} />
                    </div>

                    {/* Health Information */}
                    <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-[#B71B1C] border-b pb-2 flex items-center gap-2">
                            <FaTint className="w-4 h-4" />
                            Health Information
                        </h4>
                        <DetailItem icon={FaTint} label="Blood Type" value={donor.blood_type} />
                        <DetailItem label="Weight" value={donor.weight + " kg"} />
                        <DetailItem icon={FaCalendarAlt} label="Last Donation" value={donor.last_donation_date ? formatDate(donor.last_donation_date) : 'Never'} />
                    </div>

                    {/* Location Information */}
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-lg font-semibold text-[#B71B1C] border-b pb-2 flex items-center gap-2">
                            <FaMapMarkerAlt className="w-4 h-4" />
                            Location Information
                        </h4>
                        <DetailItem icon={FaMapMarkerAlt} label="District" value={donor.district} />
                        <DetailItem icon={FaMapMarkerAlt} label="Area/Thana" value={donor.area} />
                        <DetailItem icon={FaMapMarkerAlt} label="Full Address" value={donor.address} />
                    </div>

                    {/* Health Status */}
                    <div className="md:col-span-2 space-y-4">
                        <h4 className="text-lg font-semibold text-[#B71B1C] border-b pb-2">Health Status</h4>
                        <div className="flex flex-wrap gap-2">
                            {/* {donor.has_disease && (
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Has Medical Condition
                                </span>
                            )}
                            {donor.is_on_medication && (
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    On Medication
                                </span>
                            )}
                            {donor.had_recent_surgery && (
                                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Recent Surgery
                                </span>
                            )} */}
                            {!donor.has_disease && !donor.is_on_medication && !donor.had_recent_surgery && (
                                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Good Health
                                </span>
                            )}
                        </div>
                        {donor.disease_details && (
                            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-700">{donor.disease_details}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                    <a
                        href={`tel:${donor.phone}`}
                        className="flex-1 bg-[#B71B1C] text-white py-3 rounded-lg text-center font-semibold hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaPhone className="w-4 h-4" />
                        Call Donor
                    </a>
                    <a
                        href={`mailto:${donor.email}`}
                        className="flex-1 border border-[#B71B1C] text-[#B71B1C] py-3 rounded-lg text-center font-semibold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                    >
                        <FaEnvelope className="w-4 h-4" />
                        Send Email
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );

    const DetailItem = ({ icon: Icon, label, value }) => (
        <div className="flex justify-between items-center py-2">
            <div className="flex items-center gap-2">
                {Icon && <Icon className="w-4 h-4 text-gray-500" />}
                <span className="font-medium text-gray-700">{label}:</span>
            </div>
            <span className="text-gray-900 font-semibold">{value}</span>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-[#B71B1C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading donor data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-20 h-20 bg-[#B71B1C] rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <FaSearch className="w-10 h-10 text-white" />
                    </motion.div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Find Blood Donors</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Search through our database of registered blood donors. Your search could save a life.
                    </p>
                </div>

                {/* Error Display */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                        <p className="text-red-700 flex items-center gap-2">
                            <FaTimes className="w-5 h-5" />
                            {error}
                        </p>
                    </motion.div>
                )}

                {/* Search and Filter Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl shadow-xl p-6 mb-8"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Search Input */}
                        <div className="lg:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Donors
                            </label>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                    placeholder="Search by name, email, or phone..."
                                />
                            </div>
                        </div>

                        {/* Blood Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <FaTint className="w-4 h-4 text-[#B71B1C]" />
                                Blood Type
                            </label>
                            <select
                                value={selectedBloodType}
                                onChange={(e) => setSelectedBloodType(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                            >
                                <option value="">All Types</option>
                                {bloodTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        {/* District Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <FaMapMarkerAlt className="w-4 h-4 text-[#B71B1C]" />
                                District
                            </label>
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                            >
                                <option value="">All Districts</option>
                                {districts.map(district => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                        </div>

                        {/* Gender Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                                <FaVenusMars className="w-4 h-4 text-[#B71B1C]" />
                                Gender
                            </label>
                            <select
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                            >
                                <option value="">All Genders</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-gray-600">
                            Showing {filteredDonors.length} of {donors.length} donors
                        </div>
                        <button
                            onClick={clearFilters}
                            className="px-4 py-2 text-[#B71B1C] hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium flex items-center gap-2"
                        >
                            <FaTimes className="w-4 h-4" />
                            Clear Filters
                        </button>
                    </div>
                </motion.div>

                {/* Donors Table */}
                {filteredDonors.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl shadow-xl p-12 text-center"
                    >
                        <FaSearch className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">No Donors Found</h3>
                        <p className="text-gray-600">
                            {donors.length === 0
                                ? "No donors are currently registered in the system."
                                : "No donors match your search criteria. Try adjusting your filters."
                            }
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                {/* Table Header */}
                                <thead className="bg-gradient-to-r from-[#B71B1C] to-red-700 text-white">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold">Donor</th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaTint className="w-4 h-4" />
                                                Blood Type
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaVenusMars className="w-4 h-4" />
                                                Gender
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaMapMarkerAlt className="w-4 h-4" />
                                                District
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">
                                            <div className="flex items-center justify-center gap-2">
                                                <FaCalendarAlt className="w-4 h-4" />
                                                Last Donation
                                            </div>
                                        </th>
                                        <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
                                    </tr>
                                </thead>

                                {/* Table Body */}
                                <tbody className="divide-y divide-gray-200">
                                    {filteredDonors.map((donor, index) => (
                                        <motion.tr
                                            key={donor.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="hover:bg-gray-50 transition-colors duration-150"
                                        >
                                            {/* Donor Name & Contact */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#B71B1C] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                        {donor.full_name?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-800">{donor.full_name}</div>
                                                        <div className="text-sm text-gray-500">{donor.phone}</div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Blood Type */}
                                            <td className="px-6 py-4 text-center">
                                                <span className="bg-[#B71B1C] text-white px-3 py-1 rounded-full text-sm font-bold">
                                                    {donor.blood_type}
                                                </span>
                                            </td>

                                            {/* Gender */}
                                            <td className="px-6 py-4 text-center text-sm text-gray-700 capitalize">
                                                {donor.gender}
                                            </td>

                                            {/* District */}
                                            <td className="px-6 py-4 text-center text-sm text-gray-700">
                                                {donor.district}
                                            </td>

                                            {/* Last Donation */}
                                            <td className="px-6 py-4 text-center">
                                                <span className={`text-sm font-medium ${donor.last_donation_date ? 'text-green-600' : 'text-blue-600'}`}>
                                                    {donor.last_donation_date ? formatDate(donor.last_donation_date) : 'New Donor'}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2 justify-center">
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => {
                                                            setSelectedDonor(donor);
                                                            setShowContactModal(true);
                                                        }}
                                                        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-sm flex items-center gap-1"
                                                        title="Contact Donor"
                                                    >
                                                        <FaPhone className="w-3 h-3" />
                                                    </motion.button>
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => {
                                                            setSelectedDonor(donor);
                                                            setShowDetailsModal(true);
                                                        }}
                                                        className="bg-[#B71B1C] text-white p-2 rounded-lg hover:bg-red-800 transition-colors duration-200 font-semibold text-sm flex items-center gap-1"
                                                        title="View Details"
                                                    >
                                                        <FaEye className="w-3 h-3" />
                                                    </motion.button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Table Footer */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-600">
                                    Showing {filteredDonors.length} of {donors.length} donors
                                </div>
                                <div className="text-sm text-gray-600">
                                    Scroll horizontally to see more →
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Statistics Footer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 bg-white rounded-2xl shadow-xl p-6"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-[#B71B1C]">{donors.length}</div>
                            <div className="text-sm text-gray-600">Total Donors</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#B71B1C]">
                                {bloodTypes.length}
                            </div>
                            <div className="text-sm text-gray-600">Blood Types</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#B71B1C]">
                                {new Set(donors.map(d => d.district)).size}
                            </div>
                            <div className="text-sm text-gray-600">Districts Covered</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-[#B71B1C]">
                                {donors.filter(d => !d.last_donation_date).length}
                            </div>
                            <div className="text-sm text-gray-600">New Donors</div>
                        </div>
                    </div>
                </motion.div>

                {/* Become Donor Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex justify-center mt-8"
                >
                    <NavLink to="/donor_form" className="bg-[#B71B1C] text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors duration-200 font-semibold flex items-center gap-2">
                        <FaTint className="w-4 h-4" />
                        Become a Donor
                    </NavLink>
                </motion.div>
            </div>

            {/* Modals */}
            {showContactModal && selectedDonor && (
                <ContactModal
                    donor={selectedDonor}
                    onClose={() => setShowContactModal(false)}
                />
            )}

            {showDetailsModal && selectedDonor && (
                <DetailsModal
                    donor={selectedDonor}
                    onClose={() => setShowDetailsModal(false)}
                />
            )}
        </div>
    );
};

export default SearchDonor;