"use client";
import { useState, useRef, useEffect } from "react";
import { throttle } from "lodash";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";

const DraggableBox = () => {
    const boxRef = useRef<HTMLDivElement>(null);

    const getInitialPosition = () => {
        if (typeof window !== "undefined") {
            const savedPosition = localStorage.getItem("boxPosition");
            return savedPosition ? JSON.parse(savedPosition) : { x: 194, y: 7 };
        }
        return { x: 194, y: 7 }; // Giá trị mặc định khi chạy phía server
    };

    const [isDragging, setIsDragging] = useState(false);
    const [dragged, setDragged] = useState(false);
    const [position, setPosition] = useState({ x: 194, y: 7 });
    const [positionStyle, setPositionStyle] = useState({});
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [openDetail, setOpenDetail] = useState(false);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setPosition(getInitialPosition());
        setIsClient(true);
    }, []);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        setDragged(false);
        if (boxRef.current) {
            const boxRect = boxRef.current.getBoundingClientRect();
            setOffset({
                x: e.clientX - boxRect.left,
                y: e.clientY - boxRect.top,
            });
        }
        document.body.classList.add("no-select");
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsDragging(true);
        setDragged(false);
        const touch = e.touches[0];
        if (boxRef.current) {
            const boxRect = boxRef.current.getBoundingClientRect();
            setOffset({
                x: touch.clientX - boxRect.left,
                y: touch.clientY - boxRect.top,
            });
        }
        document.body.classList.add("no-select");
    };

    const handleMouseMove = throttle((e: MouseEvent) => {
        if (isDragging) {
            setDragged(true);

            let newX = e.clientX - offset.x + window.scrollX;
            let newY = e.clientY - offset.y + window.scrollY;

            if (boxRef.current) {
                const maxX =
                    document.documentElement.clientWidth - boxRef.current.offsetWidth;
                const maxY =
                    document.documentElement.clientHeight - boxRef.current.offsetHeight;
                newX = Math.max(0, Math.min(newX, maxX + window.scrollX));
                newY = Math.max(0, Math.min(newY, maxY + window.scrollY));
            }

            setPosition({ x: newX, y: newY });
            localStorage.setItem("boxPosition", JSON.stringify({ x: newX, y: newY }));
            setOpenDetail(false);
        }
    }, 16);

    const handleTouchMove = throttle((e: TouchEvent) => {
        if (isDragging) {
            setDragged(true);

            const touch = e.touches[0];
            let newX = touch.clientX - offset.x + window.scrollX;
            let newY = touch.clientY - offset.y + window.scrollY;
            if (boxRef.current) {
                const maxX =
                    document.documentElement.clientWidth - boxRef.current.offsetWidth;
                const maxY =
                    document.documentElement.clientHeight - boxRef.current.offsetHeight;
                newX = Math.max(0, Math.min(newX, maxX + window.scrollX));
                newY = Math.max(0, Math.min(newY, maxY + window.scrollY));
            }

            console.log({ x: newX, y: newY });
            setPosition({ x: newX, y: newY });
            localStorage.setItem("boxPosition", JSON.stringify({ x: newX, y: newY }));
        }
    }, 32);

    const handleMouseUp = () => {
        setIsDragging(false);
        document.body.classList.remove("no-select");
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        document.body.classList.remove("no-select");
    };

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchmove", handleTouchMove, { passive: false });
            window.addEventListener("touchend", handleTouchEnd);
        } else {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging]);

    useEffect(() => {
        if (boxRef.current) {
            const boxRect = boxRef.current.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            let newStyle: React.CSSProperties = {};

            if (boxRect.bottom > windowHeight - 50) {
                newStyle.bottom = "100%";
            } else if (boxRect.top < 50) {
                newStyle.top = "100%";
            }

            if (boxRect.right > windowWidth - 50) {
                newStyle.right = "100%";
            } else if (boxRect.left < 50) {
                newStyle.left = "100%";
            }
            setPositionStyle(newStyle);
        }
    }, [position]);


    const hdlToggleDetails = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!isDragging && !dragged) {
            setOpenDetail((prev) => !prev);
        }
        setDragged(false);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent | TouchEvent) => {
            if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
                setOpenDetail(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside, {
            passive: false,
        });
        document.addEventListener("touchstart", handleClickOutside, {
            passive: false,
        });

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
        };
    }, []);

    return (
        <>
            {isClient && (
                <div
                    ref={boxRef}
                    className="box no-select cursor-pointer p-2 "
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                    style={{
                        position: "fixed",
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        zIndex: 10000,
                    }}>
                    <details
                        style={{ position: "relative", touchAction: "manipulation" }}
                        open={openDetail}>
                        <summary style={{ listStyle: "none" }} onClick={hdlToggleDetails}>
                            <IoSettingsOutline
                                size={30}
                                className="animate-spin-slow hover:opacity-50"
                            />
                        </summary>
                        <div
                            style={{
                                position: "absolute",
                                right: "100%",
                                zIndex: 10001,
                                ...positionStyle,
                            }}>
                            <Link href="/dashboard">Dashboard</Link>
                        </div>
                    </details>
                </div>
            )}
        </>
    );
};

export default DraggableBox;
