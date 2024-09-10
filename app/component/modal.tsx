import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

// components/Modal.js
const Modal = ({ isOpen, closeModal, title, content ,size}) => {
    const [width,setWidth]=useState("")
   useEffect(function(){
    switch (size) {
        case "sm":
            setWidth("w-1/3")
            break;
            case "md":
            setWidth("w-1/2")
            break;
            case "lg":
                setWidth("w-3/4")
            break;
            case "mx":
            setWidth("w-full")
            break;
       
        default:
            break;
       }
   },[])
  
    
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
            <div className={`bg-white rounded-lg shadow-lg ${width} p-6 relative slide-up`}>
              <span onClick={closeModal} className="absolute left-4 top-4 text-black hover:cursor-pointer">
                <FontAwesomeIcon icon={faClose}/>
              </span>
              <h2 className="text-2xl text-black font-bold mb-4">{title || 'Modal Title'}</h2>
              <p className="mb-4 text-black">{content || 'This is the default content of the modal.'}</p>
              
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default Modal;
  