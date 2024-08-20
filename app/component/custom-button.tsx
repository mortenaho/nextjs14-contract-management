import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const DeleteButton=({onTouch})=>{
    return <button onClick={onTouch} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"><FontAwesomeIcon icon={faTrash}  className="text-white" ></FontAwesomeIcon></button>
}

export const EditButton=({onTouch})=>{
    return <button onClick={onTouch} className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"><FontAwesomeIcon icon={faPen}  className="text-white" ></FontAwesomeIcon></button>
}