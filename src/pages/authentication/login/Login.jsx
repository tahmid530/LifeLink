import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const { signInWithGoogle, signInWithFacebook } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                console.log(result.user)
                navigate('/');
            })
            .catch(error => {
                console.error(error);
            })
    }

    const handleFacebookSignIn = () => {
        signInWithFacebook()
            .then(result => {
                console.log('Facebook sign-in successful:', result.user);
                navigate('/');
            })
            .catch(error => {
                console.error('Facebook Sign-In Error:', error);
            });
    }

    const onSubmit = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(data);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center p-3 sm:p-4 lg:p-6 relative overflow-hidden">
            {/* Decorative Elements - Responsive Sizing */}
            <div className="absolute top-0 left-0 w-20 h-20 sm:w-32 sm:h-32 bg-[#B71B1C] opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 sm:w-48 sm:h-48 bg-[#B71B1C] opacity-10 rounded-full translate-x-1/3 translate-y-1/3 grid-rows-none"></div>

            {/* Main Card Container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto overflow-hidden border border-white/20">

                {/* Animated Header Section */}
                <div className="bg-gradient-to-r from-[#B71B1C] to-red-700 p-6 sm:p-8 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative">
                        {/* Icon Container - Responsive */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        {/* Text - Responsive Sizing */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">Welcome Back</h1>
                        <p className="text-red-100 opacity-90 text-sm sm:text-base">Sign in to continue your journey</p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="p-4 sm:p-6 md:p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">

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

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center flex-wrap gap-1">
                                <label className="block text-sm font-semibold text-gray-700 mb-1 sm:mb-2 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Password
                                </label>
                                <a className="text-xs sm:text-sm text-[#B71B1C] hover:text-red-800 transition-colors cursor-pointer font-medium whitespace-nowrap">
                                    Forgot password?
                                </a>
                            </div>
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
                                        message: "Include uppercase, lowercase & number"
                                    }
                                })}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#B71B1C] focus:border-[#B71B1C] transition-all duration-300 outline-none shadow-sm hover:shadow-md"
                                placeholder="Enter your password"
                            />
                            <div className="space-y-1">
                                {errors.password && (
                                    <p className='text-red-500 text-xs sm:text-sm flex items-center gap-1'>
                                        <span>⚠</span> {errors.password.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Remember Me Checkbox */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                {...register('rememberMe')}
                                className="w-4 h-4 text-[#B71B1C] bg-gray-100 border-gray-300 rounded focus:ring-[#B71B1C] focus:ring-2"
                            />
                            <label className="ml-2 text-xs sm:text-sm text-gray-600">
                                Remember me for 30 days
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-[#B71B1C] to-red-700 text-white py-3 sm:py-4 px-4 rounded-lg sm:rounded-xl font-semibold hover:from-red-700 hover:to-red-800 focus:ring-2 focus:ring-[#B71B1C] focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                    </svg>
                                    Sign In
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center py-2 sm:py-4">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="flex-shrink mx-2 sm:mx-4 text-gray-500 text-xs sm:text-sm font-medium whitespace-nowrap">or continue with</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Social Login - Stack on mobile, grid on larger screens */}
                        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2 sm:gap-3">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="flex items-center justify-center gap-2 py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-xs sm:text-sm font-medium">Google</span>
                            </button>
                            <button
                                type="button"
                                onClick={handleFacebookSignIn}
                                className="flex items-center justify-center gap-2 py-2 sm:py-3 px-3 sm:px-4 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors duration-200 text-sm sm:text-base"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="text-xs sm:text-sm font-medium">Facebook</span>
                            </button>
                        </div>

                        {/* Register Link */}
                        <div className="text-center pt-2 sm:pt-4">
                            <p className="text-gray-600 text-xs sm:text-sm">
                                New to our platform?{' '}
                                <Link
                                    to="/register"
                                    className="text-[#B71B1C] hover:text-red-800 font-semibold transition-colors duration-200 inline-flex items-center gap-1 group text-xs sm:text-sm"
                                >
                                    Create an account
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

export default Login;