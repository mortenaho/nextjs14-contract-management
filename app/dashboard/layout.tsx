"use client";
import Link from "next/link";
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { getCookie } from "../_lib/coocki";
import { LoginCookiName } from "../_lib/general-var";
import { Token } from "../dtos/response/token";
import { jwtDecode } from "jwt-decode";
import { faPencilSquare, faTrash,faDashboard,faContactBook, faSignOut } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function DashboardLayout({ children }) {
    const router = useRouter();
    const currentPath = usePathname();

    useEffect(() => {
        getCookie<Token>(LoginCookiName).then(p => {
            if (p == undefined) {
                router.push("/login");
            }else
            {
               
            }
        });
    }, [router]);

    const links = [
        { title: "داشبورد", link: "/dashboard", icon: faDashboard },
        { title: "قراردادها", link: "/dashboard/contract", icon: faContactBook },
        { title: "ثبت قرارداد", link: "/dashboard/contract/add", icon: faPencilSquare },
        { title: "پیمانکار", link: "/dashboard/contracting-party", icon: faPencilSquare },
    ];

    return (
        <div className="bg-sky-700 h-lvh">
            <div className="flex h-screen">
                <div className="w-64 bg-gray-800 text-white relative">
                    <div className="p-4 text-2xl font-semibold">پنل مدیریت</div>
                    <ul className="mt-6">
                        {links.map((item) => (
                            <li key={item.link}>
                                <Link
                                    prefetch={false}
                                    href={item.link}
                                    className={`block py-2 px-4 hover:bg-gray-700 ${currentPath === item.link ? 'active bg-gray-700' : ''}`}
                                >
                                  <FontAwesomeIcon icon={item.icon}/>   {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ul className="absolute bottom-0 w-full">
                        <li>
                            <Link
                                prefetch={false}
                                href="/logout"
                                className="block w-full py-2 px-4 hover:bg-gray-700 text-center"
                            >
                            <FontAwesomeIcon icon={faSignOut}/>     خروج
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="flex-1">
                    <div className="flex bg-gray-700 h-16">
                        <p className="absolute left-2 top-3 h-9 w-9 rounded-full bg-blue-500 text-white text-center content-center">
                            M
                        </p>
                    </div>
                    <div className="p-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
