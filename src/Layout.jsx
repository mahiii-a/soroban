import { Outlet, useNavigate } from "react-router-dom";
import './Layout.css'
function Layout(){
    const navigate=useNavigate()
    return(
        <div>
            <button className='back-button' onClick={() => navigate(-1)}>← Back</button>
            <Outlet />
        </div>
    )
}

export default Layout