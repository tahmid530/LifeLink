import React from "react";
import {
    FaInstagram,
    FaFacebookF,
    FaTwitter,
    FaYoutube,
    FaPhoneAlt,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import logo from "../../../assets/react.svg";
const Footer = () => {
    return (
        <footer className="bg-[#1C1C1C] text-white pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Logo + Description */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-10" />
                        <h2 className="text-3xl font-semibold">Lifelink</h2>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Sit leo non vestibulum cras ut nunc. Commodo ornare ultrices ipsum
                        dolor parturient sem fusce.
                    </p>

                    {/* Social Icons */}
                    <div className="flex gap-3 pt-4">
                        {[FaInstagram, FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
                            <div
                                key={i}
                                className="w-9 h-9 flex items-center justify-center bg-[#B71B1C] rounded-md cursor-pointer hover:bg-red-700 transition"
                            >
                                <Icon size={18} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="hover:text-white cursor-pointer">About Us</li>
                        <li className="hover:text-white cursor-pointer">Events</li>
                        <li className="hover:text-white cursor-pointer">Contact Us</li>
                        <li className="hover:text-white cursor-pointer">Volunteers</li>
                        <li className="hover:text-white cursor-pointer">FAQs</li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-3 text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                            <FaPhoneAlt className="text-red-600" /> +98 765 43210
                        </li>
                        <li className="flex items-center gap-2">
                            <FaEnvelope className="text-red-600" /> lifelink@support.com
                        </li>
                        <li className="flex items-center gap-2 leading-6">
                            <FaMapMarkerAlt className="text-red-600" />
                            130 Anywhere St, Tomsk, Russia
                        </li>
                    </ul>
                </div>

                {/* Newsletter */}
                <form className="bg-[#555555] rounded-xl w-fit p-6">
                    <h6 className="text-white text-2xl mb-4">Newsletter</h6>
                    <fieldset className="w-80">
                        <label className='text-white'>Enter your email address</label>
                        <div className="join mt-4">
                            <input type="email" placeholder="username@site.com" className="input input-bordered join-item text-black rounded-md lg:h-12" />
                            <button className="btn bg-[#B71B1C] text-white border-0 rounded-md mx-2 p-6">Subscribe</button>
                        </div>
                    </fieldset>
                </form>

            </div>

            {/* Divider */}
            <div className="border-t border-gray-600 mt-12 pt-6 text-center text-sm text-gray-400">
                Copyright © 2025 Donors, All rights reserved. Present by CreedCreatives
            </div>
        </footer>
    );
};

export default Footer;
