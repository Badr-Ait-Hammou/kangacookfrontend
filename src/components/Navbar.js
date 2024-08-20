import React, { useState } from 'react';
import { Avatar } from 'primereact/avatar';
import logo from "../images/kangacook_logo.svg";

export default function Navbar({ onToggleSidebar, onAddRecipe }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <nav className="bg-gray-100 shadow-md p-1 flex justify-between items-center">
            <div>
                <img
                    alt="logo"
                    src={logo}
                    width="100"
                    onClick={onToggleSidebar}
                    className="p-2 cursor-pointer"
                />
            </div>

            <div className="flex items-center space-x-2 relative">

                <div className="hidden lg:flex items-center space-x-2 ">
                    <Avatar
                        image={logo}
                        className="p-3 w-100 border-2 "
                        size="large"
                        shape="circle"
                    />
                    <div className="text-black">
                        <p className="text-xs font-semibold">Username</p>
                        <p className="text-xs">user@example.com</p>
                    </div>
                </div>

                <div className="lg:hidden relative mt-1">
                    <Avatar
                        image="images/avatar/asiyajavayant.png"
                        className=" cursor-pointer"
                        size="small"
                        shape="circle"
                        onClick={toggleDropdown}
                    />
                    {isDropdownOpen && (
                        <div className="absolute top-12 right-0 bg-white text-black border border-gray-300 rounded-md shadow-lg p-2 w-48">
                            <p className="text-xs font-semibold">Username</p>
                            <p className="text-xs">user@example.com</p>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
