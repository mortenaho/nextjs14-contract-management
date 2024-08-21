import { useEffect, useState } from "react"
import PropTypes from 'prop-types';
type AlertType = 'info' | 'success' | 'warningk' | 'error'
type position = 'top' | 'bottom'


interface MyComponentProps {
    alertType: AlertType;
    message: string,
    position: position
}

const Alert: React.FC<MyComponentProps> = ({ alertType, message, position = 'top' }) => {
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
    const postionStyle = {
        top: 'top-0 slide-down',
        bottom: 'bottom-0 slide-up'
    };
    return <div className={`fixed  ${postionStyle[position]}  left-0 w-full ${alertStyles[alertType]} text-white p-4 z-50 `}>
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <p className="text-sm">{message}</p>
                <button onClick={() => close()} className="text-white font-bold" >
                    &times;
                </button>
            </div>
        </div>
    </div>
}

export default Alert;