import { Link, useRouteError } from "react-router-dom";
import bannerImage from "../../../assets/blood-donation-5.jpg";

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
            {/* Background Image with Gradient Overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                style={{
                    backgroundImage: `url(${bannerImage})`,
                }}
            >
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-black to-purple-900 opacity-80"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-6 max-w-2xl mx-auto">
                {/* Animated Error Icon */}
                <div className="mb-8 animate-bounce">
                    <div className="w-28 h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white border-opacity-20">
                        <span className="text-4xl">⚠️</span>
                    </div>
                </div>

                {/* Error Message */}
                <h1 className="text-7xl md:text-9xl font-black mb-6 bg-gradient-to-r from-red-400 to-white bg-clip-text text-transparent">
                    404
                </h1>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Page Not Found
                </h2>
                
                <p className="text-xl mb-6 text-gray-300 leading-relaxed">
                    {error.statusText || error.message || "The page you're looking for doesn't exist or has been moved."}
                </p>

                {/* Back to Home Button */}
                <Link to='/'>
                    <button className="group relative bg-gradient-to-r from-[#B71B1C] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden">
                        <span className="relative z-10 flex items-center justify-center">
                            <svg 
                                className="w-5 h-5 mr-3 group-hover:animate-pulse" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth={2} 
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
                                />
                            </svg>
                            Return to Safety
                        </span>
                        
                        {/* Button Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white via-10% to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </button>
                </Link>

                {/* Support Text */}
                <div className="mt-10 p-4 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm">
                    <p className="text-sm text-gray-600">
                        Need help? <a href="/contact" className="text-red-500 hover:text-black underline transition-colors">Contact our support team</a>
                    </p>
                </div>
            </div>
        </div>
    );
}