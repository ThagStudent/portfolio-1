'use client'
import React from 'react'
import { GoArrowUp } from "react-icons/go";
const Footer = () => {
    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            {/* <hr className='border-[#B3B3B3]' /> */}
            <footer className="relative py-5">
                <h1 className="text-center text-xl">@{new Date().getFullYear()}</h1>

                {/* <span
                    onClick={handleClick}
                    className=" text-white  shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out cursor-pointer absolute bottom-10 right-10 rounded-full border-[1px] border-red-500 ">
                    <GoArrowUp size={35} />
                </span> */}

            </footer>
        </>
    )
}

export default Footer