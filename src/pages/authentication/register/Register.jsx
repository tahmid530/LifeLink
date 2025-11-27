import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Register = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting }, watch } = useForm();
    const { createUser } = useAuth();

    const password = watch("password");

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await createUser(data.email, data.password);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-3 sm:p-4 lg:p-6 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-[#B71B1C] opacity-10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-48 sm:h-48 bg-[#B71B1C] opacity-10 rounded-full -translate-x-1/3 translate-y-1/3"></div>

            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg mx-auto overflow-hidden border border-white/20">

                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#B71B1C] to-red-700 p-6 sm:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Create Account</h1>
                        <p className="text-red-100 opacity-90 text-sm sm:text-base">Join us and get started</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-4 sm:p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">

                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                Full Name
                            </label>
                            <input
                                type="text"
                                {...register('name', {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must be at least 2 characters"
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#B71B1C] focus:border-[#B71B1C] transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                                placeholder="Enter your full name"
                            />
                            {errors.name && (
                                <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1'>
                                    <span>⚠</span> {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                Email Address
                            </label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#B71B1C] focus:border-[#B71B1C] transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                                placeholder="your@email.com"
                            />
                            {errors.email && (
                                <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1'>
                                    <span>⚠</span> {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Phone Number Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                {...register('phone', {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                                        message: "Please enter a valid phone number"
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#B71B1C] focus:border-[#B71B1C] transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                                placeholder="+1 (555) 123-4567"
                            />
                            {errors.phone && (
                                <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1'>
                                    <span>⚠</span> {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                Password
                            </label>
                            <input
                                type="password"
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters"
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message: "Must include uppercase, lowercase & number"
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#B71B1C] focus:border-[#B71B1C] transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                                placeholder="Create a strong password"
                            />
                            <div className="space-y-1">
                                {errors.password && (
                                    <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1'>
                                        <span>⚠</span> {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                                <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                {...register('confirmPassword', {
                                    required: "Please confirm your password",
                                    validate: value => value === password || "Passwords do not match"
                                })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#B71B1C] focus:border-[#B71B1C] transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                                placeholder="Confirm your password"
                            />
                            {errors.confirmPassword && (
                                <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1 mt-1'>
                                    <span>⚠</span> {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start">
                            <input
                                type="checkbox"
                                {...register('terms', { required: true })}
                                className="w-4 h-4 text-[#B71B1C] bg-gray-100 border-gray-300 rounded focus:ring-[#B71B1C] focus:ring-2 mt-1"
                            />
                            <label className="ml-2 text-xs sm:text-sm text-gray-600">
                                I agree to the <a className="text-[#B71B1C] hover:text-red-800 cursor-pointer">Terms of Service</a> and <a className="text-[#B71B1C] hover:text-red-800 cursor-pointer">Privacy Policy</a>
                            </label>
                        </div>
                        {errors.terms && (
                            <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1'>
                                <span>⚠</span> You must accept the terms and conditions
                            </p>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#B71B1C] to-red-700 text-white py-3 sm:py-4 px-4 rounded-lg sm:rounded-xl font-semibold hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-[#B71B1C] focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                    </svg>
                                    Create Account
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center py-2 sm:py-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm font-medium whitespace-nowrap">or sign up with</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Social Login */}
                        {/* <SocialLogin /> */}

                        {/* Login Link */}
                        <div className="text-center pt-2 sm:pt-4">
                            <p className="text-gray-600 text-xs sm:text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-[#B71B1C] hover:text-red-800 font-semibold transition-colors duration-200 inline-flex items-center gap-1 group text-xs sm:text-sm"
                                >
                                    Sign in now
                                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;