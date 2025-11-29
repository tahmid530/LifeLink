import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Donor = () => {
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmittingState, setIsSubmittingState] = useState(false);
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecure();

    // Watch specific fields for conditional rendering
    const watchHasDisease = watch("hasDisease");

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

    const onSubmit = async (data) => {
        setIsSubmittingState(true);
        setError('');

        try {
            const response = await axiosSecure.post('/donors', data);

            if (response.data.success) {
                setIsSubmitted(true);
                reset();
            } else {
                setError(response.data.message || 'Failed to submit form. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            if (error.response) {
                setError(error.response.data.message || 'Server error occurred.');
            } else if (error.request) {
                setError('Network error. Please check if the server is running.');
            } else {
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSubmittingState(false);
        }
    };

    const handleNewRegistration = () => {
        setIsSubmitted(false);
        setError('');
        reset();
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-auto text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Thank You for Registering!</h2>
                    <p className="text-gray-600 mb-6">
                        Your donor registration has been submitted successfully. We appreciate your willingness to save lives.
                    </p>
                    <div className="space-y-3">
                        <p className="text-sm text-gray-500">
                            Our team will contact you soon for verification.
                        </p>
                        <p className="text-sm text-gray-500">
                            Keep your phone available for the next 24 hours.
                        </p>
                    </div>
                    <button
                        onClick={handleNewRegistration}
                        className="mt-6 bg-[#B71B1C] text-white px-6 py-3 rounded-lg hover:bg-red-800 transition-colors duration-200 font-semibold"
                    >
                        Register Another Donor
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 px-4">
            <div className="max-w-4xl mx-auto">
                
                {/* Error Display */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </p>
                    </div>
                )}

                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-[#B71B1C] rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Become a Blood Donor</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Join our life-saving community. Your single donation can save up to 3 lives. Fill out the form below to register as a blood donor.
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex justify-center mb-8">
                    <div className="flex items-center space-x-4">
                        {['Personal Info', 'Health Details', 'Contact Info'].map((step, index) => (
                            <div key={step} className="flex items-center">
                                <div className="w-8 h-8 bg-[#B71B1C] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                                    {index + 1}
                                </div>
                                <span className="ml-2 text-sm font-medium text-gray-700 hidden sm:inline">{step}</span>
                                {index < 2 && <div className="w-8 h-0.5 bg-[#B71B1C] mx-2"></div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Section */}
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Personal Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("fullName", {
                                            required: "Full name is required",
                                            minLength: {
                                                value: 2,
                                                message: "Name must be at least 2 characters"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                        placeholder="Enter your full name"
                                    />
                                    {errors.fullName && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.fullName.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                        placeholder="your@email.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            pattern: {
                                                value: /^[+]?[0-9\s\-()]{10,}$/,
                                                message: "Please enter a valid phone number"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                        placeholder="+880 1XXX-XXXXXX"
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Date of Birth */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        {...register("dateOfBirth", {
                                            required: "Date of birth is required",
                                            validate: {
                                                age: value => {
                                                    const today = new Date();
                                                    const birthDate = new Date(value);
                                                    const age = today.getFullYear() - birthDate.getFullYear();
                                                    return age >= 18 && age <= 65 || "You must be between 18-65 years old";
                                                }
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                    />
                                    {errors.dateOfBirth && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.dateOfBirth.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Health Information Section */}
                        <div className="border-b border-gray-200 pb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Health Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Blood Type */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Blood Type *
                                    </label>
                                    <select
                                        {...register("bloodType", { required: "Blood type is required" })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                    >
                                        <option value="">Select Blood Type</option>
                                        {bloodTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors.bloodType && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.bloodType.message}
                                        </p>
                                    )}
                                </div>

                                {/* Weight */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Weight (kg) *
                                    </label>
                                    <input
                                        type="number"
                                        {...register("weight", {
                                            required: "Weight is required",
                                            min: {
                                                value: 45,
                                                message: "Minimum weight required is 45kg"
                                            },
                                            max: {
                                                value: 200,
                                                message: "Please enter a valid weight"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                        placeholder="Enter weight in kg"
                                        min="45"
                                        max="200"
                                    />
                                    {errors.weight && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.weight.message}
                                        </p>
                                    )}
                                </div>

                                {/* Last Donation Date */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Last Donation Date
                                    </label>
                                    <input
                                        type="date"
                                        {...register("lastDonation")}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Leave empty if first time donor</p>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Gender *
                                    </label>
                                    <select
                                        {...register("gender", { required: "Gender is required" })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.gender.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Health Questions */}
                            <div className="mt-4 space-y-4">
                                {/* Disease History */}
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register("hasDisease")}
                                            className="w-4 h-4 text-[#B71B1C] bg-gray-100 border-gray-300 rounded focus:ring-[#B71B1C] focus:ring-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            Do you have any chronic diseases? (Diabetes, Heart disease, etc.)
                                        </span>
                                    </label>

                                    {/* Conditional field for disease details */}
                                    {watchHasDisease && (
                                        <div className="mt-2 ml-7">
                                            <textarea
                                                {...register("diseaseDetails")}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                                placeholder="Please specify your health conditions..."
                                                rows="3"
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Medication */}
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register("isOnMedication")}
                                            className="w-4 h-4 text-[#B71B1C] bg-gray-100 border-gray-300 rounded focus:ring-[#B71B1C] focus:ring-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            Are you currently on any medication?
                                        </span>
                                    </label>
                                </div>

                                {/* Recent Surgery */}
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            {...register("hadRecentSurgery")}
                                            className="w-4 h-4 text-[#B71B1C] bg-gray-100 border-gray-300 rounded focus:ring-[#B71B1C] focus:ring-2"
                                        />
                                        <span className="text-sm font-medium text-gray-700">
                                            Have you had any surgery in the last 6 months?
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Contact & Location Information */}
                        <div className="pb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Contact & Location
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* District */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        District *
                                    </label>
                                    <select
                                        {...register("district", { required: "District is required" })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                    >
                                        <option value="">Select District</option>
                                        {districts.map(district => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                    {errors.district && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.district.message}
                                        </p>
                                    )}
                                </div>

                                {/* Area/Thana */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Area/Thana *
                                    </label>
                                    <input
                                        type="text"
                                        {...register("area", { required: "Area/Thana is required" })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                        placeholder="Enter your area or thana"
                                    />
                                    {errors.area && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.area.message}
                                        </p>
                                    )}
                                </div>

                                {/* Full Address */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Address *
                                    </label>
                                    <textarea
                                        {...register("address", { required: "Address is required" })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                        placeholder="Enter your complete address"
                                        rows="3"
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.address.message}
                                        </p>
                                    )}
                                </div>

                                {/* Emergency Contact */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Emergency Contact Number *
                                    </label>
                                    <input
                                        type="tel"
                                        {...register("emergencyContact", {
                                            required: "Emergency contact is required",
                                            pattern: {
                                                value: /^[+]?[0-9\s\-()]{10,}$/,
                                                message: "Please enter a valid phone number"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B71B1C] focus:border-transparent transition-all duration-200 outline-none"
                                        placeholder="+880 1XXX-XXXXXX"
                                    />
                                    {errors.emergencyContact && (
                                        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                                            <span>⚠</span> {errors.emergencyContact.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Terms and Conditions */}
                        <div className="bg-red-50 rounded-lg p-4">
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    {...register("terms", { required: "You must accept the terms and conditions" })}
                                    className="w-4 h-4 text-[#B71B1C] bg-white border-gray-300 rounded focus:ring-[#B71B1C] focus:ring-2 mt-1"
                                />
                                <span className="text-sm text-gray-700">
                                    I hereby declare that all information provided is true and correct to the best of my knowledge. I understand that any false information may lead to disqualification from the donor registry. I agree to be contacted for blood donation when needed and understand the importance of regular health check-ups.
                                </span>
                            </label>
                            {errors.terms && (
                                <p className="text-red-500 text-sm mt-2 flex items-center gap-1">
                                    <span>⚠</span> {errors.terms.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center pt-4">
                            <button
                                type="submit"
                                disabled={isSubmittingState}
                                className="bg-gradient-to-r from-[#B71B1C] to-red-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-[#B71B1C] focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 min-w-48"
                            >
                                {isSubmittingState ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                        Register as Donor
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Your information is secure and will only be used for blood donation purposes.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Donor;