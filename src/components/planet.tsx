import React from 'react'
import styles from "@/styles/page.module.css";
import Image from "next/image";
const Planet = () => {
    return (
        <div>     <div className="relative flex justify-center items-center top-[100px]">
            <div className={`absolute  w-[70px] h-[70px]  z-50 ${styles.sun} `}>
                <Image src="/images/sun.png" alt="" width={100} height={100} />
            </div>
            <div className={`${styles.mercury}  w-[90px] h-[90px] `}></div>
            <div
                className={`${styles.venus} absolute w-[140px] h-[140px] `}></div>
            <div className={`${styles.earth} relative w-[200px] h-[200px] `}>
                <div className={styles.moon}></div>
            </div>
            <div className="absolute">5</div>
            <div className="absolute">6</div>
        </div></div>
    )
}

export default Planet