'use client';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import DraggableBox from './setting';
import Footer from './footer';
const AssignPathRoles = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const specificRoute = [`/sign-in`];
    const isSpecificRoute = specificRoute.includes(pathname);
    return (
        <main className='flex flex-col min-h-screen'>
            {!isSpecificRoute && <Header />}
            <div className='flex-grow'>{children}</div>
            <div className='lg:block md:block sm:hidden hidden'>
                <DraggableBox />
            </div>
            {!isSpecificRoute && <Footer />}
        </main>
    );
};

export default AssignPathRoles;
