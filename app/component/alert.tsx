import { useEffect, useState } from "react"

type alertType = {
    success: string,
}
export const Alert = ({ children,type }) => {
    const [isClose, setIsClose] = useState(false)
    const [visible, setVisible] = useState(true);

    if (!visible) return null;

   
    function close() {
        setIsClose(true)
        setVisible(false);
    }
    const alertStyles = {
        info: 'bg-blue-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-black',
        error: 'bg-red-500 text-white',
    };
    return <div className={`fixed   slide-down top-0 left-0 w-full ${alertStyles[type]} text-white p-4 z-50 `}>
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <p className="text-sm">{children}</p>
                <button onClick={() => close()} className="text-white font-bold" >
                    &times;
                </button>
            </div>
        </div>
    </div>
}