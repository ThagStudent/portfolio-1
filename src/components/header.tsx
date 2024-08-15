"use client";
import * as React from "react";
import Link from "next/link";
import styles from "@/styles/header.module.css";
import { CiMenuBurger } from "react-icons/ci";
const dashboards = [
    { label: 'Home', link: '/' },
    { label: 'Project', link: '/' },
    { label: 'Contact', link: '/' },

]
export function Header() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const hdlOpenMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <>
            <nav
                className={`${styles.header} flex items-center lg:justify-around md:justify-around justify-between  sticky top-0 box-border z-50 py-[15px] px-3  overflow-hidden`}>
                <div className="col-span-6">
                    <Link href={"/"}>
                        <h1 className="text-2xl ">THAG</h1>
                    </Link>
                </div>
                <ul className="col-span-6  ">
                    <div className="hidden lg:flex md:flex  gap-[20px]">
                        {dashboards.map((dashboard, index) => (
                            <React.Fragment key={index}>
                                <li >{dashboard.label}</li>
                                {index < dashboards.length - 1 && "/"}
                            </React.Fragment>
                        ))}
                    </div>
                    <div className="lg:hidden md:hidden block " >
                        <CiMenuBurger size={30} className="" onClick={hdlOpenMenu} />
                    </div>

                </ul>
            </nav>
            {isMenuOpen && (
                <div className="fixed top-0 right-0 w-1/2 h-screen bg-black z-50" >
                    <div onClick={hdlOpenMenu}>X</div>
                </div>
            )}

        </>
    );
}
